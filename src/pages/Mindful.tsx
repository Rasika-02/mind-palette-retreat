import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Wind, Music, Dumbbell, Sun, Sparkles, Clock, X, Edit, Trash2, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import mindfulIllustration from "@/assets/mindful-illustration.png";
import sleepyRain from "@/assets/sleepy-rain-116521.mp3";
import rainMeditation from "@/assets/meditative-rain-114484.mp3";
import ForestMorning from "@/assets/morning-in-the-forest-304565.mp3";
import Birds from "@/assets/relaxing-piano-in-nature-more-on-httpsmirceaiancubandcampcom-343213.mp3";
import paino from "@/assets/d-5-425174.mp3";
import peace from "@/assets/peaceful-moment-345050.mp3";
import Sunrised from "@/assets/sunrise-cinematic-hip-hop-403527.mp3";
import  Freshstart from "@/assets/sunrise-meditation-bowl-harmony-388639.mp3";

// Stretch steps data
const stretches = [
  {
    name: "Neck Rolls",
    desc: "Slowly roll your head in a full circle. Relax your neck and breathe normally.",
    icon: "🌀"
  },
  {
    name: "Shoulder Shrugs",
    desc: "Lift both shoulders toward your ears, hold, then release. Repeat a few times.",
    icon: "🤷"
  },
  {
    name: "Arm Stretch",
    desc: "Reach one arm across your body and gently pull with your opposite hand.",
    icon: "🦾"
  },
  {
    name: "Toe Touch",
    desc: "Stand or sit and gently reach for your toes, feeling a stretch in your back and legs.",
    icon: "🦶"
  },
  {
    name: "Finish",
    desc: "Great job! You've completed your gentle stretching routine.",
    icon: "✅"
  }
];

// Demo music tracks with working URLs
const demoTracks = [
  {
    title: "Peaceful Rain",
    artist: "Nature Sounds",
    url: sleepyRain,
    mood: "Rain",
  },
  {
    title: "Rain Meditation",
    artist: "Calm Collection",
    url: rainMeditation,
    mood: "Rain",
  },
  {
    title: "Forest Morning",
    artist: "Nature Sounds",
    url: ForestMorning,
    mood: "Nature",
  },
  {
    title: "Bird Songs",
    artist: "Natural Ambience",
    url: Birds ,
    mood: "Nature",
  },
  {
    title: "Calm Piano",
    artist: "Peaceful Melodies",
    url: paino,
    mood: "Calm",
  },
  {
    title: "Serene Moments",
    artist: "Relaxation Suite",
    url:peace,
    mood: "Calm",
  },
  {
    title: "Morning Awakening",
    artist: "Dawn Collection",
    url: Sunrised,
    mood: "Morning",
  },
  {
    title: "Sunrise Melody",
    artist: "Fresh Start",
    url: Freshstart,
    mood: "Morning",
  }
];

