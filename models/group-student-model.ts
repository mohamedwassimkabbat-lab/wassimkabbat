import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IGroupStudent extends Document {
  firstName: string;
  lastName: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}

const GroupStudentSchema = new Schema<IGroupStudent>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    groupId: {
      type: String,
      required: [true, "Group ID is required"],
      index: true, // Useful for faster filtering by group
    },
  },
  {

    timestamps: true,
  }
);


const GroupStudent = models.GroupStudent || model<IGroupStudent>("GroupStudent", GroupStudentSchema);

export default GroupStudent;