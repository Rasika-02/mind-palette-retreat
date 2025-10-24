import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Heart } from "lucide-react";

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

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. Your feelings are completely valid. 🌸",
        "I hear you, and I want you to know you're not alone in this. Let's work through it together. 💜",
        "That sounds like it's been challenging. Remember to be gentle with yourself. You're doing great. 🌟",
        "It's wonderful that you're taking time to reflect on this. Self-awareness is a beautiful strength. 🦋",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              AI Companion
            </h1>
            <p className="text-lg text-muted-foreground">
              A caring friend who's always here for you
            </p>
          </div>

          <Card className="mb-6 animate-slide-up border-2 shadow-float" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft">
                  <Heart className="w-6 h-6 text-white animate-pulse-soft" />
                </div>
                <div>
                  <CardTitle>Your AI Friend</CardTitle>
                  <CardDescription>Here to listen and support</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
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
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground ml-12"
                            : "bg-muted mr-12"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share your thoughts..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="border-2"
                />
                <Button onClick={handleSend} size="icon" className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="animate-slide-up border-2" style={{ animationDelay: "200ms" }}>
              <CardContent className="pt-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary animate-twinkle" />
                <p className="text-sm font-medium">Always Kind</p>
              </CardContent>
            </Card>
            <Card className="animate-slide-up border-2" style={{ animationDelay: "300ms" }}>
              <CardContent className="pt-6 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-accent animate-pulse-soft" />
                <p className="text-sm font-medium">Judgment-Free</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-gradient-to-r from-secondary/10 to-accent/10 border-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle>💬 Safe Space</CardTitle>
              <CardDescription className="text-base">
                This is your private, safe space to express yourself. Everything you share is confidential 
                and met with compassion and understanding.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
