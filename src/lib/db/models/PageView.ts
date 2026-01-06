import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageView extends Document {
  _id: mongoose.Types.ObjectId;
  path: string;
  vehicleId?: mongoose.Types.ObjectId;
  date: Date;
  count: number;
}

const PageViewSchema = new Schema<IPageView>({
  path: {
    type: String,
    required: true,
    index: true,
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

// Índice composto para upsert eficiente
PageViewSchema.index({ path: 1, date: 1 }, { unique: true });

const PageView: Model<IPageView> =
  mongoose.models.PageView || mongoose.model<IPageView>('PageView', PageViewSchema);

export default PageView;
