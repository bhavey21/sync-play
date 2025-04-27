import mongoose from "mongoose";

export interface Video extends mongoose.Document {
  name: string;
  key: string;
  user: mongoose.Types.ObjectId;
}

const VideoSchema = new mongoose.Schema<Video>({
  name: {
    type: String,
    required: [true, "Please provide a video name."],
    maxlength: [100, "Video name cannot be more than 100 characters"],
  },
  key: {
    type: String,
    required: [true, "Video key is required."],
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.Video || mongoose.model<Video>("Video", VideoSchema);
