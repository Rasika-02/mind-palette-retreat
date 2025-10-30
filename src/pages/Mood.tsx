import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown, Heart, Sun, Cloud, Star, TrendingUp, Calendar as CalendarIcon, X, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import moodIllustration from "@/assets/mood-illustration.png";

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

  const moods = [
    { icon: Smile, label: "Happy", color: "text-success", bg: "bg-success/10 hover:bg-success/20", emoji: "😊" },
    { icon: Heart, label: "Grateful", color: "text-accent", bg: "bg-accent/10 hover:bg-accent/20", emoji: "💖" },
    { icon: Sun, label: "Energetic", color: "text-zen-star", bg: "bg-zen-star/10 hover:bg-zen-star/20", emoji: "⚡" },
    { icon: Meh, label: "Calm", color: "text-primary", bg: "bg-primary/10 hover:bg-primary/20", emoji: "😌" },
    { icon: Cloud, label: "Tired", color: "text-muted-foreground", bg: "bg-muted hover:bg-muted/80", emoji: "😴" },
    { icon: Frown, label: "Sad", color: "text-destructive", bg: "bg-destructive/10 hover:bg-destructive/20", emoji: "😢" },
  ];

  useEffect(() => {
    fetchMoodEntries();
  }, []);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setTodayEntries(moodEntries.filter(entry => entry.date === today));
  }, [moodEntries]);

  const fetchMoodEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setMoodEntries(data || []);
    } catch (error) {
      console.error('Error fetching mood entries:', error);
    }
  };

  const addMoodEntry = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in to save your mood",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('mood_entries')
        .insert({
          user_id: user.id,
          mood: selectedMood,
          date: format(new Date(), 'yyyy-MM-dd'),
          note: note || null
        });

      if (error) throw error;

      toast({
        title: "Mood saved! 💙",
        description: "Your feeling has been recorded."
      });

      setSelectedMood(null);
      setNote("");
      fetchMoodEntries();
    } catch (error) {
      console.error('Error saving mood:', error);
      toast({
        title: "Error saving mood",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteMoodEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mood_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Mood deleted",
        description: "Entry has been removed."
      });

      fetchMoodEntries();
    } catch (error) {
      console.error('Error deleting mood:', error);
      toast({
        title: "Error deleting mood",
        variant: "destructive"
      });
    }
  };

  const getMoodForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return moodEntries.filter(entry => entry.date === dateStr);
  };

  const getMoodEmoji = (moodLabel: string) => {
    const mood = moods.find(m => m.label === moodLabel);
    return mood?.emoji || "😊";
  };

  const getMoodStats = () => {
    const thisWeek = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    const moodCounts = thisWeek.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0];
    
    return {
      weeklyMood: topMood ? `Mostly ${topMood[0]}` : "No data",
      weeklyEmoji: topMood ? getMoodEmoji(topMood[0]) : "📊",
      totalEntries: moodEntries.length,
      weeklyEntries: thisWeek.length
    };
  };

  const stats = getMoodStats();

  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden">
      {/* Decorative background with bubbles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-success/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-zen-star/15 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }} />
        
        {/* Animated bubbles */}
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
                  <p className="text-sm text-center mb-4">
                    You're feeling <span className="font-semibold text-primary">{selectedMood}</span> today. 
                    That's wonderful to acknowledge! 💙
                  </p>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note about how you're feeling (optional)..."
                    className="mb-3"
                  />
                  <Button onClick={addMoodEntry} disabled={loading} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Mood Entry
                  </Button>
                </div>
              )}

              {/* Today's mood entries */}
              {todayEntries.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-zen-star" />
                    Today's Entries ({todayEntries.length})
                  </h3>
                  {todayEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-card border-2 hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          <span className="font-medium">{entry.mood}</span>
                        </div>
                        {entry.note && (
                          <p className="text-sm text-muted-foreground">{entry.note}</p>
                        )}
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
              )}
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="animate-slide-up border-2 hover:shadow-float transition-all overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">This Week</CardDescription>
                  <span className="text-2xl animate-float">{stats.weeklyEmoji}</span>
                </div>
                <CardTitle className="text-xl text-success">
                  {stats.weeklyMood}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-success transition-all duration-1000"
                    style={{ width: `${Math.min((stats.weeklyEntries / 7) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-2 hover:shadow-float transition-all overflow-hidden" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">Total Entries</CardDescription>
                  <span className="text-2xl animate-float">📊</span>
                </div>
                <CardTitle className="text-xl text-primary">
                  {stats.totalEntries} Entries
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: "100%" }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up border-2 hover:shadow-float transition-all overflow-hidden" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">This Week</CardDescription>
                  <span className="text-2xl animate-float">🔥</span>
                </div>
                <CardTitle className="text-xl text-accent">
                  {stats.weeklyEntries} Days
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-accent transition-all duration-1000"
                    style={{ width: `${(stats.weeklyEntries / 7) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mood Calendar */}
          <Card className="animate-slide-up border-2" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="w-5 h-5 text-accent" />
                Mood Calendar
              </CardTitle>
              <CardDescription>
                View and manage your mood history. Click on any date to see or edit entries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasMood: (date) => {
                        const entries = getMoodForDate(date);
                        return entries.length > 0;
                      }
                    }}
                    modifiersClassNames={{
                      hasMood: "bg-primary/20 font-bold"
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
                                  "relative h-9 w-9 p-0 font-normal hover:bg-accent/50 rounded-md transition-all",
                                  isToday && "bg-accent text-accent-foreground font-bold",
                                  entries.length > 0 && "ring-2 ring-primary"
                                )}
                              >
                                <span>{format(date, 'd')}</span>
                                {entries.length > 0 && (
                                  <div className="absolute -top-1 -right-1 flex gap-0.5">
                                    {entries.slice(0, 3).map((entry, i) => (
                                      <span key={i} className="text-xs">
                                        {getMoodEmoji(entry.mood)}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </button>
                            </PopoverTrigger>
                            {entries.length > 0 && (
                              <PopoverContent className="w-80" align="center">
                                <div className="space-y-3">
                                  <h4 className="font-medium">
                                    {format(date, 'MMMM d, yyyy')}
                                  </h4>
                                  {entries.map((entry) => (
                                    <div
                                      key={entry.id}
                                      className="flex items-start justify-between p-3 rounded-lg bg-muted"
                                    >
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                                          <span className="font-medium">{entry.mood}</span>
                                        </div>
                                        {entry.note && (
                                          <p className="text-sm text-muted-foreground">{entry.note}</p>
                                        )}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteMoodEntry(entry.id)}
                                        className="text-destructive hover:bg-destructive/10 flex-shrink-0"
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
                      }
                    }}
                  />
                </div>

                {/* Selected date info */}
                {selectedDate && (
                  <div className="lg:w-80">
                    <div className="sticky top-4">
                      <h3 className="font-medium mb-3">{format(selectedDate, 'MMMM d, yyyy')}</h3>
                      {getMoodForDate(selectedDate).length > 0 ? (
                        <div className="space-y-2">
                          {getMoodForDate(selectedDate).map((entry) => (
                            <div
                              key={entry.id}
                              className="p-3 rounded-lg bg-card border-2 hover:shadow-md transition-all"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                                  <span className="font-medium">{entry.mood}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteMoodEntry(entry.id)}
                                  className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                              {entry.note && (
                                <p className="text-sm text-muted-foreground">{entry.note}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No mood entries for this date.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mood;
