const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Please tell use your name"],
    },
    email: {
      type: "String",
      required: [true, "Please provide  your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    role: {
      type: "String",
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: "String",
      requure: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: "String",
      required: [true, "Please confirm your password"],
      //this will only work on save or create not on update
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "passwords are not the same",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("toDos", {
  ref: "ToDo",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "toDos",
  });
  next();
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
