"use client";

import { cn } from "../lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RecipeCards = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {recipes.map((recipe) => (
        <Link key={recipe._id} href={`/RecipeItem/${recipe._id}`}>
          <div key={recipe._id} className='max-w-xs w-full group/card'>
            <div
              className={cn(
                "cursor-pointer overflow-hidden relative card h-80 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-cover bg-center",
                "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)]"
              )}
              style={{
                backgroundImage: `url(${
                  recipe.imageUrl
                    ? `http://localhost:5000${recipe.imageUrl}`
                    : "/fallback-image.jpg"
                })`,
              }}>
              <div className='absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60'></div>
              <div className='flex flex-row items-center space-x-4 z-10'>
                <div className='h-10 w-10 p-3 flex items-center justify-center rounded-full border-2 bg-gray-600 text-white font-semibold'>
                  {recipe.user ? recipe.user[0].toUpperCase() : "U"}
                </div>
                <div className='flex flex-col'>
                  <p className='font-normal text-base text-gray-50 relative z-10'>
                    {recipe.user || "Anonymous"} {/* Display user name */}
                  </p>
                  <p className='text-sm text-gray-400'>
                    {new Date(recipe.createdAt).toDateString()}{" "}
                    {/* Display date */}
                  </p>
                </div>
              </div>
              <div className='text content'>
                <h1 className='font-bold text-xl md:text-2xl text-gray-50 relative z-10'>
                  {recipe.recipeName} {/* Display recipe name */}
                </h1>
                <p className='font-normal text-sm text-gray-50 relative z-10 my-4'>
                  {recipe.description.slice(0,10)} {/* Display recipe description */}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default RecipeCards;
