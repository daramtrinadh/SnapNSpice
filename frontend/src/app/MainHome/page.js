"use client";
import React from "react";
import Header from "../Header/Header";
// import Image from "next/image";
import AddRecipes from "../AddRecipes";
import DisplayRecipes from "../DisplayRecipes";
// import { motion } from "framer-motion";
// import { LampContainer } from "../components/ui/lamp";
import { Cover } from "../components/ui/cover";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { Tabs } from "../components/ui/tabs";
import withAuth from "../Authentication/withAuth";

const MainHome = () => {
  const tabs = [
    {
      title: "Recipes",
      value: "recipe",
      content: (
        <div className='w-full overflow-hidden relative min-h-screen rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-violet-900'>
          <p>Recipes </p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Add Recipe",
      value: "addrecipe",
      content: (
        <div className='w-full overflow-hidden relative min-h-screen rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-violet-900'>
          <p className='text-center m-3'>Share Your Recipe</p>
          <AddRecipe />
        </div>
      ),
    },
  ];
  const placeholders = [
    "Search Recipes",
    "How to create a recipe from scratch?",
    "What are the essential tools for a well-equipped kitchen?",
    "How to prepare your kitchen for meal prep?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <Header />
      <div>
        <h1 className='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          Explore amazing Recipes <br /> at <Cover>SnapNSpice</Cover>
        </h1>
      </div>
      <div className='flex flex-col justify-center items-center px-4'>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
      <div className='min-h-screen relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-20'>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default withAuth(MainHome);

const DummyContent = () => {
  return <DisplayRecipes />;
};
const AddRecipe = () => {
  return <AddRecipes />;
};
