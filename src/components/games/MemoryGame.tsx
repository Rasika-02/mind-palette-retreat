import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const emojis = ["🌸", "🌺", "🌼", "🌻", "🌷", "🌹", "🏵️", "💐"];

const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setIsComplete(true);
      toast.success(`🎉 All pairs matched in ${moves} moves!`);
    }
  }, [matched, cards.length, moves]);

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
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped([...flipped, index]);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="text-lg font-semibold">Moves: <span className="text-primary">{moves}</span></div>
        <div className="text-lg font-semibold">Pairs: <span className="text-success">{matched.length / 2}/{emojis.length}</span></div>
        <Button onClick={initializeGame} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-[400px]">
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer transition-all duration-500 transform ${
              flipped.includes(index) || matched.includes(index)
                ? "bg-gradient-to-br from-success to-primary text-white rotate-0"
                : "bg-gradient-to-br from-muted to-muted-foreground/20 rotate-y-180"
            } hover:scale-105 shadow-lg ${matched.includes(index) ? "opacity-70" : ""}`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {flipped.includes(index) || matched.includes(index) ? card : "?"}
          </Card>
        ))}
      </div>

      {isComplete && (
        <div className="text-center animate-fade-in">
          <Trophy className="w-12 h-12 text-accent mx-auto mb-2 animate-bounce" />
          <p className="text-xl font-bold text-primary">Perfect Memory!</p>
          <p className="text-muted-foreground">Completed in {moves} moves</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
