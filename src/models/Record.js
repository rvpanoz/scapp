import mongoose from "mongoose";

const Schema = mongoose.Schema;
const { Array, String, Number, ObjectId } = Schema.Types;

const ExerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    lowercase: true,
    required: true
  },
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  duration: Number,
  reps: Number,
  sets: Number
});

const RecordSchema = mongoose.Schema({
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  userId: {
    type: ObjectId,
    required: [
      function() {
        return !this.userId || this.userId !== null;
      },
      "is required"
    ]
  },
  exercises: [ExerciseSchema]
});

RecordSchema.pre("save", async function(next) {
  const record = this;

  record.created_at = new Date();
  record.updated_at = new Date();

  const { exercises } = record;

  if (!exercises || exercises.length === 0) {
    throw new Error("Missing exercises");
  }

  next();
});

const RecordModel = mongoose.model("Record", RecordSchema);

export default RecordModel;
