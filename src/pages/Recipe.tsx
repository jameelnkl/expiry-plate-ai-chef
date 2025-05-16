
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import RecipeDetail from '@/components/RecipeDetail';
import Footer from '@/components/Footer';
import { sampleRecipes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const recipe = sampleRecipes.find(recipe => recipe.id === id);
  
  if (!recipe) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <ChefHat className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The recipe you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/')}>
            Back to Recipes
          </Button>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-4">
        <RecipeDetail recipe={recipe} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Recipe;
