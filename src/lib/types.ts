
// Types for ingredients and recipes
export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  expiryDate: Date;
  imageUrl: string;
  category: 'vegetable' | 'fruit' | 'meat' | 'dairy' | 'grain' | 'other';
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
}
