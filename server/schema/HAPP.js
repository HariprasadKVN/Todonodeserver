const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  when: { type: Date },
  patientName: { type: String },
  age: { type: Number },
  gender: { type: String },
  contactNumber: { type: String },
  doctorName: { type: String },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
