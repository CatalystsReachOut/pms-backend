import mongoose, { Schema, model, Document } from 'mongoose'

export interface Project extends Document {
    name: string,
    createdBy: mongoose.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    thumbnail: string,
    isCompleted: boolean
}

export const ProjectSchema = new Schema(
    {
        name: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        startDate: {
            type: Date,
            default: Date.now()
        },
        endDate: Date,
        thumbnail: {
            type: String,
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }
)

export const ProjectModel = model<Project>('Project', ProjectSchema);
