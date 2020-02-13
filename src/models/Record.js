import mongoose from "mongoose";

const NOW = new Date();
const Schema = mongoose.Schema;
const { String, Number, ObjectId } = Schema.Types;

const ExerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    lowercase: true,
    required: [true, "exercise `type` is required"]
  },
  name: {
    type: String,
    lowercase: true,
    required: [true, "exercise `name` is required"]
  },
  duration: {
    type: Number,
    default: 0
  },
  reps: { type: Number, default: 0 },
  sets: { type: Number, default: 0 }
});

const RecordSchema = mongoose.Schema({
  created_at: {
    type: Date,
    default: NOW
  },
  updated_at: {
    type: Date,
    default: NOW
  },
  userId: {
    type: ObjectId,
    required: [true, "record `userId` is required"]
  },
  exercises: [ExerciseSchema]
});

RecordSchema.pre("save", async function(next) {
  const record = this;
  const { exercises } = record;

  if (!exercises || exercises.length === 0) {
    throw new Error("record `exercises` is required");
  }

  next();
});

const RecordModel = mongoose.model("Record", RecordSchema);
export default RecordModel;
