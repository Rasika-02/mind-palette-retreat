import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smile,
  Meh,
  Frown,
  Heart,
  Sun,
  Cloud,
  Star,
  TrendingUp,
  Calendar as CalendarIcon,
  X,
  Plus,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, isSameDay } from "date-fns";
import moodIllustration from "@/assets/mood-illustration.png";
import EmojiPicker from "emoji-picker-react";

interface MoodEntry {
  id: string;
  mood: string;
  date: string;
  note: string | null;
}

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [todayEntries, setTodayEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 🆕 Custom moods with emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMoodName, setNewMoodName] = useState("");
  const [newMoodEmoji, setNewMoodEmoji] = useState("😀");

  // 🧠 Moods directly from calendar
  const [calendarMood, setCalendarMood] = useState("");
  const [calendarNote, setCalendarNote] = useState("");
  const [isAddingMood, setIsAddingMood] = useState(false);

  // 💡 Weekly mood insights
  const [moodAdvice, setMoodAdvice] = useState("");

  const [moods, setMoods] = useState([
    { icon: Smile, label: "Happy", color: "text-success", bg: "bg-success/10 hover:bg-success/20", emoji: "😊" },
    { icon: Heart, label: "Grateful", color: "text-accent", bg: "bg-accent/10 hover:bg-accent/20", emoji: "💖" },
    { icon: Sun, label: "Energetic", color: "text-zen-star", bg: "bg-zen-star/10 hover:bg-zen-star/20", emoji: "⚡" },
    { icon: Meh, label: "Calm", color: "text-primary", bg: "bg-primary/10 hover:bg-primary/20", emoji: "😌" },
    { icon: Cloud, label: "Tired", color: "text-muted-foreground", bg: "bg-muted hover:bg-muted/80", emoji: "😴" },
    { icon: Frown, label: "Sad", color: "text-destructive", bg: "bg-destructive/10 hover:bg-destructive/20", emoji: "😢" },
  ]);

  // 🧠 Load from localStorage
  useEffect(() => {
    const savedMoods = localStorage.getItem("moodEntries");
    if (savedMoods) setMoodEntries(JSON.parse(savedMoods));
  }, []);

  // 🧠 Save to localStorage
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  // ✅ Fetch from Supabase if logged in
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) fetchMoodEntries();
    })();
  }, []);

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    setTodayEntries(moodEntries.filter((entry) => entry.date === today));
  }, [moodEntries]);

 useEffect(() => {
  if (moodEntries.length > 0) {
    const advice = getMoodAdvice();
    setMoodAdvice(advice);
  }
}, [moodEntries, calendarMood]);


  // 🧩 Fetch moods from Supabase (only if logged in)
  const fetchMoodEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;
      setMoodEntries(data || []);
    } catch (error) {
      console.error("Error fetching mood entries:", error);
    }
  };

  // ✅ Add mood entry (today)
  const addMoodEntry = async () => {
    if (!selectedMood) {
      toast({ title: "Please select a mood", variant: "destructive" });
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      date: format(new Date(), "yyyy-MM-dd"),
      note: note || null,
    };

    setMoodEntries((prev) => [...prev, newEntry]);
    setSelectedMood(null);
    setNote("");
    toast({ title: "Mood saved 💙", description: "Your mood has been added locally." });

    // Optional: Sync with Supabase if logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from("mood_entries").insert({
        user_id: user.id,
        mood: selectedMood,
        date: newEntry.date,
        note: note || null,
      });
      if (!error) fetchMoodEntries();
    }
  };

  const deleteMoodEntry = async (id: string) => {
    setMoodEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast({ title: "Mood deleted", description: "Removed from your log." });
  };

  // 🧘 Weekly mood advice generator
  // 🧘 Weekly mood advice generator — now with more emotion-specific insights
