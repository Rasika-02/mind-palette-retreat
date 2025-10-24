import { Link } from "react-router-dom";
import { Sparkles, Gamepad2, Heart, Flower2, MessageCircle, Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const features = [
    {
      icon: Gamepad2,
      title: "Play & Heal",
      description: "Creative games that reflect your mood and bring joy",
      link: "/games",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Heart,
      title: "Track Your Mood",
      description: "Visualize your emotional journey with beautiful insights",
      link: "/mood",
      gradient: "from-accent to-primary",
    },
    {
      icon: Flower2,
      title: "Zen Garden",
      description: "Create your magical starry sanctuary by the sea",
      link: "/zen-garden",
      gradient: "from-success to-zen-sea",
    },
    {
      icon: MessageCircle,
      title: "AI Companion",
      description: "Talk to a caring friend who's always here for you",
      link: "/chat",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Sun,
      title: "Mindful Moments",
      description: "Daily practices, breathing exercises, and soothing music",
      link: "/mindful",
      gradient: "from-muted to-success",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4 animate-twinkle" />
            <span className="text-sm font-medium">Your Digital Retreat</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Paint Your Mind's Calm
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Welcome to MindCanvas — a cheerful, creative space where technology meets emotional wellness. 
            Explore games, track moods, and find your inner peace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full shadow-float hover:shadow-glow transition-all group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card 
                  className="group hover:shadow-float transition-all duration-300 hover:-translate-y-1 border-2 overflow-hidden animate-slide-up h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${feature.gradient}`} />
                  <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
          <CardContent className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-bounce-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">7+</div>
                <div className="text-sm text-muted-foreground">Healing Games</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: "100ms" }}>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: "200ms" }}>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Calm Moments</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: "300ms" }}>
                <div className="text-3xl md:text-4xl font-bold text-success mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Safe Space</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
