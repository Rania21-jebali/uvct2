const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: true,
    },
    nbTicket: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    free: {
      type: Boolean,
    },
    typeEvent: {
      type: String,
    },
    affiche: {
      type: String,
      required: true,
    },
    online: {
      type: Boolean,
    },
    postedBy: {
      type: Object,
      ref: "Users",
    },
    statut: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
eventSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Event", eventSchema);
