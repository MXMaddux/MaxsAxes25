import { Model, Schema, model, models } from "mongoose";

export interface IGuitar extends Document {
  brand: string;
  description: string;
  model: string;
  image: string;
  price: number;
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GuitarSchema = new Schema<IGuitar>(
  {
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Guitar: Model<IGuitar> =
  models.Guitar || model<IGuitar>("Guitar", GuitarSchema);

export default Guitar;
