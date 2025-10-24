import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Leaf, Plus, Moon, Star as StarIcon } from "lucide-react";
import zenIllustration from "@/assets/zen-illustration.png";

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
          {/* Header */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zen-sea/20 text-zen-sea mb-4">
              <Moon className="w-4 h-4 animate-twinkle" />
              <span className="text-sm font-medium">Your Sanctuary</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-zen-sea via-zen-leaf to-zen-sky bg-clip-text text-transparent">
              Zen Garden
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create your magical sanctuary by the starry sea. Each star represents a feeling, 
              each leaf a moment of gratitude. Watch your emotional landscape flourish.
            </p>
          </div>

          {/* Background Scene with Illustration */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Card className="overflow-hidden border-2 shadow-float">
              <div 
                className="relative h-96 md:h-[500px] cursor-pointer overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${zenIllustration})` }}
                onClick={addStar}
              >
                {/* Overlay for interactivity */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                {/* User-added Stars */}
                {stars.map((star, index) => (
                  <Sparkles
                    key={index}
                    className={`absolute w-5 h-5 ${star.color} animate-twinkle drop-shadow-glow`}
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  />
                ))}

                {/* Gratitude Tree Overlay */}
                {leaves.length > 0 && (
                  <div className="absolute bottom-8 right-8 space-y-2 max-w-xs">
                    {leaves.slice(0, 8).map((leaf, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 animate-slide-up bg-card/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-soft"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Leaf className="w-4 h-4 text-zen-leaf animate-float" />
                        <span className="text-xs font-medium max-w-[200px] truncate">
                          {leaf}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructions */}
                <div className="absolute top-4 left-4 right-4 text-center">
                  <div className="inline-block bg-card/95 backdrop-blur-sm px-6 py-3 rounded-full text-sm border-2 shadow-soft">
                    <Sparkles className="w-4 h-4 inline mr-2 text-zen-star animate-twinkle" />
                    Click anywhere to add stars of emotion
                  </div>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 flex gap-4">
                  <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm border-2 shadow-soft">
                    <StarIcon className="w-4 h-4 inline mr-1 text-zen-star" />
                    <span className="font-semibold">{stars.length}</span> stars
                  </div>
                  <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm border-2 shadow-soft">
                    <Leaf className="w-4 h-4 inline mr-1 text-zen-leaf" />
                    <span className="font-semibold">{leaves.length}</span> leaves
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="animate-slide-up border-2" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-zen-star animate-twinkle" />
                  Add a Star
                </CardTitle>
                <CardDescription>Each star represents a feeling, emotion, or special moment in your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={addStar} className="w-full group border-2">
                  <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Place a Star in Your Sky
                </Button>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-center text-muted-foreground">
                    ✨ <span className="font-semibold text-foreground">{stars.length}</span> stars are shining in your emotional sky
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-2" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-zen-leaf animate-float" />
                  Add a Gratitude Leaf
                </CardTitle>
                <CardDescription>Write what you're grateful for today and watch your tree grow</CardDescription>
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
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-center text-muted-foreground">
                    🌿 <span className="font-semibold text-foreground">{leaves.length}</span> leaves of gratitude are growing on your tree
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Gratitude List */}
          {leaves.length > 0 && (
            <Card className="mt-8 border-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle>🌸 Your Gratitude Garden</CardTitle>
                <CardDescription>All the beautiful moments you've acknowledged</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {leaves.map((leaf, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20 hover:bg-success/10 transition-colors"
                    >
                      <Leaf className="w-5 h-5 text-zen-leaf mt-0.5 animate-float flex-shrink-0" style={{ animationDelay: `${index * 0.3}s` }} />
                      <p className="text-sm">{leaf}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <Card className="mt-8 bg-gradient-to-r from-zen-sea/10 to-zen-leaf/10 border-2 animate-slide-up" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-zen-sky animate-pulse-soft" />
                Your Emotional Sanctuary
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                This magical garden is a living reflection of your emotional journey. 
                Every star you place represents a moment — joy, calm, hope, or peace. 
                Every gratitude leaf helps your inner tree flourish. 
                Return here whenever you need to center yourself and remember all the beauty in your life.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ZenGarden;
