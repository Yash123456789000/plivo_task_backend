import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
  Id: { type: Number, required: true, unique: true },
  Subject: { type: String, required: true },
  Location: { type: String},
  StartTime: { type: Date },
  EndTime: { type: Date, required: true },
  CategoryColor: { type: String, default: '#1aaa55' }
});

const Calendar = mongoose.model("Calendar", CalendarSchema);
export default Calendar;
