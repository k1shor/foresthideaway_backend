import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { asyncHandler } from './asyncHandler';
import { ApiError } from './ApiError';
import { slugify } from './slugify';

interface CrudOptions {
  /** Collection has a public-facing unique `slug` field and a public GET /:slug route. Default true. */
  hasSlug?: boolean;
}

/** Renumbers a collection's `order` field to match array position (0..n-1), collapsing gaps/duplicates. */
async function renumber(model: Model<any>, orderedIds: string[]) {
  if (!orderedIds.length) return;
  await model.bulkWrite(
    orderedIds.map((id, index) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
    })),
    { timestamps: false }
  );
}

export function createCrudController<T extends { slug?: string; title?: string; name?: string }>(
  model: Model<T>,
  options: CrudOptions = {}
) {
  const hasSlug = options.hasSlug !== false;

  const publicList = asyncHandler(async (_req: Request, res: Response) => {
    const items = await model.find({ published: true }).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: items });
  });

  const publicGet = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findOne({ slug: req.params.slug, published: true } as Record<string, unknown>);
    if (!item) throw new ApiError(404, 'Not found');
    res.status(200).json({ success: true, data: item });
  });

  const adminList = asyncHandler(async (_req: Request, res: Response) => {
    const items = await model.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: items });
  });

  const adminGet = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findById(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');
    res.status(200).json({ success: true, data: item });
  });

  const adminCreate = asyncHandler(async (req: Request, res: Response) => {
    const body: Record<string, unknown> = { ...req.body };
    if (hasSlug && !body.slug) {
      const source = (body.title as string) || (body.name as string);
      if (source) body.slug = slugify(source);
    }

    const existing = await model.find().select('_id').sort({ order: 1, createdAt: 1 });
    const ids = existing.map((doc) => (doc._id as { toString(): string }).toString());
    const requestedIndex = typeof body.order === 'number' ? Math.trunc(body.order) : ids.length;
    const targetIndex = Math.min(Math.max(requestedIndex, 0), ids.length);

    delete body.order;
    const item = await model.create(body as Partial<T>);
    ids.splice(targetIndex, 0, (item._id as { toString(): string }).toString());
    await renumber(model, ids);

    const saved = await model.findById(item._id);
    res.status(201).json({ success: true, data: saved });
  });

  const adminUpdate = asyncHandler(async (req: Request, res: Response) => {
    const body: Record<string, unknown> = { ...req.body };
    const requestedOrder = body.order;
    delete body.order;

    const item = await model.findByIdAndUpdate(req.params.id, body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!item) throw new ApiError(404, 'Not found');

    if (typeof requestedOrder === 'number') {
      const existing = await model.find().select('_id').sort({ order: 1, createdAt: 1 });
      const ids = existing.map((doc) => (doc._id as { toString(): string }).toString());
      const selfId = (item._id as { toString(): string }).toString();
      const currentIndex = ids.indexOf(selfId);
      if (currentIndex !== -1) {
        const targetIndex = Math.min(Math.max(Math.trunc(requestedOrder), 0), ids.length - 1);
        if (targetIndex !== currentIndex) {
          ids.splice(currentIndex, 1);
          ids.splice(targetIndex, 0, selfId);
          await renumber(model, ids);
        }
      }
    }

    const saved = await model.findById(req.params.id);
    res.status(200).json({ success: true, data: saved });
  });

  const adminDelete = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');

    const remaining = await model.find().select('_id').sort({ order: 1, createdAt: 1 });
    await renumber(
      model,
      remaining.map((doc) => (doc._id as { toString(): string }).toString())
    );

    res.status(200).json({ success: true, data: {} });
  });

  return { publicList, publicGet, adminList, adminGet, adminCreate, adminUpdate, adminDelete };
}
