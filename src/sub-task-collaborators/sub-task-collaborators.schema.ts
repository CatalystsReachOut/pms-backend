import mongoose, { Schema, Document, model, ObjectId } from 'mongoose';

export interface SubTaskCollaborator extends Document {
  subTaskId: ObjectId;
  userId: ObjectId;
}

export const SubTaskCollaboratorSchema = new Schema<SubTaskCollaborator>(
  {
    subTaskId: { type: mongoose.Types.ObjectId, ref: 'SubTask' },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export const SubTaskCollaboratorModel = model<SubTaskCollaborator>(
  'SubTaskCollaborator',
  SubTaskCollaboratorSchema,
);
