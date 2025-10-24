import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Wind, Music, Dumbbell, Sun, Moon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
    },
    {
      icon: Wind,
      title: "Breathing",
      description: "Guided breathing exercises for calm",
      color: "from-primary to-zen-sea",
      action: "Begin Exercise",
    },
    {
      icon: Dumbbell,
      title: "Gentle Stretches",
      description: "Mini workouts to energize your body",
      color: "from-success to-zen-leaf",
      action: "Start Stretching",
    },
    {
      icon: Music,
      title: "Soothing Music",
      description: "Curated playlists for your mood",
      color: "from-secondary to-accent",
      action: "Explore Music",
    },
  ];

  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
    if (!breathingActive) {
      // Simulate breathing cycle
      const interval = setInterval(() => {
        setBreathPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));
      }, 4000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-success via-primary to-accent bg-clip-text text-transparent">
              Mindful Moments
            </h1>
            <p className="text-lg text-muted-foreground">
              Daily practices for healing and refreshment
            </p>
          </div>

          {/* Breathing Exercise Featured */}
          <Card className="mb-8 overflow-hidden animate-slide-up border-2 shadow-float">
            <div className="h-2 bg-gradient-to-r from-primary to-zen-sea" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-6 h-6 text-primary" />
                Breathing Exercise
              </CardTitle>
              <CardDescription>Take a moment to center yourself with guided breathing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6 py-8">
                <div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary to-zen-sea shadow-glow flex items-center justify-center transition-all duration-[4000ms] ${
                    breathingActive
                      ? breathPhase === "inhale"
                        ? "scale-125"
                        : "scale-100"
                      : "scale-100"
                  }`}
                >
                  <div className="text-white text-center">
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
                  className="min-w-[200px]"
                >
                  {breathingActive ? "Stop" : "Start"} Breathing
                </Button>

                {breathingActive && (
                  <p className="text-sm text-muted-foreground text-center animate-slide-up">
                    Follow the circle • Breathe with the rhythm • Feel the calm
                  </p>
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
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-soft`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {activity.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Daily Progress */}
          <Card className="animate-slide-up border-2" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-zen-star animate-pulse-soft" />
                Today's Mindful Journey
              </CardTitle>
              <CardDescription>Track your daily self-care activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Breathing Exercises</span>
                  <span className="text-muted-foreground">2/3</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Journal Entries</span>
                  <span className="text-muted-foreground">1/1</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Music Sessions</span>
                  <span className="text-muted-foreground">0/2</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Music Selection */}
          <Card className="mt-8 bg-gradient-to-r from-secondary/10 to-accent/10 border-2 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-accent" />
                Mood-Based Music
              </CardTitle>
              <CardDescription>
                Select your preferences and we'll suggest the perfect soundtrack for your mood
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">English</Button>
                <Button variant="outline" size="sm">Spanish</Button>
                <Button variant="outline" size="sm">French</Button>
                <Button variant="outline" size="sm">Classical</Button>
              </div>
              <div className="text-center pt-4 text-sm text-muted-foreground">
                🎵 Music selection coming soon
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mindful;
