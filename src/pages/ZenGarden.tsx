import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Leaf, Plus } from "lucide-react";

const ZenGarden = () => {
  const [stars, setStars] = useState<Array<{ x: number; y: number; color: string }>>([]);
  const [leaves, setLeaves] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState("");

  const starColors = ["text-zen-star", "text-primary", "text-accent", "text-secondary"];

  const addStar = () => {
    const newStar = {
      x: Math.random() * 90,
      y: Math.random() * 60,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    };
    setStars([...stars, newStar]);
  };

  const addLeaf = () => {
    if (gratitude.trim()) {
      setLeaves([...leaves, gratitude]);
      setGratitude("");
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-zen-sea via-zen-leaf to-zen-sky bg-clip-text text-transparent">
              Zen Garden
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your magical sanctuary by the starry sea
            </p>
          </div>

          {/* Garden Canvas */}
          <Card className="mb-8 overflow-hidden animate-slide-up border-2 shadow-float" style={{ animationDelay: "100ms" }}>
            <div 
              className="relative h-96 md:h-[500px] bg-gradient-to-b from-zen-sky via-zen-sea to-zen-sand cursor-pointer overflow-hidden"
              onClick={addStar}
            >
              {/* Stars */}
              {stars.map((star, index) => (
                <Sparkles
                  key={index}
                  className={`absolute w-4 h-4 ${star.color} animate-twinkle`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                />
              ))}

              {/* Waves */}
              <div className="absolute bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-zen-sea/30 to-transparent animate-wave" />
              
              {/* Tree */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div className="relative">
                  {/* Trunk */}
                  <div className="w-8 h-32 bg-gradient-to-b from-accent/60 to-accent/40 rounded-t-lg mx-auto" />
                  
                  {/* Leaves on tree */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 space-y-2">
                    {leaves.slice(0, 10).map((leaf, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Leaf className="w-6 h-6 text-zen-leaf animate-float" />
                        <span className="text-xs text-card bg-zen-leaf/20 px-2 py-1 rounded-full backdrop-blur-sm max-w-[120px] truncate">
                          {leaf}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute top-4 left-4 right-4 text-center">
                <div className="inline-block bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm border-2">
                  ✨ Click anywhere to add stars • Add leaves of gratitude below
                </div>
              </div>
            </div>
          </Card>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-slide-up border-2" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-zen-star animate-twinkle" />
                  Add a Star
                </CardTitle>
                <CardDescription>Each star represents a feeling or moment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={addStar} className="w-full group">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Place a Star
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  {stars.length} stars shining in your sky
                </p>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-2" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-zen-leaf animate-float" />
                  Add a Gratitude Leaf
                </CardTitle>
                <CardDescription>Write what you're grateful for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                    placeholder="I'm grateful for..."
                    onKeyPress={(e) => e.key === "Enter" && addLeaf()}
                    className="border-2"
                  />
                  <Button onClick={addLeaf} size="icon" className="shrink-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  {leaves.length} leaves growing on your tree
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Info */}
          <Card className="mt-8 bg-gradient-to-r from-zen-sea/10 to-zen-leaf/10 border-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle>🌊 Your Emotional Sanctuary</CardTitle>
              <CardDescription className="text-base">
                This magical garden grows with you. Every star represents a moment, every leaf a gratitude. 
                Watch your emotional landscape flourish as you continue your journey.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZenGarden;
