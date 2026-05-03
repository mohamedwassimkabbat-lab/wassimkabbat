import mongoose, { Schema, Document, model, models } from "mongoose"

export interface IGroup extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

const GroupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: [true, "Group name is required"],
      unique: true,
      trim: true,
    },
  },
  {
    collection: "groups",
    timestamps: true,
  },
)

const Group = models.Group || model<IGroup>("Group", GroupSchema)

export default Group
