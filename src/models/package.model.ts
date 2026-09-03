import { Schema, model, Document } from 'mongoose';

interface ItineraryDay {
  day: string;
  title: string;
  items: string[];
}

export interface IPackage extends Document {
  name: string;
  slug: string;
  tag: string;
  duration: string;
  description: string;
  img: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  suitableFor: string;
  order: number;
  published: boolean;
}

const itineraryDaySchema = new Schema<ItineraryDay>(
  {
    day: { type: String, required: true },
    title: { type: String, required: true },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const packageSchema = new Schema<IPackage>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tag: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    img: { type: String, default: '' },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    itinerary: { type: [itineraryDaySchema], default: [] },
    suitableFor: { type: String, default: '' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Package = model<IPackage>('Package', packageSchema);
