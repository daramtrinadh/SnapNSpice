const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Import models
const RecipeUser = require("./models/RecipeUser");
const RecipeSchema = require("./models/RecipeSchema"); // Ensure this is named correctly in your directory

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Multer setup for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./uploads");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1000000000 }, // 1MB file size limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "Only jpg, jpeg, png, pdf, doc, docx, xlsx, xls formats allowed."
        )
      );
    }
    cb(undefined, true);
  },
});

app.use(express.json());

// Endpoint to upload recipes with media files (images/videos)
app.post("/api/recipes", upload.single("image"), async (req, res) => {
  try {
    // Extract data from the request body
    const {
      recipeName,
      portionCount,
      prepTime,
      bakingTime,
      restingTime,
      ingredients,
      difficulty,
      description,
      user
    } = req.body;

    // Validate that all required fields are provided
    if (
      !recipeName ||
      !portionCount ||
      !prepTime ||
      !bakingTime ||
      !restingTime ||
      !ingredients ||
      !difficulty ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Parse time fields (assuming they are sent in 'HH:mm' format)
    const parseTime = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return { hours, minutes };
    };

    const prepTimeObj = parseTime(prepTime);
    const bakingTimeObj = parseTime(bakingTime);
    const restingTimeObj = parseTime(restingTime);
    

    // Handle file upload (if an image was provided)
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // URL to access the uploaded image
    }

    // Simulating saving the recipe data (replace with actual DB integration)
    const newRecipe = new RecipeSchema({
      recipeName,
      portionCount,
      prepTime: prepTimeObj,
      bakingTime: bakingTimeObj,
      restingTime: restingTimeObj,
      ingredients, // Assuming ingredients are JSON stringified in the frontend
      difficulty,
      description,
      user,
      imageUrl, // Include the uploaded image URL
    });
    await newRecipe.save();

    console.log("New recipe added:", newRecipe);

    // Respond with a success message and the created recipe data
    res
      .status(200)
      .json({ message: "Recipe successfully added", recipe: newRecipe });
  } catch (error) {
    console.error("Error processing the recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET API to retrieve all recipes
app.get("/api/recipes", async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await RecipeSchema.find();

    // Check if any recipes are found
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }

    // Respond with the recipes
    res.status(200).json({ message: "Recipes retrieved successfully", recipes });
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/recipes/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
     console.log("Received ID:", recipeId);

    // Find recipe by ID
    const recipe = await RecipeSchema.findById(recipeId);

    // Check if the recipe exists
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Return the recipe data
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Signup route
app.post("/recipe/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await RecipeUser.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email already exists. Please try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new RecipeUser({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "You can log in now" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post("/recipe/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await RecipeUser.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User not registered. Please sign up." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      userDetails: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server started and running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
