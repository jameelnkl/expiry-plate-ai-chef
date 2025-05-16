
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Utensils } from 'lucide-react';
import { Recipe } from '@/lib/types';

interface RecipeSectionProps {
  recipes: Recipe[];
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ recipes }) => {
  return (
    <section id="recipes" className="py-10 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recommended Recipes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={recipe.imageUrl} 
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="font-medium text-white">{recipe.name}</h3>
                </div>
              </div>
              <CardContent className="p-4 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {recipe.description}
                </p>
                
                <div className="flex justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{recipe.prepTime + recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center">
                    <Utensils className="h-4 w-4 mr-1" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button asChild className="w-full">
                  <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeSection;
