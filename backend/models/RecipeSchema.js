const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  portionCount: {
    type: Number,
    required: true,
  },
  prepTime: {
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    minutes: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
  },
  bakingTime: {
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    minutes: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
  },
  restingTime: {
    hours: {
      type: Number,
      required: true,
      min: 0,
    },
    minutes: {
      type: Number,
      required: true,
      min: 0,
      max: 59,
    },
  },
  ingredients: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file_path: {
    type: String,
    required: false, // Set as false if the image is optional
  },
  file_mimetype: {
    type: String,
    required: false,
  },
  user:{
    type:String,
  },
  imageUrl:{
    type:String,
    required:false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
