const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: Number,
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // role: driver
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
