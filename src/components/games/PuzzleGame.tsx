import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

const PuzzleGame = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestMoves, setBestMoves] = useState<number[]>([]);

  const getGridSize = () => {
    if (level === 1) return 3;
    if (level === 2) return 4;
    return 5;
  };

  const initializeGame = (newLevel?: number) => {
    const currentLevel = newLevel || level;
    const gridSize = currentLevel === 1 ? 3 : currentLevel === 2 ? 4 : 5;
    const totalTiles = gridSize * gridSize;
    const numbers = Array.from({ length: totalTiles }, (_, i) => i === totalTiles - 1 ? 0 : i + 1);
    
    // Shuffle tiles properly
    let shuffled = [...numbers];
    for (let i = 0; i < 100; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const validMoves = [];
      if (emptyIndex % gridSize !== 0) validMoves.push(emptyIndex - 1);
      if (emptyIndex % gridSize !== gridSize - 1) validMoves.push(emptyIndex + 1);
      if (emptyIndex >= gridSize) validMoves.push(emptyIndex - gridSize);
      if (emptyIndex < totalTiles - gridSize) validMoves.push(emptyIndex + gridSize);
      
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }
    
    setTiles(shuffled);
    setMoves(0);
    setIsComplete(false);
    if (newLevel) setLevel(newLevel);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const gridSize = getGridSize();
    const totalTiles = gridSize * gridSize;
    const solved = tiles.every((tile, index) => tile === index + 1 || (tile === 0 && index === totalTiles - 1));
    if (solved && moves > 0) {
      setIsComplete(true);
      const newBest = [...bestMoves];
      newBest[level - 1] = bestMoves[level - 1] ? Math.min(bestMoves[level - 1], moves) : moves;
      setBestMoves(newBest);
      toast.success(`🎉 Level ${level} completed in ${moves} moves!`);
    }
  }, [tiles, moves, level]);

  const handleTileClick = (index: number) => {
    if (isComplete) return;
    
    const gridSize = getGridSize();
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [];
    
    if (emptyIndex % gridSize !== 0) validMoves.push(emptyIndex - 1);
    if (emptyIndex % gridSize !== gridSize - 1) validMoves.push(emptyIndex + 1);
    if (emptyIndex >= gridSize) validMoves.push(emptyIndex - gridSize);
    if (emptyIndex < tiles.length - gridSize) validMoves.push(emptyIndex + gridSize);

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(moves + 1);
    }
  };

  const nextLevel = () => {
    if (level < 3) {
      initializeGame(level + 1);
    }
  };

  const gridSize = getGridSize();
  const maxWidth = gridSize === 3 ? "320px" : gridSize === 4 ? "400px" : "480px";
  const fontSize = gridSize === 3 ? "text-2xl" : gridSize === 4 ? "text-xl" : "text-lg";

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
        <div className="text-lg font-semibold animate-fade-in">
          Moves: <span className="text-primary font-bold">{moves}</span>
        </div>
        {bestMoves[level - 1] && (
          <div className="text-sm text-muted-foreground animate-fade-in">
            Best: {bestMoves[level - 1]} moves
          </div>
        )}
        <Button onClick={() => initializeGame()} variant="outline" size="sm">
          <Shuffle className="w-4 h-4 mr-2" />
          Restart
        </Button>
      </div>

      <div 
        className={`grid gap-2 w-full aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-4 rounded-2xl shadow-lg animate-scale-in`}
        style={{ 
          maxWidth,
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
        }}
      >
        {tiles.map((tile, index) => (
          <Card
            key={index}
            onClick={() => handleTileClick(index)}
            className={`flex items-center justify-center ${fontSize} font-bold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${
              tile === 0
                ? "bg-transparent border-dashed border-2 opacity-30"
                : "bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg hover:shadow-xl animate-fade-in"
            } ${isComplete ? "animate-bounce" : ""}`}
          >
            {tile !== 0 && tile}
          </Card>
        ))}
      </div>

      {isComplete && (
        <div className="text-center animate-fade-in space-y-3">
          <Trophy className="w-16 h-16 text-accent mx-auto animate-bounce" />
          <p className="text-2xl font-bold text-primary">Level {level} Complete! 🎉</p>
          <p className="text-muted-foreground">Solved in {moves} moves</p>
          {level < 3 && (
            <Button onClick={nextLevel} size="lg" className="animate-scale-in">
              Next Level →
            </Button>
          )}
          {level === 3 && (
            <p className="text-lg text-accent font-semibold">🏆 All Levels Mastered!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
