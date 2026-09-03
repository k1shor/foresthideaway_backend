import { Schema, model, Document } from 'mongoose';

interface Highlight {
  title: string;
  body: string;
}

export interface IActivity extends Document {
  title: string;
  slug: string;
  tag: string;
  duration: string;
  description: string;
  img: string;
  highlights: Highlight[];
  whatToExpect: string[];
  practicalNotes: string[];
  order: number;
  published: boolean;
}

const highlightSchema = new Schema<Highlight>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { _id: false }
);

const activitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tag: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    img: { type: String, default: '' },
    highlights: { type: [highlightSchema], default: [] },
    whatToExpect: { type: [String], default: [] },
    practicalNotes: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
