
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ingredient } from '@/lib/types';
import { getExpiryStatus, getExpiryText } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EmptyState from './ui/EmptyState';

interface InventorySectionProps {
  ingredients: Ingredient[];
}

const InventorySection: React.FC<InventorySectionProps> = ({ ingredients }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('expiring');

  // Filter ingredients by search query
  const filteredIngredients = ingredients.filter(
    (ingredient) => 
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter ingredients by tab
  const getTabIngredients = (tab: string) => {
    if (tab === 'all') return filteredIngredients;
    if (tab === 'expiring') {
      return filteredIngredients.filter(
        (ingredient) => ['critical', 'warning'].includes(getExpiryStatus(ingredient.expiryDate))
      );
    }
    if (tab === 'expired') {
      return filteredIngredients.filter(
        (ingredient) => getExpiryStatus(ingredient.expiryDate) === 'expired'
      );
    }
    return filteredIngredients;
  };

  const tabIngredients = getTabIngredients(activeTab);

  const getExpiryBadgeColor = (status: string) => {
    switch (status) {
      case 'expired':
        return 'bg-destructive text-destructive-foreground';
      case 'critical':
        return 'bg-ep-brown-500 text-white';
      case 'warning':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-ep-green-500 text-white';
    }
  };

  return (
    <section id="inventory" className="py-10 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="expiring" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            {tabIngredients.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tabIngredients.map((ingredient) => {
                  const expiryStatus = getExpiryStatus(ingredient.expiryDate);
                  const badgeClass = getExpiryBadgeColor(expiryStatus);
                  
                  return (
                    <Card key={ingredient.id} className="overflow-hidden">
                      <div className="h-24 bg-muted flex items-center justify-center">
                        <img
                          src={ingredient.imageUrl}
                          alt={ingredient.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{ingredient.name}</h3>
                            <p className="text-sm text-muted-foreground">{ingredient.quantity}</p>
                          </div>
                          <Badge className={badgeClass}>
                            {expiryStatus === 'expired' ? 'Expired' : expiryStatus === 'critical' ? 'Soon' : expiryStatus === 'warning' ? 'Coming up' : 'Good'}
                          </Badge>
                        </div>
                        <p className="text-xs mt-2 text-muted-foreground">
                          {getExpiryText(ingredient.expiryDate)}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="No ingredients found"
                description={
                  searchQuery
                    ? "Try a different search term"
                    : activeTab === "expired"
                    ? "No expired ingredients"
                    : activeTab === "expiring"
                    ? "No ingredients expiring soon"
                    : "Add ingredients to your inventory"
                }
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InventorySection;
