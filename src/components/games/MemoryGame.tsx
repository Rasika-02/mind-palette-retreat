import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const emojiSets = {
  1: ["🌸", "🌺", "🌼", "🌻", "🌷", "🌹"],
  2: ["🌸", "🌺", "🌼", "🌻", "🌷", "🌹", "🏵️", "💐"],
  3: ["🌸", "🌺", "🌼", "🌻", "🌷", "🌹", "🏵️", "💐", "🌿", "🍀", "🎋", "🎍"],
};

const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestMoves, setBestMoves] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = (newLevel?: number) => {
    const currentLevel = (newLevel || level) as 1 | 2 | 3;
    const emojis = emojiSets[currentLevel];
    const gameCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsComplete(false);
    setIsPlaying(true);
    setTimeLeft(currentLevel === 1 ? 60 : currentLevel === 2 ? 90 : 120);
    if (newLevel) setLevel(newLevel);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!isPlaying || isComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          toast.error("Time's up! Try again!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isComplete]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setIsComplete(true);
      setIsPlaying(false);
      const newBest = [...bestMoves];
      newBest[level - 1] = bestMoves[level - 1] ? Math.min(bestMoves[level - 1], moves) : moves;
      setBestMoves(newBest);
      toast.success(`🎉 Level ${level} completed in ${moves} moves!`);
    }
  }, [matched, cards.length, moves, level]);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }, [flipped]);

  const handleCardClick = (index: number) => {
    if (!isPlaying || flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped([...flipped, index]);
  };

  const nextLevel = () => {
    if (level < 3) {
      initializeGame(level + 1);
    }
  };

  const gridCols = level === 1 ? "grid-cols-3" : level === 2 ? "grid-cols-4" : "grid-cols-4";
  const maxWidth = level === 1 ? "300px" : level === 2 ? "400px" : "500px";

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="flex gap-2">
          {[1, 2, 3].map((l) => (
            <Button
              key={l}
              onClick={() => initializeGame(l)}
              variant={level === l ? "default" : "outline"}
              size="sm"
              className="animate-scale-in"
            >
              Level {l}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className={`text-lg font-semibold animate-pulse ${timeLeft < 10 ? "text-destructive" : "text-primary"}`}>
          ⏱️ {timeLeft}s
        </div>
        <div className="text-lg font-semibold">
          Moves: <span className="text-primary">{moves}</span>
        </div>
        <div className="text-lg font-semibold">
          Pairs: <span className="text-accent">{matched.length / 2}/{cards.length / 2}</span>
        </div>
        {bestMoves[level - 1] && (
          <div className="text-sm text-muted-foreground">
            Best: {bestMoves[level - 1]} moves
          </div>
        )}
        <Button onClick={() => initializeGame()} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>
      </div>

      <div className={`grid ${gridCols} gap-3 w-full animate-fade-in`} style={{ maxWidth }}>
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-3xl cursor-pointer transition-all duration-500 transform ${
              flipped.includes(index) || matched.includes(index)
                ? "bg-gradient-to-br from-accent to-primary text-white rotate-0 scale-100"
                : "bg-gradient-to-br from-primary/30 to-secondary/30 scale-95"
            } hover:scale-105 active:scale-90 shadow-lg ${
              matched.includes(index) ? "opacity-70 animate-pulse" : ""
            } ${!isPlaying && !isComplete ? "opacity-50" : ""}`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {flipped.includes(index) || matched.includes(index) ? (
              <span className="animate-scale-in">{card}</span>
            ) : (
              <Sparkles className="w-6 h-6 text-primary" />
            )}
          </Card>
        ))}
      </div>

      {!isPlaying && !isComplete && timeLeft === 0 && (
        <div className="text-center animate-fade-in">
          <p className="text-xl font-bold text-destructive">Time's Up!</p>
          <Button onClick={() => initializeGame()} className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {isComplete && (
        <div className="text-center animate-fade-in space-y-3">
          <Trophy className="w-16 h-16 text-accent mx-auto animate-bounce" />
          <p className="text-2xl font-bold text-primary">Level {level} Complete! 🎉</p>
          <p className="text-muted-foreground">
            Completed in {moves} moves with {timeLeft}s remaining!
          </p>
          {level < 3 && (
            <Button onClick={nextLevel} size="lg" className="animate-scale-in">
              Next Level →
            </Button>
          )}
          {level === 3 && (
            <p className="text-lg text-accent font-semibold">🏆 Memory Master!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
