import React, { useState, useEffect } from "react";
import Image from "next/image";

const RecipeForm = () => {
  const [userDetails, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("recipeUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parse JSON to object
      setUser(parsedUser);
    }
  }, []);

  const [recipeName, setRecipeName] = useState("");
  const [portionCount, setPortionCount] = useState(2);
  const [prepTimeHours, setPrepTimeHours] = useState(1);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(0);
  const [bakingTimeHours, setBakingTimeHours] = useState(1);
  const [bakingTimeMinutes, setBakingTimeMinutes] = useState(0);
  const [restingTimeHours, setRestingTimeHours] = useState(1);
  const [restingTimeMinutes, setRestingTimeMinutes] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  // Handle API Call for Recipe Creation
  const handleRecipeSubmit = async () => {
    // Basic form validation
    if (
      !recipeName ||
      !portionCount ||
      !prepTimeHours ||
      !prepTimeMinutes ||
      !bakingTimeHours ||
      !bakingTimeMinutes ||
      !restingTimeHours ||
      !restingTimeMinutes ||
      !description ||
      !ingredients
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const recipeData = new FormData();
    recipeData.append("recipeName", recipeName);
    recipeData.append("portionCount", portionCount);

    // Append time fields if required (checking for existence)
    if (prepTimeHours && prepTimeMinutes) {
      recipeData.append("prepTime", `${prepTimeHours}:${prepTimeMinutes}`);
    }
    if (bakingTimeHours && bakingTimeMinutes) {
      recipeData.append(
        "bakingTime",
        `${bakingTimeHours}:${bakingTimeMinutes}`
      );
    }
    if (restingTimeHours && restingTimeMinutes) {
      recipeData.append(
        "restingTime",
        `${restingTimeHours}:${restingTimeMinutes}`
      );
    }

    recipeData.append("ingredients", JSON.stringify(ingredients));
    recipeData.append("difficulty", difficulty);
    recipeData.append("description", description);
    recipeData.append("user", userDetails.username);
    if (imageFile) {
      recipeData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        "https://snapnspice-1.onrender.com/api/recipes",
        {
          method: "POST",
          body: recipeData, // Send the FormData with the image and the recipe data
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get the error message from the server
        throw new Error(errorData.message || "Network response was not ok");
      }

      const result = await response.json();
      console.log("Recipe successfully added:", result);
      setRecipeName("");
      setPortionCount(2);
      setPrepTimeHours(1);
      setPrepTimeMinutes(0);
      setBakingTimeHours(1);
      setBakingTimeMinutes(0);
      setRestingTimeHours(1);
      setRestingTimeMinutes(0);
      setIngredients([]);
      setNewIngredient("");
      setDescription("");
      setDifficulty("");
      setImagePreview("");
      setImageFile("");

      // Show the success popup
      setPopupVisible(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle adding a new ingredient
  const handleAddIngredient = () => {
    if (newIngredient.trim() === "") return;
    const ingredient = { id: Date.now(), name: newIngredient };
    setIngredients([...ingredients, ingredient]);
    setNewIngredient("");
  };

  // Handle deleting an ingredient
  const handleDeleteIngredient = (id) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredients(updatedIngredients);
  };

  // Handle editing an ingredient
  const handleEditIngredient = (id, name) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, name } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <div className='p-4 sm:p-8'>
      <div className='max-w-3xl mx-auto bg-white p-3 sm:p-8 rounded-lg shadow-lg'>
        {/* Recipe Name Section */}
        <div className='mb-6'>
          <label
            className='block text-sm font-semibold text-gray-700'
            htmlFor='recipe-name'>
            NAME YOUR RECIPE
          </label>
          <input
            id='recipe-name'
            name='recipe-name'
            type='text'
            placeholder='Apple Pie'
            className='mt-1 p-2 w-full text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>
        {/* Add Photo Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            ADD A PHOTO
          </label>
          <div className='mt-1 flex items-center'>
            {imagePreview ? (
              <Image
                alt='Recipe'
                className='h-24 w-24 object-cover rounded-lg'
                src={imagePreview}
                height={24}
                width={24}
              />
            ) : (
              <p>No image selected</p>
            )}
            <div className='ml-2'>
              <input
                type='file'
                onChange={handleImageChange}
                className='text-black'
              />
            </div>
          </div>
        </div>
        {/* Portion Type Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            PORTION TYPE
          </label>
          <p className='text-xs text-gray-500 mb-2'>
            Choose between servings (a filling portion for one person) or pieces
            (e.g., slices of cake).
          </p>
          <div className='flex items-center space-x-4'>
            <input
              type='number'
              min='1'
              className='p-2 w-16 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={portionCount}
              onChange={(e) => setPortionCount(Number(e.target.value))}
            />
            <select className='text-black'>
              <option>serving</option>
              <option>pieces</option>
            </select>
          </div>
        </div>
        {/* Difficulty Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            DIFFICULTY
          </label>
          <p className='text-xs text-gray-500 mb-2'>
            How complicated is your dish?
          </p>
          <div className='flex items-center space-x-4'>
            <button
              className={`border border-gray-300 rounded-md p-2 ${
                difficulty === "Easy" ? "bg-blue-200" : "bg-white"
              } text-gray-700 hover:bg-gray-100`}
              onClick={() => setDifficulty("Easy")}>
              Easy 👍
            </button>
            <button
              className={`border border-gray-300 rounded-md p-2 ${
                difficulty === "Medium" ? "bg-blue-200" : "bg-white"
              } text-gray-700 hover:bg-gray-100`}
              onClick={() => setDifficulty("Medium")}>
              Medium 👍
            </button>
            <button
              className={`border border-gray-300 rounded-md p-2 ${
                difficulty === "Hard" ? "bg-blue-200" : "bg-white"
              } text-gray-700 hover:bg-gray-100`}
              onClick={() => setDifficulty("Hard")}>
              Hard 👍
            </button>
          </div>
        </div>
        {/* Prep Time Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            Prep Time
          </label>
          <p className='text-xs text-gray-500 mb-2'>
            How much time do you actively spend making the dish?
          </p>
          <div className='flex items-center space-x-4'>
            <input
              type='number'
              className='p-1 w-12 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={prepTimeHours}
              onChange={(e) => setPrepTimeHours(e.target.value)}
            />
            <span className='text-black text-sm'>hours</span>
            <input
              type='number'
              className='p-1 w-12 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={prepTimeMinutes}
              onChange={(e) => setPrepTimeMinutes(e.target.value)}
            />
            <span className='text-black text-sm'>minutes</span>
          </div>
        </div>
        {/* Baking Time Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            Baking Time
          </label>
          <p className='text-xs text-gray-500 mb-2'>
            How long does the dish need to bake for?
          </p>
          <div className='flex items-center space-x-4'>
            <input
              type='number'
              className='p-1 w-12 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={bakingTimeHours}
              onChange={(e) => setBakingTimeHours(e.target.value)}
            />
            <span className='text-black text-sm'>hours</span>
            <input
              type='number'
              className='p-1 w-12 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={bakingTimeMinutes}
              onChange={(e) => setBakingTimeMinutes(e.target.value)}
            />
            <span className='text-black text-sm'>minutes</span>
          </div>
        </div>
        {/* Resting Time Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            Resting Time
          </label>
          <p className='text-xs text-gray-500 mb-2'>
            Does the dish need to rest at any point?
          </p>
          <div className='flex items-center space-x-4'>
            <input
              type='number'
              className='p-1 w-12 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={restingTimeHours}
              onChange={(e) => setRestingTimeHours(e.target.value)}
            />
            <span className='text-black text-sm'>hours</span>
            <input
              type='number'
              className='p-1 w-12 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={restingTimeMinutes}
              onChange={(e) => setRestingTimeMinutes(e.target.value)}
            />
            <span className='text-black text-sm'>minutes</span>
          </div>
        </div>
        {/* Ingredients Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            INGREDIENTS
          </label>
          <div className='mb-2'>
            <input
              type='text'
              placeholder='Add ingredient'
              className='p-2 w-full text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <button
              onClick={handleAddIngredient}
              className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md'>
              Add Ingredient
            </button>
          </div>
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className='flex justify-between items-center mb=2'>
              <input
                type='text'
                value={ingredient.name}
                className='p-2 w-full border text-black border-gray-300 rounded-md focus:ring=2 focus:ring-indigo-500'
                onChange={(e) =>
                  handleEditIngredient(ingredient.id, e.target.value)
                }
              />
              <button
                onClick={() => handleDeleteIngredient(ingredient.id)}
                className='ml-2 px-4 py-2 bg-red-500 text-white rounded-md'>
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700'>
            Description
          </label>
          <textarea
            className='p-2 w-full text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows='4'
            placeholder='Enter a description for the dish'></textarea>
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
          <button
            onClick={handleRecipeSubmit}
            className='bg-blue-600 text-black py-2 px-6 rounded-lg shadow-md'>
            Save Recipe
          </button>
        </div>
        {popupVisible && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='bg-white p-6 rounded-md shadow-lg text-center'>
              <p className='text-green-600 font-semibold'>
                Recipe added successfully!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