// 🧘 Better weekly mood advice — recognizes emojis and custom moods
// 🧘 Better weekly mood advice — recognizes emojis and custom moods
const getMoodAdvice = () => {
  if (!moodEntries || moodEntries.length === 0) {
    return "Track a few moods to get your personalized insight 🌈";
  }

  const moodsCount = moodEntries.reduce((acc, entry) => {
    const mood = entry.mood.toLowerCase();
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostFrequent = Object.entries(moodsCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

  if (mostFrequent.includes("angry") || mostFrequent.includes("😡")) {
    return "You seem frustrated 😡. Try calming deep breaths, short walks, or journaling to release tension.";
  }
  if (mostFrequent.includes("anxious") || mostFrequent.includes("😟") || mostFrequent.includes("😰")) {
    return "Feeling anxious 😟? Try mindfulness, gentle stretching, or calming music to ground yourself.";
  }
  if (mostFrequent.includes("sad") || mostFrequent.includes("😢")) {
    return "You've been feeling down 💙. It’s okay to rest and talk to someone you trust.";
  }
  if (mostFrequent.includes("tired") || mostFrequent.includes("😴")) {
    return "You’re probably drained 😴 — get some rest, hydrate, and take it easy today.";
  }
  if (mostFrequent.includes("calm") || mostFrequent.includes("😌")) {
    return "You're peaceful 🌿 — keep protecting your calm energy with slow mornings or journaling.";
  }
  if (mostFrequent.includes("energetic") || mostFrequent.includes("⚡")) {
    return "You're energetic ⚡ — channel that spark into creativity or movement!";
  }
  if (mostFrequent.includes("grateful") || mostFrequent.includes("💖")) {
    return "You’re glowing with gratitude 💖 — share it by expressing appreciation to someone.";
  }
  if (mostFrequent.includes("happy") || mostFrequent.includes("😊") || mostFrequent.includes("😄")) {
    return "Happiness shines through 😄! Keep sharing your positivity with those around you 🌈.";
  }

  return "Track a few more moods to receive deeper weekly insights 🌈";
};


  const getMoodForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return moodEntries.filter((entry) => entry.date === dateStr);
  };

 // ✅ Smarter emoji detector for both built-in and custom moods
const getMoodEmoji = (moodLabel: string) => {
  // if the user already typed an emoji (like "angry 😡" or "sad 😢")
  const match = moodLabel.match(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu);
  if (match && match.length > 0) {
    return match[match.length - 1]; // return the last emoji typed
  }

  // otherwise use built-in moods
  const mood = moods.find((m) => m.label.toLowerCase() === moodLabel.toLowerCase());
  return mood?.emoji || "🌈";
};


  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden">
      {/* Floating background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm animate-float"
            style={{
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="text-center md:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
                <Heart className="w-4 h-4 animate-pulse-soft" />
                <span className="text-sm font-medium">Mood Tracker</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                How Are You Feeling?
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your emotional journey with love and care. Every feeling matters.
              </p>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <img src={moodIllustration} alt="Mood Illustration" className="w-full h-auto drop-shadow-2xl rounded-3xl animate-float" />
            </div>
          </div>

          {/* Mood Selector */}
          <Card className="mb-8 animate-slide-up border-2 shadow-float">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-zen-star animate-twinkle" />
                Today's Mood Check-In
              </CardTitle>
              <CardDescription>Select how you feel right now</CardDescription>

              {/* Add Custom Mood */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMoodName}
                    onChange={(e) => setNewMoodName(e.target.value)}
                    placeholder="Enter mood name"
                    className="border border-primary/30 rounded-lg px-3 py-2 text-sm"
                  />
                  <Button variant="outline" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    {newMoodEmoji} Pick Emoji
                  </Button>
                  {showEmojiPicker && (
                    <div className="absolute mt-2 z-50">
                      <EmojiPicker onEmojiClick={(emoji) => {
                        setNewMoodEmoji(emoji.emoji);
                        setShowEmojiPicker(false);
                      }} />
                    </div>
                  )}
                  <Button
                    onClick={() => {
                      if (!newMoodName.trim()) return alert("Enter a mood name!");
                      setMoods([
                        ...moods,
                        { icon: Star, label: newMoodName, color: "text-primary", bg: "bg-primary/10 hover:bg-primary/20", emoji: newMoodEmoji },
                      ]);
                      setNewMoodName("");
                      setNewMoodEmoji("😀");
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Mood
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Mood buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.label;
                  return (
                    <Button
                      key={mood.label}
                      variant="outline"
                      onClick={() => setSelectedMood(mood.label)}
                      className={cn("h-28 flex-col gap-3 border-2 transition-all", mood.bg, isSelected && "ring-2 ring-primary scale-105 shadow-glow")}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={cn("w-6 h-6", mood.color)} />
                        <span className="text-2xl">{mood.emoji}</span>
                      </div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Add note */}
              {selectedMood && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
                  <p className="text-sm text-center mb-4">
                    You're feeling <span className="font-semibold text-primary">{selectedMood}</span> today 💙
                  </p>
                  <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note (optional)" />
                  <Button onClick={addMoodEntry} disabled={loading} className="w-full mt-3">
                    <Plus className="w-4 h-4 mr-2" /> Add Mood Entry
                  </Button>
                </div>
              )}

              {/* Today's entries */}
              {todayEntries.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-zen-star" /> Today's Entries ({todayEntries.length})
                  </h3>
                  {todayEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start justify-between p-3 rounded-lg bg-card border-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          <span className="font-medium">{entry.mood}</span>
                        </div>
                        {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteMoodEntry(entry.id)} className="text-destructive hover:bg-destructive/10">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 📅 Mood Calendar */}
          <Card className="animate-slide-up border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="w-5 h-5 text-accent" /> Mood Calendar
              </CardTitle>
              <CardDescription>Track moods and add emoji entries directly on your calendar.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  {/* ➕ Add Mood to Calendar */}
                  {selectedDate && (
                    <div className="mb-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <h3 className="font-medium mb-2">
                        Add Mood for {format(selectedDate, "MMMM d, yyyy")}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="text"
                          value={calendarMood}
                          onChange={(e) => setCalendarMood(e.target.value)}
                          placeholder="Type your mood (e.g. Anxious 😟)"
                          className="w-full rounded-md border p-2 text-sm"
                        />
                        <Button
                          variant="outline"
                          onClick={async () => {
                            if (!calendarMood.trim()) return;
                            setIsAddingMood(true);
                            try {
                              const localEntry = {
                                id: Date.now().toString(),
                                mood: calendarMood,
                                date: format(selectedDate, "yyyy-MM-dd"),
                                note: calendarNote || null,
                              };
                              setMoodEntries((prev) => [...prev, localEntry]);
                              toast({ title: "Mood added 💜", description: "Added to calendar." });
                              setCalendarMood("");
                            } catch (err) {
                              console.error(err);
                              toast({ title: "Error adding mood", variant: "destructive" });
                            } finally {
                              setIsAddingMood(false);
                            }
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add
                        </Button>
                      </div>
                    </div>
                  )}

                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-lg border-2 border-primary/20 p-4 bg-white shadow-soft"
                    modifiers={{
                      hasMood: (date) => getMoodForDate(date).length > 0,
                    }}
                    components={{
                      Day: ({ date, ...props }) => {
                        const entries = getMoodForDate(date);
                        const isToday = isSameDay(date, new Date());
                        return (
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                {...props}
                                className={cn(
                                  "relative h-9 w-9 p-0 hover:bg-accent/50 rounded-md transition-all",
                                  isToday && "bg-accent text-accent-foreground font-bold",
                                  entries.length > 0 && "ring-2 ring-primary"
                                )}
                              >
                                <span>{format(date, "d")}</span>
                                {entries.length > 0 && (
                                  <div className="absolute -top-1 -right-1 flex gap-0.5">
                                    {entries.slice(0, 3).map((entry, i) => (
                                      <span key={i} className="text-xs">{getMoodEmoji(entry.mood)}</span>
                                    ))}
                                  </div>
                                )}
                              </button>
                            </PopoverTrigger>

                            {entries.length > 0 && (
                              <PopoverContent className="w-80" align="center">
                                <div className="space-y-3">
                                  <h4 className="font-medium">{format(date, "MMMM d, yyyy")}</h4>
                                  {entries.map((entry) => (
                                    <div key={entry.id} className="flex items-start justify-between p-3 rounded-lg bg-muted">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                                          <span className="font-medium">{entry.mood}</span>
                                        </div>
                                        {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteMoodEntry(entry.id)}
                                        className="text-destructive hover:bg-destructive/10"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </PopoverContent>
                            )}
                          </Popover>
                        );
                      },
                    }}
                  />
                </div>

                {/* Weekly Mood Advice */}
                <div className="lg:w-80 mt-6 lg:mt-0 p-4 border-2 border-accent/30 rounded-xl bg-accent/5 shadow-soft">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" /> Weekly Mood Insight
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{moodAdvice}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mood;
