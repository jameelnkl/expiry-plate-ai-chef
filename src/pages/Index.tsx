
import React from 'react';
import Header from '@/components/Header';
import InventorySection from '@/components/InventorySection';
import ScanSection from '@/components/ScanSection';
import RecipeSection from '@/components/RecipeSection';
import Footer from '@/components/Footer';
import { sampleIngredients, sampleRecipes } from '@/lib/data';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-ep-green-50 to-background">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Reduce Food Waste with AI-Powered Recipe Recommendations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ExpiryPlate helps you use ingredients before they expire by suggesting personalized recipes tailored to what's in your kitchen.
            </p>
          </div>
        </section>
      
        <InventorySection ingredients={sampleIngredients} />
        <ScanSection />
        <RecipeSection recipes={sampleRecipes} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
