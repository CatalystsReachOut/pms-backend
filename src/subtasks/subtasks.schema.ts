import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';

export interface SubTask extends Document {
  name: string;
  description: string;
  taskId: ObjectId;
  prirorityId: ObjectId;
  startDate: Date;
  endDate: Date;
  createdBy: ObjectId;
  attachment: string;
  statusId: ObjectId;
}

export const SubTaskSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  taskId: {
    type: mongoose.Types.ObjectId,
    ref: 'Task',
  },
  prirorityId: {
    type: mongoose.Types.ObjectId,
    ref: 'Priority',
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: Date,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  attachment: {
    type: String,
  },
  statusId: {
    type: mongoose.Types.ObjectId,
    ref: 'Status',
  },
});

export const SubTaskModel = model<SubTask>('SubTask', SubTaskSchema);
