const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [String],
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // role: driver
  assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
