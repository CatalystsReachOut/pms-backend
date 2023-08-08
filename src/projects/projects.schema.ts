import mongoose, { Schema, model, Document } from 'mongoose'

export interface Project extends Document {
    name: string,
    created_By: mongoose.Types.ObjectId,
    start_Date: Date,
    end_Date: Date,
    thumbnail: string,
    is_Completed: boolean
}

export const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        created_By: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true
        },
        start_Date: {
            type: Date,
            default: Date.now()
        },
        end_Date: Date,
        thumbnail: {
            type: String,
            required: true
        },
        is_Completed: {
            type: Boolean,
            default: false
        }
    }
)

export const ProjectModel = model<Project>('project', ProjectSchema);
