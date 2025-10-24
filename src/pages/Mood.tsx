import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Sun, Cloud, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { icon: Smile, label: "Happy", color: "text-success", bg: "bg-success/10 hover:bg-success/20" },
    { icon: Heart, label: "Grateful", color: "text-accent", bg: "bg-accent/10 hover:bg-accent/20" },
    { icon: Sun, label: "Energetic", color: "text-zen-star", bg: "bg-zen-star/10 hover:bg-zen-star/20" },
    { icon: Meh, label: "Calm", color: "text-primary", bg: "bg-primary/10 hover:bg-primary/20" },
    { icon: Cloud, label: "Tired", color: "text-muted-foreground", bg: "bg-muted hover:bg-muted/80" },
    { icon: Frown, label: "Sad", color: "text-destructive", bg: "bg-destructive/10 hover:bg-destructive/20" },
  ];

  const stats = [
    { label: "This Week", value: "Mostly Happy 😊", color: "text-success" },
    { label: "Last Month", value: "Calm Journey 🌊", color: "text-primary" },
    { label: "Streak", value: "7 Days 🔥", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              How Are You Feeling?
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your emotional journey with love and care
            </p>
          </div>

          {/* Mood Selector */}
          <Card className="mb-8 animate-slide-up border-2 shadow-float" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle>Today's Mood</CardTitle>
              <CardDescription>Select the emotion that best describes how you feel right now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.label;
                  
                  return (
                    <Button
                      key={mood.label}
                      variant="outline"
                      onClick={() => setSelectedMood(mood.label)}
                      className={cn(
                        "h-24 flex-col gap-2 transition-all duration-300 border-2",
                        mood.bg,
                        isSelected && "ring-2 ring-primary scale-105 shadow-glow"
                      )}
                    >
                      <Icon className={cn("w-8 h-8", mood.color, isSelected && "animate-bounce-in")} />
                      <span className="text-sm font-medium">{mood.label}</span>
                    </Button>
                  );
                })}
              </div>
              
              {selectedMood && (
                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 animate-slide-up">
                  <p className="text-sm text-center">
                    You're feeling <span className="font-semibold text-primary">{selectedMood}</span> today. 
                    That's wonderful to acknowledge! 💙
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="text-center animate-slide-up border-2 hover:shadow-float transition-all"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <CardHeader>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle className={cn("text-2xl", stat.color)}>
                    {stat.value}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Mood Chart Placeholder */}
          <Card className="animate-slide-up border-2" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-zen-star animate-twinkle" />
                Your Emotional Journey
              </CardTitle>
              <CardDescription>Visual representation of your moods over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 rounded-lg bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg mb-2">📊 Mood Chart Coming Soon</p>
                  <p className="text-sm">Track your emotions day by day</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflection Card */}
          <Card className="mt-8 bg-gradient-to-r from-accent/10 to-secondary/10 border-2 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle>💭 Daily Reflection</CardTitle>
              <CardDescription>Write down what made you feel this way (optional)</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-32 p-4 rounded-lg border-2 bg-card resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Today I felt..."
              />
              <Button className="mt-4 w-full md:w-auto">
                Save Reflection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mood;
