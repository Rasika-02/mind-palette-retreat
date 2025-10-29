import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Puzzle, ChefHat, Palette, Brain, Sparkles, Smile, Home, Trophy, Star } from "lucide-react";
import gamesIllustration from "@/assets/games-illustration.png";
import GameDialog from "@/components/games/GameDialog";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<{ title: string; description: string } | null>(null);

  const games = [
    {
      icon: Puzzle,
      title: "Join the Pieces",
      description: "Calming puzzle game to piece together beautiful scenes",
      levels: 12,
      color: "from-primary to-primary-glow",
      badge: "Relaxing",
      difficulty: "Easy",
    },
    {
      icon: ChefHat,
      title: "Cooking Challenge",
      description: "Prepare delicious dishes level by level",
      levels: 15,
      color: "from-accent to-destructive",
      badge: "Creative",
      difficulty: "Medium",
    },
    {
      icon: Palette,
      title: "Drawing & Coloring",
      description: "Express yourself through art and colors",
      levels: "∞",
      color: "from-secondary to-accent",
      badge: "Expressive",
      difficulty: "All Levels",
    },
    {
      icon: Brain,
      title: "Memory Match",
      description: "Find pairs and boost your memory gently",
      levels: 10,
      color: "from-success to-primary",
      badge: "Mindful",
      difficulty: "Easy",
    },
    {
      icon: Sparkles,
      title: "Sky Painter",
      description: "Paint the night sky with your imagination",
      levels: 8,
      color: "from-zen-sky to-zen-star",
      badge: "Magical",
      difficulty: "Easy",
    },
    {
      icon: Smile,
      title: "Catch the Smile",
      description: "Collect positive vibes falling from above",
      levels: 20,
      color: "from-muted to-success",
      badge: "Joyful",
      difficulty: "Medium",
    },
    {
      icon: Home,
      title: "Build Your World",
      description: "Construct your happy place piece by piece",
      levels: 18,
      color: "from-zen-sand to-zen-leaf",
      badge: "Peaceful",
      difficulty: "Medium",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Illustration */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-center md:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Play Zone</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Healing Through Play
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose a game that matches your mood. Each one is designed to bring you joy and calm while gently supporting your emotional wellbeing.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <img 
              src={gamesIllustration} 
              alt="Happy people playing games" 
              className="w-full h-auto drop-shadow-2xl rounded-3xl animate-float"
            />
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <Card 
                key={game.title}
                onClick={() => setSelectedGame({ title: game.title, description: game.description })}
                className="group hover:shadow-float transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden animate-slide-up border-2 active:scale-95"
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
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{game.levels}</span> Levels
                    </div>
                    <div className="px-3 py-1 rounded-full bg-muted text-xs">
                      {game.difficulty}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium text-primary group-hover:scale-105 transition-transform inline-flex items-center gap-1">
                      Play Now 
                      <Star className="w-3 h-3 fill-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>

          {/* Features Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-twinkle" />
                AI Emotion Tracking
              </CardTitle>
              <CardDescription className="text-base">
                Our gentle AI observes your play style — speed, color choices, and interactions — 
                to better understand your emotional state and suggest the perfect game for you.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-r from-accent/10 to-success/10 border-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                Earn Rewards
              </CardTitle>
              <CardDescription className="text-base">
                Collect stars, leaves, and tokens as you play. Use them in other sections like the Zen Garden 
                to unlock special features and customize your experience.
              </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Progress Card */}
          <Card className="mt-8 max-w-3xl mx-auto border-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="text-center">🎮 Your Gaming Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">47</div>
                <div className="text-xs text-muted-foreground">Games Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">156</div>
                <div className="text-xs text-muted-foreground">Stars Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-1">12</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedGame && (
        <GameDialog
          gameTitle={selectedGame.title}
          gameDescription={selectedGame.description}
          open={!!selectedGame}
          onOpenChange={(open) => !open && setSelectedGame(null)}
        />
      )}
    </div>
  );
};

export default Games;
