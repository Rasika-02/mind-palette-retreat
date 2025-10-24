import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Puzzle, ChefHat, Palette, Brain, Sparkles, Smile, Home } from "lucide-react";

const Games = () => {
  const games = [
    {
      icon: Puzzle,
      title: "Join the Pieces",
      description: "Calming puzzle game to piece together beautiful scenes",
      levels: 12,
      color: "from-primary to-primary-glow",
      badge: "Relaxing",
    },
    {
      icon: ChefHat,
      title: "Cooking Challenge",
      description: "Prepare delicious dishes level by level",
      levels: 15,
      color: "from-accent to-destructive",
      badge: "Creative",
    },
    {
      icon: Palette,
      title: "Drawing & Coloring",
      description: "Express yourself through art and colors",
      levels: "∞",
      color: "from-secondary to-accent",
      badge: "Expressive",
    },
    {
      icon: Brain,
      title: "Memory Match",
      description: "Find pairs and boost your memory gently",
      levels: 10,
      color: "from-success to-primary",
      badge: "Mindful",
    },
    {
      icon: Sparkles,
      title: "Sky Painter",
      description: "Paint the night sky with your imagination",
      levels: 8,
      color: "from-zen-sky to-zen-star",
      badge: "Magical",
    },
    {
      icon: Smile,
      title: "Catch the Smile",
      description: "Collect positive vibes falling from above",
      levels: 20,
      color: "from-muted to-success",
      badge: "Joyful",
    },
    {
      icon: Home,
      title: "Build Your World",
      description: "Construct your happy place piece by piece",
      levels: 18,
      color: "from-zen-sand to-zen-leaf",
      badge: "Peaceful",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Play Zone
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose a game that matches your mood. Each one is designed to bring you joy and calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <Card 
                key={game.title}
                className="group hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden animate-slide-up border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-3 bg-gradient-to-r ${game.color}`} />
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="secondary" className="animate-pulse-soft">
                      {game.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{game.levels}</span> Levels
                    </div>
                    <div className="text-sm font-medium text-primary group-hover:scale-110 transition-transform">
                      Play Now →
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-center">🎮 AI Emotion Tracking</CardTitle>
            <CardDescription className="text-center text-base">
              Our gentle AI observes your play style — speed, color choices, and interactions — 
              to better understand your emotional state and suggest the perfect game for you.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Games;
