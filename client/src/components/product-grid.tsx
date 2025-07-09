import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { Loader2, AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductGrid() {
  const { data: products, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 text-lg">Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-red-600 mb-6">We couldn't load the products right now. Please try again.</p>
        <Button 
          onClick={() => refetch()}
          className="bg-red-600 hover:bg-red-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
        <p className="text-gray-600">We don't have any products to show at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button variant="outline" className="px-8 py-3">
          Load More Products
        </Button>
      </div>
    </>
  );
}
