import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Sun, Cloud, Star, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import moodIllustration from "@/assets/mood-illustration.png";

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { icon: Smile, label: "Happy", color: "text-success", bg: "bg-success/10 hover:bg-success/20", emoji: "😊" },
    { icon: Heart, label: "Grateful", color: "text-accent", bg: "bg-accent/10 hover:bg-accent/20", emoji: "💖" },
    { icon: Sun, label: "Energetic", color: "text-zen-star", bg: "bg-zen-star/10 hover:bg-zen-star/20", emoji: "⚡" },
    { icon: Meh, label: "Calm", color: "text-primary", bg: "bg-primary/10 hover:bg-primary/20", emoji: "😌" },
    { icon: Cloud, label: "Tired", color: "text-muted-foreground", bg: "bg-muted hover:bg-muted/80", emoji: "😴" },
    { icon: Frown, label: "Sad", color: "text-destructive", bg: "bg-destructive/10 hover:bg-destructive/20", emoji: "😢" },
  ];

  const stats = [
    { label: "This Week", value: "Mostly Happy", emoji: "😊", color: "text-success", progress: 85 },
    { label: "Last Month", value: "Calm Journey", emoji: "🌊", color: "text-primary", progress: 70 },
    { label: "Streak", value: "7 Days", emoji: "🔥", color: "text-accent", progress: 100 },
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with Illustration */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 md:order-1 text-center md:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
                <Heart className="w-4 h-4 animate-pulse-soft" />
                <span className="text-sm font-medium">Mood Tracker</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                How Are You Feeling?
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your emotional journey with love and care. Every feeling matters, and we're here to support you.
              </p>
            </div>

            <div className="order-1 md:order-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <img 
                src={moodIllustration} 
                alt="Person holding emotion cards" 
                className="w-full h-auto drop-shadow-2xl rounded-3xl animate-float"
              />
            </div>
          </div>

          {/* Mood Selector */}
          <Card className="mb-8 animate-slide-up border-2 shadow-float" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-zen-star animate-twinkle" />
                Today's Mood Check-In
              </CardTitle>
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
                        "h-28 flex-col gap-3 transition-all duration-300 border-2",
                        mood.bg,
                        isSelected && "ring-2 ring-primary scale-105 shadow-glow"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-6 h-6", mood.color, isSelected && "animate-bounce-in")} />
                        <span className="text-2xl">{mood.emoji}</span>
                      </div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </Button>
                  );
                })}
              </div>
              
              {selectedMood && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 animate-slide-up">
                  <p className="text-sm text-center">
                    You're feeling <span className="font-semibold text-primary">{selectedMood}</span> today. 
                    That's wonderful to acknowledge! 💙 Remember, all feelings are valid and part of your journey.
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
                className="animate-slide-up border-2 hover:shadow-float transition-all overflow-hidden"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs">{stat.label}</CardDescription>
                    <span className="text-2xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      {stat.emoji}
                    </span>
                  </div>
                  <CardTitle className={cn("text-xl", stat.color)}>
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000", stat.color.replace('text-', 'bg-'))}
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mood Insights */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="animate-slide-up border-2" style={{ animationDelay: "500ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Weekly Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-10">{day}</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all"
                          style={{ width: `${Math.random() * 50 + 30}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-2" style={{ animationDelay: "600ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-accent" />
                  Month Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const moods = ['success', 'primary', 'accent', 'muted'];
                    const mood = moods[Math.floor(Math.random() * moods.length)];
                    return (
                      <div
                        key={i}
                        className={cn(
                          "aspect-square rounded-lg transition-all hover:scale-110",
                          `bg-${mood}`
                        )}
                        title={`Day ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reflection Card */}
          <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-2 animate-slide-up" style={{ animationDelay: "700ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💭 Daily Reflection
              </CardTitle>
              <CardDescription>Write down what made you feel this way (optional but encouraged)</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-32 p-4 rounded-xl border-2 bg-card resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Today I felt this way because..."
              />
              <div className="flex gap-3 mt-4">
                <Button className="flex-1">
                  Save Reflection
                </Button>
                <Button variant="outline" className="border-2">
                  Skip for Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mood;
