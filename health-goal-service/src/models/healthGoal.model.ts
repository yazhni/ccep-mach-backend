import { Schema, model, Document, Types } from 'mongoose';

export interface IHealthGoal extends Document {
  userId: Types.ObjectId;
  title: string;
  description?: string;
  targetDate: Date;
  completed: boolean;
}

const schema = new Schema<IHealthGoal>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  targetDate: { type: Date, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default model<IHealthGoal>('HealthGoal', schema);
