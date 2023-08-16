import mongoose, { Schema, Document, model, ObjectId } from 'mongoose';

export interface TaskCollaborator extends Document {
  taskId: ObjectId;
  userId: ObjectId;
}

export const TaskCollaboratorSchema = new Schema<TaskCollaborator>(
  {
    taskId: { type: mongoose.Types.ObjectId, ref: 'Task' },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export const TaskCollaboratorModel = model<TaskCollaborator>(
  'TaskCollaborator',
  TaskCollaboratorSchema,
);
