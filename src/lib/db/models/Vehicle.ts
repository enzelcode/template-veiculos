import mongoose, { Schema, Document, Model } from 'mongoose';
import type {
  FuelType,
  TransmissionType,
  BodyType,
  VehicleStatus,
} from '@/constants/vehicles';

export interface IVehicle extends Document {
  _id: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  yearModel: number;
  price: number;
  mileage: number;
  color: string;
  fuel: FuelType;
  transmission: TransmissionType;
  doors: number;
  bodyType: BodyType;
  images: string[];
  featuredImage: string;
  features: string[];
  description: string;
  status: VehicleStatus;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      index: true,
    },
    model: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      default: '',
    },
    year: {
      type: Number,
      required: true,
      index: true,
    },
    yearModel: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      enum: ['flex', 'gasoline', 'ethanol', 'diesel', 'electric', 'hybrid'],
      required: true,
      index: true,
    },
    transmission: {
      type: String,
      enum: ['manual', 'automatic', 'cvt', 'automated'],
      required: true,
    },
    doors: {
      type: Number,
      default: 4,
    },
    bodyType: {
      type: String,
      enum: ['sedan', 'hatch', 'suv', 'pickup', 'coupe', 'convertible', 'wagon', 'van', 'minivan'],
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'reserved'],
      default: 'available',
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto para buscas comuns
VehicleSchema.index({ status: 1, featured: -1, createdAt: -1 });
VehicleSchema.index({ brand: 1, model: 1 });

// Evitar recompilação do modelo em desenvolvimento
const Vehicle: Model<IVehicle> =
  mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default Vehicle;
