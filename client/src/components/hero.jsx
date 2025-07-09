import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Shop the latest trends with unbeatable prices</p>
        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
          Shop Now
        </Button>
      </div>
    </section>
  );
}