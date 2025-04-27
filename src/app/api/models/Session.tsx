import mongoose from "mongoose";

export interface Session extends mongoose.Document {
  video: mongoose.Types.ObjectId;
  play: boolean
}

const SessionSchema = new mongoose.Schema<Session>({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  play : {
    type: Boolean,
    required:true,
    default: true,
  }
},
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.Session || mongoose.model<Session>("Session", SessionSchema);
