
import { formatDistanceToNow } from 'date-fns';
import { Ingredient, Recipe } from './types';
import { sampleRecipes } from './data';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

// Helper functions for expiry date handling
export const getExpiryStatus = (date: Date) => {
  const now = new Date();
  const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'expired';
  if (diffDays <= 2) return 'critical';
  if (diffDays <= 5) return 'warning';
  return 'good';
};

export const getExpiryText = (date: Date) => {
  const status = getExpiryStatus(date);
  
  if (status === 'expired') {
    return `Expired ${formatDistanceToNow(date, { addSuffix: true })}`;
  }
  return `Expires ${formatDistanceToNow(date, { addSuffix: true })}`;
};

// Function to get recommended recipes based on expiring ingredients
export const getRecommendedRecipes = (ingredients: Ingredient[]): Recipe[] => {
  const expiringIngredients = ingredients.filter(ingredient => {
    const status = getExpiryStatus(ingredient.expiryDate);
    return status === 'critical' || status === 'warning';
  });
  
  if (expiringIngredients.length === 0) {
    return sampleRecipes;
  }
  
  // Simple recommendation logic: return recipes that use expiring ingredients
  const expiringIds = new Set(expiringIngredients.map(ing => ing.id));
  
  return sampleRecipes
    .map(recipe => {
      // Calculate a match score based on how many expiring ingredients are used
      const matchingIngredients = recipe.ingredients.filter(ing => expiringIds.has(ing.id));
      return {
        recipe,
        matchScore: matchingIngredients.length,
        matchingIngredients
      };
    })
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .map(item => item.recipe);
};
