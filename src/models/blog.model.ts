import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
  readTime: string;
  publishedAt: Date;
  order: number;
  published: boolean;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    img: { type: String, default: '' },
    readTime: { type: String, default: '' },
    publishedAt: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Blog = model<IBlog>('Blog', blogSchema);
