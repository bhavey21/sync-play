import mongoose from "mongoose";

export interface KomalInvite2 extends mongoose.Document {
  response: boolean;
}

const KomalInvite2Schema = new mongoose.Schema<KomalInvite2>({
  response: {
    type: Boolean,
    required: true,
  }
},
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.KomalInvite2 || mongoose.model<KomalInvite2>("KomalInvite2", KomalInvite2Schema);
