"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../components/ui/wobble-card";
import FeatureComponent from '../FeatureComponent'

const Home=()=> {
  const popularRecipes = [
    { title: "Spicy Chicken Curry", img: "path/to/image1.jpg" },
    { title: "Vegetarian Pasta", img: "path/to/image2.jpg" },
    { title: "Chocolate Cake", img: "path/to/image3.jpg" },
    { title: "Chocolate Cake", img: "path/to/image3.jpg" },
  ];
  const features=[
          "Create and post your own recipes with step-by-step instructions, photos, and videos.",
          "Explore a curated collection of recipes from users around the world.",
          "Save your favorite recipes and build your personalized recipe book.",
          "Interact with the community by liking, commenting, and following your favorite chefs." ,
          "Interact with the community by liking, commenting, and following your favorite chefs."   
  ]
  const benefits = [
    "Save your favorite recipes.",
    "Upload your own recipes.",
    "Access exclusive content and features.",
    "Follow your favorite chefs and creators.",
    "Share recipes with friends and family.",
    "Discover trending recipes daily.",
    "Rate and review recipes you’ve tried.",
    "Save recipes for offline access.",
    "Join a community of food enthusiasts.",
    "Receive step-by-step cooking guidance.",
    "Participate in cooking challenges.",
];

  return (
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-full mx-auto  p-5 bg-black h-full">
      <WobbleCard
        containerClassName=" col-span-1 lg:col-span-1  bg-pink-800 min-h-[300px] lg:min-h-[300px] m-3 mb-2"
        className="cursor-pointer flex flex-row justify-center justify-items-center"
      >
        <div className="max-w-l">
          <h2 className="text-center text-balance text-base sm:text-xxl lg:text-3xl font-semibold  text-white">
          Trending Recipes
          </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-2  mx-auto w-full p-5">
          {popularRecipes.map((recipe, index) => (
            <div key={index} className="m-5">
              <Image src='/SnapNSpice.png' className="h-full w-full object-cover " alt={recipe.title} width={100} height={100} />
              <h3 className="text-white text-center ">{recipe.title}</h3>
            </div>
          ))}
        </div>
        </div>
        
      </WobbleCard>
      <WobbleCard containerClassName=" cursor-pointer col-span-1  min-h-[300px] m-3 mb-3 ">
        <h2 className="max-w-80  text-center text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Welcome to SnapNSpice!
        </h2>
        <ul className="features-list">
          {
            features.map((eachFeature,index)=>(
              <li key={index} className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">{eachFeature}</li>
            ))
          }
          
        </ul>
      </WobbleCard>
      <WobbleCard containerClassName="cursor-pointer m-3 col-span-1 lg:col-span-1 bg-blue-900 min-h-[300px] lg:min-h-[600px] xl:min-h-[300px] mb-3">
        <div className="max-w-sm ">
        <h1 className="max-w-sm md:max-w-lg  text-center text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">Why Sign Up?</h1>
        <ul>
          {benefits.map((benefit, index) => (
            <li className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200" key={index}>{benefit}</li>
          ))}
        </ul>
        </div>
        
      </WobbleCard>
    </div>
    <FeatureComponent/>
    </div>
  );
}

export default Home