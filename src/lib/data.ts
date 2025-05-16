
import { formatDistanceToNow } from 'date-fns';

// Types
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

// Helper functions
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

// Sample data
export const sampleIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: '5 medium',
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    imageUrl: '/placeholder.svg',
    category: 'vegetable'
  },
  {
    id: '2',
    name: 'Bell Peppers',
    quantity: '3 large',
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day from now
    imageUrl: '/placeholder.svg',
    category: 'vegetable'
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: '500g',
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day from now
    imageUrl: '/placeholder.svg',
    category: 'meat'
  },
  {
    id: '4',
    name: 'Milk',
    quantity: '1L',
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days from now
    imageUrl: '/placeholder.svg',
    category: 'dairy'
  },
  {
    id: '5',
    name: 'Onions',
    quantity: '2 medium',
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    imageUrl: '/placeholder.svg',
    category: 'vegetable'
  },
  {
    id: '6',
    name: 'Bread',
    quantity: '1 loaf',
    expiryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago (expired)
    imageUrl: '/placeholder.svg',
    category: 'grain'
  },
  {
    id: '7',
    name: 'Apples',
    quantity: '4 medium',
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6), // 6 days from now
    imageUrl: '/placeholder.svg',
    category: 'fruit'
  }
];

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Quick Chicken Stir Fry',
    description: 'A delicious and healthy stir fry using ingredients about to expire. Perfect for a quick dinner!',
    imageUrl: '/placeholder.svg',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    ingredients: [
      { id: '3', name: 'Chicken Breast', quantity: '300g, sliced' },
      { id: '2', name: 'Bell Peppers', quantity: '2, sliced' },
      { id: '5', name: 'Onions', quantity: '1, sliced' },
      { id: '', name: 'Soy Sauce', quantity: '2 tbsp' },
      { id: '', name: 'Olive Oil', quantity: '1 tbsp' },
      { id: '', name: 'Garlic', quantity: '2 cloves, minced' }
    ],
    instructions: [
      'Heat oil in a large pan or wok over high heat.',
      'Add chicken and cook until no longer pink, about 5 minutes.',
      'Add bell peppers, onions, and garlic, and stir-fry for 3-4 minutes until vegetables are tender-crisp.',
      'Pour soy sauce over the mixture and toss to coat.',
      'Serve hot over rice or noodles if desired.'
    ],
    tags: ['quick', 'healthy', 'dinner', 'high-protein']
  },
  {
    id: '2',
    name: 'Tomato and Bell Pepper Salad',
    description: 'A refreshing salad that makes good use of your tomatoes and bell peppers before they expire.',
    imageUrl: '/placeholder.svg',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    ingredients: [
      { id: '1', name: 'Tomatoes', quantity: '3, diced' },
      { id: '2', name: 'Bell Peppers', quantity: '1, diced' },
      { id: '', name: 'Cucumber', quantity: '1, diced' },
      { id: '', name: 'Feta Cheese', quantity: '100g, crumbled' },
      { id: '', name: 'Olive Oil', quantity: '2 tbsp' },
      { id: '', name: 'Lemon Juice', quantity: '1 tbsp' },
      { id: '', name: 'Salt and Pepper', quantity: 'to taste' }
    ],
    instructions: [
      'In a large bowl, combine diced tomatoes, bell peppers, and cucumber.',
      'Add crumbled feta cheese.',
      'In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.',
      'Pour dressing over salad and toss gently to combine.',
      'Serve immediately or chill before serving.'
    ],
    tags: ['vegetarian', 'salad', 'healthy', 'no-cook']
  },
  {
    id: '3',
    name: 'Apple Breakfast Smoothie',
    description: 'Use those apples before they go bad in this nutritious breakfast smoothie.',
    imageUrl: '/placeholder.svg',
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    ingredients: [
      { id: '7', name: 'Apples', quantity: '2, cored and chopped' },
      { id: '4', name: 'Milk', quantity: '1 cup' },
      { id: '', name: 'Greek Yogurt', quantity: '1/2 cup' },
      { id: '', name: 'Honey', quantity: '1 tbsp' },
      { id: '', name: 'Cinnamon', quantity: '1/4 tsp' },
      { id: '', name: 'Ice Cubes', quantity: '1/2 cup (optional)' }
    ],
    instructions: [
      'Add all ingredients to a blender.',
      'Blend until smooth and creamy, about 30-60 seconds.',
      'Pour into a glass and sprinkle with additional cinnamon if desired.',
      'Serve immediately.'
    ],
    tags: ['breakfast', 'smoothie', 'quick', 'vegetarian']
  }
];

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

