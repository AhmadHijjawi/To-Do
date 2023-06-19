const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    toDoText: {
      type: "String",
      required: true,
    },
    dateIssued: {
      type: "Date",
      default: () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    toDoDate: {
      type: "Date",
      required: true,
      get: function (value) {
        // Format the date as desired
        // Here's an example of formatting it as "YYYY-MM-DD"
        const formattedDate = value.toISOString().split("T")[0];
        return formattedDate;
      },
    },
    importance: {
      type: "String",

      enum: ["Improtant", "Very important", "Extremly important"],
      default: "Improtant",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ToDo must belong to a user."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;
