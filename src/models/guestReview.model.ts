import { Schema, model, Document } from 'mongoose';

export interface IGuestReview extends Document {
  name: string;
  origin: string;
  trip: string;
  text: string;
  rating: number;
  order: number;
  published: boolean;
}

const guestReviewSchema = new Schema<IGuestReview>(
  {
    name: { type: String, required: true },
    origin: { type: String, default: '' },
    trip: { type: String, default: '' },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GuestReview = model<IGuestReview>('GuestReview', guestReviewSchema);
