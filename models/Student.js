const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: String,
  rollNumber: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // role: parent
  assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // role: driver
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
