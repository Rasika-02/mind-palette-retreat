import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

const PuzzleGame = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initializeGame = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const solved = tiles.every((tile, index) => tile === index + 1 || (tile === 0 && index === 8));
    if (solved && moves > 0) {
      setIsComplete(true);
      toast.success(`🎉 Puzzle solved in ${moves} moves!`);
    }
  }, [tiles, moves]);

  const handleTileClick = (index: number) => {
    if (isComplete) return;
    
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];

    if (validMoves.includes(index) && 
        !(emptyIndex % 3 === 0 && index === emptyIndex - 1) &&
        !(emptyIndex % 3 === 2 && index === emptyIndex + 1)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="text-lg font-semibold">Moves: <span className="text-primary">{moves}</span></div>
        <Button onClick={initializeGame} variant="outline" size="sm">
          <Shuffle className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-[320px] aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 p-4 rounded-2xl shadow-lg">
        {tiles.map((tile, index) => (
          <Card
            key={index}
            onClick={() => handleTileClick(index)}
            className={`flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 ${
              tile === 0
                ? "bg-transparent border-dashed border-2 opacity-30"
                : "bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg hover:shadow-xl"
            } ${isComplete ? "animate-bounce" : ""}`}
          >
            {tile !== 0 && tile}
          </Card>
        ))}
      </div>

      {isComplete && (
        <div className="text-center animate-fade-in">
          <Trophy className="w-12 h-12 text-accent mx-auto mb-2 animate-bounce" />
          <p className="text-xl font-bold text-primary">Congratulations!</p>
          <p className="text-muted-foreground">You solved it in {moves} moves</p>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
