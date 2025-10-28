import { Link } from "react-router-dom";
import { Sparkles, Gamepad2, Heart, Flower2, MessageCircle, Sun, ArrowRight, Star, Shield, Users, Zap, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroIllustration from "@/assets/hero-illustration.png";

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

  const testimonials = [
    { emoji: "🌸", text: "This app helped me find peace in chaos", author: "Sarah" },
    { emoji: "✨", text: "The games are therapeutic and fun!", author: "Mike" },
    { emoji: "💙", text: "My daily sanctuary for mental wellness", author: "Emma" },
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blob opacity-60" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-secondary/20 rounded-full blob opacity-50" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-accent/15 rounded-full blob opacity-40" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-primary/15 rounded-full blob opacity-50" style={{ animationDelay: "6s" }} />
      </div>

      {/* Hero Section with Illustration */}
      <section className="container mx-auto px-6 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center md:text-left animate-slide-up space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 animate-twinkle" />
              <span className="text-sm font-semibold">Your Digital Mental Health Retreat</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Take care of your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Mental Health
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl">
              MindCanvas is your cheerful companion for emotional wellness. Track your moods, 
              play therapeutic games, chat with an AI companion, and create your personal zen sanctuary — all in one beautiful space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full shadow-float hover:shadow-glow transition-all group text-base px-8 py-6">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 border-primary/30 hover:border-primary text-base px-8 py-6">
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground/60">100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground/60">10k+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground/60">AI-Powered</span>
              </div>
            </div>
          </div>

          <div className="animate-slide-up relative" style={{ animationDelay: "200ms" }}>
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50" />
            <img 
              src={heroIllustration} 
              alt="Person relaxing with warm drink in peaceful setting" 
              className="w-full h-auto drop-shadow-2xl animate-float relative z-10 rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose MindCanvas?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete mental wellness platform designed with care, creativity, and scientific backing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gamepad2, title: "7+ Healing Games", desc: "Therapeutic play for mood regulation", color: "primary" },
              { icon: MessageCircle, title: "24/7 AI Companion", desc: "Always here when you need support", color: "secondary" },
              { icon: Moon, title: "Zen Sanctuary", desc: "Your personal digital retreat", color: "accent" },
              { icon: Shield, title: "100% Private", desc: "Your data stays yours, always", color: "success" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={item.title}
                  className="text-center border-2 hover:shadow-float transition-all hover:-translate-y-1 animate-slide-up bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 flex items-center justify-center mb-4 mx-auto shadow-soft`}>
                      <Icon className={`w-8 h-8 text-${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16 md:py-20 relative">
        <div className="text-center mb-16 animate-slide-up space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Your Complete Wellness Toolkit
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Everything you need for your mental health journey in one beautiful, intuitive platform. 
            Each feature is carefully crafted to support your emotional wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card 
                  className="group hover:shadow-float transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden animate-slide-up h-full bg-card/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-3 bg-gradient-to-r ${feature.gradient}`} />
                  <CardHeader className="pb-4 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-soft">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-primary font-semibold group-hover:gap-2 transition-all">
                      Start Exploring
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How MindCanvas Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple steps to start your journey toward better mental health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                step: "1", 
                title: "Daily Check-In", 
                desc: "Start your day by logging how you feel. Track patterns over time with beautiful visualizations.",
                icon: Heart 
              },
              { 
                step: "2", 
                title: "Choose Your Path", 
                desc: "Play therapeutic games, chat with AI, or relax in your zen garden based on your current mood.",
                icon: Sparkles 
              },
              { 
                step: "3", 
                title: "See Progress", 
                desc: "Watch your emotional wellness journey unfold with insights, achievements, and positive patterns.",
                icon: Star 
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step}
                  className="text-center animate-slide-up space-y-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white font-bold flex items-center justify-center text-sm shadow-soft">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by Our Community
            </h2>
            <p className="text-muted-foreground text-lg">
              Real stories from real people finding peace with MindCanvas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="text-center border-2 animate-slide-up hover:shadow-float transition-all bg-card/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="text-5xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                    {testimonial.emoji}
                  </div>
                  <p className="text-base mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <p className="text-sm text-muted-foreground font-semibold">— {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <Card className="bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 border-2 border-primary/30 max-w-4xl mx-auto text-center overflow-hidden animate-slide-up relative">
          <CardContent className="py-16 px-8 md:px-12 relative">
            <div className="absolute top-6 right-6 animate-twinkle">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <div className="absolute bottom-6 left-6 animate-twinkle" style={{ animationDelay: "1s" }}>
              <Star className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute top-1/2 left-1/4 animate-twinkle" style={{ animationDelay: "1.5s" }}>
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Mental Wellness?
              </h2>
              <p className="text-foreground/80 mb-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Join over 10,000 people already using MindCanvas to find peace, track their emotional journey, 
                and build lasting positive mental health habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="rounded-full shadow-glow hover:scale-105 transition-transform text-base px-10 py-7">
                  Start Free Today
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-foreground/60">No credit card required • 100% free forever</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
