import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISimulation extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  birthDate?: string;
  vehicleInterest?: string;
  hasTrade?: string;
  vehicleValue: number;
  downPayment: number;
  installments: number;
  status: 'pending' | 'contacted' | 'closed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SimulationSchema = new Schema<ISimulation>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      default: '',
    },
    birthDate: {
      type: String,
      default: '',
    },
    vehicleInterest: {
      type: String,
      default: '',
    },
    hasTrade: {
      type: String,
      default: '',
    },
    vehicleValue: {
      type: Number,
      required: true,
    },
    downPayment: {
      type: Number,
      required: true,
    },
    installments: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'closed'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Simulation: Model<ISimulation> =
  mongoose.models.Simulation || mongoose.model<ISimulation>('Simulation', SimulationSchema);

export default Simulation;