const Mindful = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale">("inhale");
  const breathingRef = useRef<HTMLDivElement>(null);

  // Gentle Stretches state
  const [stretchActive, setStretchActive] = useState(false);
  const [currentStretch, setCurrentStretch] = useState(0);

  // ===== Journal states and logic below =====
  const [journalOpen, setJournalOpen] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [journalEntries, setJournalEntries] = useState<{id: string, text: string, date: string}[]>([]);
  const [editEntryId, setEditEntryId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  
  // Music states
  const [musicActive, setMusicActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [selectedMood, setSelectedMood] = useState("Rain");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("mindfulJournal");
    if (saved) setJournalEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (breathingActive && breathingRef.current) {
      breathingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [breathingActive]);

  // Reload audio when track changes
  useEffect(() => {
    if (audioRef.current && musicActive) {
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  }, [currentTrack, selectedMood, musicActive]);

  const saveJournalEntries = (entries) => {
    setJournalEntries(entries);
    localStorage.setItem("mindfulJournal", JSON.stringify(entries));
  };

  const handleJournalSave = () => {
    if (journalText.trim() !== "") {
      const newEntry = {
        id: new Date().toISOString(),
        text: journalText,
        date: new Date().toLocaleString(),
      };
      const updated = [newEntry, ...journalEntries];
      saveJournalEntries(updated);
      setJournalText("");
    }
  };

  const startEditing = (entry) => {
    setEditEntryId(entry.id);
    setEditText(entry.text);
  };

  const saveEdit = () => {
    if (editText.trim() !== "") {
      const updated = journalEntries.map(entry =>
        entry.id === editEntryId ? { ...entry, text: editText } : entry
      );
      saveJournalEntries(updated);
      setEditEntryId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditEntryId(null);
    setEditText("");
  };

  const deleteEntry = (id) => {
    const updated = journalEntries.filter(entry => entry.id !== id);
    saveJournalEntries(updated);
  };

  // Get filtered tracks for current mood
  const getFilteredTracks = () => {
    return demoTracks.filter(track => track.mood === selectedMood);
  };

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
    setCurrentTrack(0);
  };

  const handlePreviousTrack = () => {
    const filteredTracks = getFilteredTracks();
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const handleNextTrack = () => {
    const filteredTracks = getFilteredTracks();
    if (currentTrack < filteredTracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  // ===== End Journal logic =====

  const activities = [
    {
      icon: BookOpen,
      title: "Journal",
      description: "Write your thoughts in a digital notebook",
      color: "from-accent to-secondary",
      action: "Start Writing",
      time: "10 min",
      onClick: () => setJournalOpen(true),
    },
    {
      icon: Wind,
      title: "Breathing",
      description: "Guided breathing exercises for calm",
      color: "from-primary to-zen-sea",
      action: "Begin Exercise",
      time: "5 min",
      onClick: () => setBreathingActive(true),
    },
    {
      icon: Dumbbell,
      title: "Gentle Stretches",
      description: "Mini workouts to energize your body",
      color: "from-success to-zen-leaf",
      action: "Start Stretching",
      time: "15 min",
      onClick: () => { setStretchActive(true); setCurrentStretch(0); },
    },
    {
      icon: Music,
      title: "Soothing Music",
      description: "Curated playlists for your mood",
      color: "from-secondary to-accent",
      action: "Explore Music",
      time: "∞",
      onClick: () => { setMusicActive(true); setSelectedMood("Rain"); setCurrentTrack(0); },
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
          <Card ref={breathingRef} className="mb-8 overflow-hidden animate-slide-up border-2 shadow-float">
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
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-2"
                      onClick={activity.onClick}
                    >
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
                  <span className="text-muted-foreground">
                    {journalEntries.length}/1 complete ✓
                  </span>
                </div>
                <Progress value={journalEntries.length > 0 ? 100 : 0} className="h-2" />
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
                  <span className="text-2xl font-bold text-primary">
                    {journalEntries.length > 0 ? "55%" : "50%"}
                  </span>
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

      {/* Music Modal */}
      {musicActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full relative flex flex-col items-center">
            <Button className="absolute top-4 right-4" size="icon" variant="ghost" onClick={() => setMusicActive(false)}>
              <X />
            </Button>
            <Music className="w-12 h-12 text-accent mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-accent">Select Your Mood</h2>
            <div className="flex gap-2 mb-6 w-full justify-center flex-wrap">
              {["Rain", "Nature", "Calm", "Morning"].map((mood) => (
                <Button
                  key={mood}
                  onClick={() => handleMoodChange(mood)}
                  variant={selectedMood === mood ? "default" : "outline"}
                  className="min-w-[80px]"
                >
                  {mood}
                </Button>
              ))}
            </div>
            {getFilteredTracks().length === 0 ? (
              <div className="text-muted-foreground">No tracks for this mood.</div>
            ) : (
              <>
                <div className="w-full text-center mb-4 bg-gradient-to-r from-accent/10 to-secondary/10 p-4 rounded-lg">
                  <div className="text-lg font-semibold text-accent mb-1">
                    {getFilteredTracks()[currentTrack].title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getFilteredTracks()[currentTrack].artist}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Track {currentTrack + 1} of {getFilteredTracks().length}
                  </div>
                </div>
                <audio
                  ref={audioRef}
                  src={getFilteredTracks()[currentTrack].url}
                  controls
                  autoPlay
                  className="w-full mb-4 rounded"
                  onEnded={handleNextTrack}
                />
                <div className="flex gap-3 w-full">
                  <Button
                    onClick={handlePreviousTrack}
                    disabled={currentTrack === 0}
                    variant="outline"
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextTrack}
                    disabled={currentTrack === getFilteredTracks().length - 1}
                    variant="outline"
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Gentle Stretches Modal */}
      {stretchActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative flex flex-col items-center">
            <Button className="absolute top-4 right-4" size="icon" variant="ghost"
              onClick={() => setStretchActive(false)}
            ><X /></Button>
            <div className="flex flex-col items-center space-y-2 w-full">
              <div className="text-5xl mb-2">{stretches[currentStretch].icon}</div>
              <h2 className="text-2xl font-bold mb-1 text-success">{stretches[currentStretch].name}</h2>
              <p className="mb-6 text-center text-muted-foreground">{stretches[currentStretch].desc}</p>
              <div className="flex gap-2">
                <Button disabled={currentStretch === 0}
                  onClick={() => setCurrentStretch(currentStretch - 1)}
                  variant="outline"
                >Previous</Button>
                {currentStretch < stretches.length - 1 ? (
                  <Button
                    onClick={() => setCurrentStretch(currentStretch + 1)}
                  >Next</Button>
                ) : (
                  <Button onClick={() => setStretchActive(false)}>
                    Done
                  </Button>
                )}
              </div>
              <div className="w-full h-2 bg-success/10 rounded mt-6">
                <div className="h-2 bg-success rounded transition-all duration-300"
                  style={{ width: `${((currentStretch + 1) / stretches.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === Journal Modal === */}
      {journalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-lg">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
            <Button className="absolute top-4 right-4" size="icon" variant="ghost" onClick={() => setJournalOpen(false)}><X /></Button>
            <h2 className="text-2xl font-bold mb-2 text-accent">My Mindful Journal</h2>
            <textarea
              className="w-full rounded-lg p-3 border border-muted focus:border-accent focus:ring-accent transition text-base mb-2"
              rows={4}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Write your thoughts, reflections, or affirmations..."
            />
            <Button className="w-full mb-4" onClick={handleJournalSave}>Save Entry</Button>
            <div className="overflow-y-auto max-h-56 space-y-4">
              {journalEntries.length === 0 ? (
                <Card>
                  <CardContent className="flex justify-center">
                    <Button variant="outline" className="w-full max-w-xs">
                      No entries yet. Start writing your first entry!
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                journalEntries.map((entry, i) => {
                  // Check if this entry is being edited
                  if (entry.id === editEntryId) {
                    return (
                      <Card key={entry.id} className="mb-2 break-inside-avoid bg-gradient-to-br from-accent/20 to-white border-l-4 border-accent rounded-xl shadow-md p-2">
                        <textarea
                          className="w-full rounded p-2 border border-muted mb-2"
                          rows={3}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={cancelEdit} className="flex items-center gap-1">
                            <X size={16} /> Cancel
                          </Button>
                          <Button onClick={saveEdit} className="flex items-center gap-1">
                            <Check size={16} /> Save
                          </Button>
                        </div>
                      </Card>
                    );
                  }
                  return (
                    <Card key={entry.id} className="mb-2 break-inside-avoid bg-gradient-to-br from-accent/20 to-white border-l-4 border-accent rounded-xl shadow-md p-4">
                      <CardContent>
                        <div className="text-xs text-right text-accent/70 mb-2">{entry.date}</div>
                        <div className="font-medium text-base mb-4 whitespace-pre-wrap">{entry.text}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => startEditing(entry)}><Edit size={16} /></Button>
                          <Button variant="outline" size="icon" onClick={() => deleteEntry(entry.id)}><Trash2 size={16} /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mindful;
