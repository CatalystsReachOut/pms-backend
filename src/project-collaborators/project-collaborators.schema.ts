import mongoose, { Schema, Document, model, ObjectId } from 'mongoose';

export interface ProjectCollaborator extends Document {
  projectId: ObjectId;
  userId: ObjectId;
}

export const ProjectCollaboratorSchema = new Schema<ProjectCollaborator>(
  {
    projectId: { type: mongoose.Types.ObjectId, ref: 'Project' },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export const ProjectCollaboratorModel = model<ProjectCollaborator>(
  'ProjectCollaborator',
  ProjectCollaboratorSchema,
);
