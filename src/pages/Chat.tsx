import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Heart, MessageCircle, Shield, Clock } from "lucide-react";
import chatIllustration from "@/assets/chat-illustration.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello, friend! 💙 I'm here to listen and support you. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. Your feelings are completely valid. 🌸",
        "I hear you, and I want you to know you're not alone in this. Let's work through it together. 💜",
        "That sounds like it's been challenging. Remember to be gentle with yourself. You're doing great. 🌟",
        "It's wonderful that you're taking time to reflect on this. Self-awareness is a beautiful strength. 🦋",
        "I'm so glad you felt comfortable sharing this with me. Let's explore this feeling together. 💙",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "I'm feeling anxious",
    "Tell me something calming",
    "I need motivation",
    "Share a positive thought",
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header with Illustration */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="order-2 md:order-1 text-center md:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
                <MessageCircle className="w-4 h-4 animate-pulse-soft" />
                <span className="text-sm font-medium">AI Companion</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
                Your Caring Friend
              </h1>
              <p className="text-lg text-muted-foreground">
                A safe, judgment-free space where you can share your thoughts and feelings. 
                I'm here to listen, support, and guide you with compassion.
              </p>
            </div>

            <div className="order-1 md:order-2 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <img 
                src={chatIllustration} 
                alt="Caring AI companion" 
                className="w-full h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="mb-6 animate-slide-up border-2 shadow-float" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
                    <Heart className="w-6 h-6 text-white animate-pulse-soft" />
                  </div>
                  <div>
                    <CardTitle>AI Companion</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
                      Always here for you
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <ScrollArea className="h-96 pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      } animate-slide-up`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div
                        className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-soft ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground ml-12"
                            : "bg-gradient-to-r from-muted to-muted/70 mr-12"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-slide-up">
                      <div className="max-w-[80%] px-5 py-3 rounded-2xl bg-muted mr-12 shadow-soft">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Replies */}
              <div className="mb-4 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(reply);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="text-xs border-2"
                  >
                    {reply}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share your thoughts..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="border-2"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSend} 
                  size="icon" 
                  className="shrink-0"
                  disabled={isTyping || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="animate-slide-up border-2 text-center" style={{ animationDelay: "200ms" }}>
              <CardContent className="pt-6 pb-4">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary animate-twinkle" />
                <p className="text-xs font-medium">Always Kind</p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up border-2 text-center" style={{ animationDelay: "250ms" }}>
              <CardContent className="pt-6 pb-4">
                <Heart className="w-8 h-8 mx-auto mb-2 text-accent animate-pulse-soft" />
                <p className="text-xs font-medium">Judgment-Free</p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up border-2 text-center" style={{ animationDelay: "300ms" }}>
              <CardContent className="pt-6 pb-4">
                <Shield className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="text-xs font-medium">Private & Safe</p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up border-2 text-center" style={{ animationDelay: "350ms" }}>
              <CardContent className="pt-6 pb-4">
                <Clock className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-xs font-medium">24/7 Available</p>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💬 Your Safe Space
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                This is your private, confidential space to express yourself freely. 
                Everything you share is met with compassion, understanding, and zero judgment. 
                I'm here to provide emotional support, gentle guidance, and a listening ear whenever you need it.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
