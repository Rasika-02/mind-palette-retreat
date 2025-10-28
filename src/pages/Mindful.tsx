import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Wind, Music, Dumbbell, Sun, Sparkles, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import mindfulIllustration from "@/assets/mindful-illustration.png";

const Mindful = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale">("inhale");

  const activities = [
    {
      icon: BookOpen,
      title: "Journal",
      description: "Write your thoughts in a digital notebook",
      color: "from-accent to-secondary",
      action: "Start Writing",
      time: "10 min",
    },
    {
      icon: Wind,
      title: "Breathing",
      description: "Guided breathing exercises for calm",
      color: "from-primary to-zen-sea",
      action: "Begin Exercise",
      time: "5 min",
    },
    {
      icon: Dumbbell,
      title: "Gentle Stretches",
      description: "Mini workouts to energize your body",
      color: "from-success to-zen-leaf",
      action: "Start Stretching",
      time: "15 min",
    },
    {
      icon: Music,
      title: "Soothing Music",
      description: "Curated playlists for your mood",
      color: "from-secondary to-accent",
      action: "Explore Music",
      time: "∞",
    },
  ];

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
    if (!breathingActive) {
      const interval = setInterval(() => {
        setBreathPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));
      }, 4000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Illustration */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="text-center md:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
                <Sun className="w-4 h-4 animate-pulse-soft" />
                <span className="text-sm font-medium">Mindful Practice</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent">
                Daily Mindful Moments
              </h1>
              <p className="text-lg text-muted-foreground">
                Take a pause from the chaos. Breathe, stretch, reflect, and find your center with gentle daily practices.
              </p>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <img 
                src={mindfulIllustration} 
                alt="Person meditating peacefully" 
                className="w-full h-auto drop-shadow-2xl rounded-3xl animate-float"
              />
            </div>
          </div>

          {/* Breathing Exercise Featured */}
          <Card className="mb-8 overflow-hidden animate-slide-up border-2 shadow-float">
            <div className="h-2 bg-gradient-to-r from-primary to-zen-sea" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-6 h-6 text-primary" />
                Guided Breathing Exercise
              </CardTitle>
              <CardDescription>Center yourself with the rhythm of your breath — 4 seconds in, 4 seconds out</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6 py-8">
                <div
                  className={`relative w-40 h-40 rounded-full bg-gradient-to-br from-primary to-zen-sea shadow-glow flex items-center justify-center transition-all duration-[4000ms] ${
                    breathingActive
                      ? breathPhase === "inhale"
                        ? "scale-125"
                        : "scale-100"
                      : "scale-100"
                  }`}
                >
                  {/* Animated rings */}
                  <div className={cn(
                    "absolute inset-0 rounded-full border-4 border-primary/30 transition-all duration-[4000ms]",
                    breathingActive && breathPhase === "inhale" && "scale-150 opacity-0"
                  )} />
                  <div className={cn(
                    "absolute inset-0 rounded-full border-4 border-primary/20 transition-all duration-[4000ms] delay-500",
                    breathingActive && breathPhase === "inhale" && "scale-150 opacity-0"
                  )} />
                  
                  <div className="text-white text-center z-10">
                    {breathingActive ? (
                      <>
                        <div className="text-2xl font-bold mb-1">
                          {breathPhase === "inhale" ? "Breathe In" : "Breathe Out"}
                        </div>
                        <div className="text-sm opacity-80">4 seconds</div>
                      </>
                    ) : (
                      <Sun className="w-12 h-12 animate-pulse-soft" />
                    )}
                  </div>
                </div>

                <Button
                  onClick={toggleBreathing}
                  variant={breathingActive ? "outline" : "default"}
                  size="lg"
                  className="min-w-[200px] border-2"
                >
                  {breathingActive ? "Stop" : "Start"} Breathing
                </Button>

                {breathingActive && (
                  <div className="text-center space-y-2 animate-slide-up">
                    <p className="text-sm text-muted-foreground">
                      Follow the circle • Breathe with the rhythm • Feel the calm
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-primary">
                      <Sparkles className="w-3 h-3 animate-twinkle" />
                      <span>You're doing great</span>
                      <Sparkles className="w-3 h-3 animate-twinkle" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card
                  key={activity.title}
                  className="group hover:shadow-float transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-slide-up border-2"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${activity.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                    <CardTitle>{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-2">
                      {activity.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Daily Progress */}
          <Card className="mb-8 animate-slide-up border-2" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-zen-star animate-pulse-soft" />
                Today's Mindful Journey
              </CardTitle>
              <CardDescription>Track your daily self-care activities and build healthy habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Breathing Exercises</span>
                  <span className="text-muted-foreground">2/3 sessions</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Journal Entries</span>
                  <span className="text-muted-foreground">1/1 complete ✓</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Music Sessions</span>
                  <span className="text-muted-foreground">0/2 sessions</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Goal Progress</span>
                  <span className="text-2xl font-bold text-primary">55%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Music Selection */}
          <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-2 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-accent" />
                Mood-Based Music
              </CardTitle>
              <CardDescription>
                Select your preferences and we'll curate the perfect soundtrack for your current mood
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-3">Language Preferences</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-2">🌍 English</Button>
                  <Button variant="outline" size="sm" className="border-2">🇪🇸 Spanish</Button>
                  <Button variant="outline" size="sm" className="border-2">🇫🇷 French</Button>
                  <Button variant="outline" size="sm" className="border-2">🎵 Instrumental</Button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Mood & Genre</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-2">😌 Calm</Button>
                  <Button variant="outline" size="sm" className="border-2">⚡ Energetic</Button>
                  <Button variant="outline" size="sm" className="border-2">🎹 Classical</Button>
                  <Button variant="outline" size="sm" className="border-2">🌿 Nature</Button>
                </div>
              </div>
              <div className="text-center pt-4 text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                <Music className="w-8 h-8 mx-auto mb-2 text-accent animate-float" />
                <p>Personalized music recommendations coming soon!</p>
              </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Mindful;
