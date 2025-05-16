
import React from 'react';
import { ArrowLeft, Clock, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Recipe } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container px-4 md:px-6 py-8 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-4 pl-0 hover:pl-1 transition-all"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      
      <div className="relative rounded-lg overflow-hidden h-64 md:h-80 mb-6">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {recipe.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-white border-white/40">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-lg">{recipe.description}</p>
            </CardContent>
          </Card>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <div className="flex-none mr-4">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                      {index + 1}
                    </div>
                  </div>
                  <div className="pt-1">{instruction}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="lg:w-72">
          <Card className="sticky top-20">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Prep: {recipe.prepTime}m</span>
                </div>
                <div className="flex items-center">
                  <Utensils className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Cook: {recipe.cookTime}m</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{ingredient.name}</span>
                      <span className="text-muted-foreground">{ingredient.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Serves</div>
                <div className="font-bold text-lg">{recipe.servings} people</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
