"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/Header/Header";
import Footer from "@/app/Footer";
import { useParams } from "next/navigation";
import Image from "next/image";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://snapnspice-1.onrender.com/api/recipes/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe.");
        }
        const data = await response.json();
        console.log(data);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);
  const ingredients = recipe?.ingredients ? JSON.parse(recipe.ingredients) : [];

  const cleanText = (text) => {
    return text ? text.replace(/:+$/, "").trim() : "";
  };

  if (loading)
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <p className='text-xl text-gray-600'>Loading recipe...</p>
      </div>
    );

  if (error)
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <p className='text-xl text-red-500'>Error: {error}</p>
      </div>
    );

  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center w-full h-[50vh] sm:h-[60vh]'>
        <Image
          src={`https://snapnspice-1.onrender.com${recipe.imageUrl}`}
          alt={recipe.recipeName}
          className='object-cover flex items-center justify-center rounded-lg border-1'
          width={300} // Adjusted for clarity; can be dynamic
          height={300} // Adjusted for clarity; can be dynamic
        />
        <h1 className='text-4xl font-bold font-serif text-gray-800'>
          {recipe.recipeName}
        </h1>
      </div>
      <div className='p-4'>
        <div className='flex items-center mt-2 text-left p-5'>
          <div
            className='flex items-center justify-center 
                 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                 m-3 bg-yellow-200 rounded-full border border-yellow-300 
                 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black'>
            {recipe.user ? recipe.user[0].toUpperCase() : "U"}
          </div>

          <div>
            <p className='text-lg font-semibold'>
              {recipe.user ? recipe.user : "Username"}
            </p>
            <p className='text-gray-500 text-sm'>Community Member</p>
          </div>
        </div>
        <div className='flex flex-wrap justify-center bg-yellow-100 p-4 rounded-lg shadow-md'>
          {/* Difficulty Section */}
          <div className='m-3 w-full sm:w-1/2 md:w-1/4 lg:w-1/5'>
            <h1 className='text-lg font-semibold text-gray-800 mb-2'>
              Difficulty
            </h1>
            <p className='text-md font-medium text-gray-700'>
              {recipe.difficulty}
            </p>
          </div>

          {/* Preparation Section */}
          <div className='m-3 w-full sm:w-1/2 md:w-1/5 lg:w-1/5'>
            <h1 className='text-lg font-semibold text-gray-800 mb-2'>
              Preparation
            </h1>
            <p className='text-md font-medium text-gray-700'>
              {recipe.prepTime.hours}h {recipe.prepTime.minutes}min
            </p>
          </div>

          {/* Resting Section */}
          <div className='m-3 w-full sm:w-1/2 md:w-1/5 lg:w-1/5'>
            <h1 className='text-lg font-semibold text-gray-800 mb-2'>
              Resting
            </h1>
            <p className='text-md font-medium text-gray-700'>
              {recipe.restingTime.hours}h {recipe.restingTime.minutes}min
            </p>
          </div>

          {/* Baking Section */}
          <div className='m-3 w-full sm:w-1/2 md:w-1/5 lg:w-1/5'>
            <h1 className='text-lg font-semibold text-gray-800 mb-2'>Baking</h1>
            <p className='text-md font-medium text-gray-700'>
              {recipe.bakingTime.hours}h {recipe.bakingTime.minutes}min
            </p>
          </div>
        </div>
        <div className='ingredients-section p-4'>
          <h1 className='text-xl font-bold text-gray-800 mb-4'>Ingredients</h1>

          {/* List ingredients */}
          <ul className='list-none'>
            {ingredients.map((ingredient, index) => (
              <li key={ingredient.id || index} className='mb-2'>
                <span className='font-semibold text-gray-800'>
                  {cleanText(ingredient.name)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Recipe Description
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            {recipe.description || "No description available."}
          </p>
        </div>
        <div className='bg-green-200 p-6 rounded-lg text-center mt-6'>
          <h2 className='text-xl font-bold text-gray-800 mb-2'>
            Enjoy Your Meal!
          </h2>
          <p className='text-md text-gray-700'>
            We are glad you tried this recipe. We hope it turned out delicious!
            🍽️
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RecipeDetails;
