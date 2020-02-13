import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExerciseSchema = new mongoose.Schema({
  type: String,
  name: String,
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
    type: Schema.Types.ObjectId,
    required: true
  },
  exercises: [ExerciseSchema]
});

RecordSchema.pre("save", async function(next) {
  const record = this;

  record.created_at = new Date();
  record.updated_at = new Date();

  next();
});

const RecordModel = mongoose.model("Record", RecordSchema);

export default RecordModel;
