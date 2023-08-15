import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';

export interface Task extends Document {
  name: string;
  description: string;
  projectId: ObjectId;
  prirorityId: ObjectId;
  startDate: Date;
  endDate: Date;
  createdBy: ObjectId;
  attachment: string;
  statusId: ObjectId;
}

export const TaskSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
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

export const TaskModel = model<Task>('Task', TaskSchema);
