import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    title: "Breakfast",
    description: "Start your day with delicious morning recipes",
    path: "/breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80"
  },
  {
    title: "Lunch",
    description: "Perfect midday meals to keep you energized",
    path: "/lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    disabled: true
  },
  {
    title: "Dinner",
    description: "Hearty evening dishes for the whole family",
    path: "/dinner",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    disabled: true
  },
  {
    title: "Dessert",
    description: "Sweet treats to satisfy your cravings",
    path: "/dessert",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
    disabled: true
  },
  {
    title: "Snacks",
    description: "Quick bites for any time of day",
    path: "/snacks",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&q=80",
    disabled: true
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-aharoni font-bold text-primary text-center">
            Chappies voor Wappies
          </h1>
          <p className="text-center text-muted-foreground mt-3 text-lg">
            Your personal recipe collection
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link 
              key={category.title} 
              to={category.path}
              className={category.disabled ? "pointer-events-none opacity-60" : ""}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-aharoni text-2xl text-foreground">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                  {category.disabled && (
                    <span className="text-xs text-muted-foreground italic">
                      Coming soon...
                    </span>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
