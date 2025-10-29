import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Frown, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface FallingItem {
  id: number;
  x: number;
  y: number;
  isSmile: boolean;
  speed: number;
}

const CatchTheSmileGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameInterval = useRef<NodeJS.Timeout>();
  const itemIdCounter = useRef(0);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setItems([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    gameInterval.current = setInterval(() => {
      // Add new falling item
      const newItem: FallingItem = {
        id: itemIdCounter.current++,
        x: Math.random() * 90,
        y: 0,
        isSmile: Math.random() > 0.3,
        speed: 1 + Math.random() * 2,
      };

      setItems((prev) => [...prev, newItem]);
    }, 1000);

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveInterval = setInterval(() => {
      setItems((prev) => {
        const updated = prev.map((item) => ({
          ...item,
          y: item.y + item.speed,
        }));

        // Check for catches and misses
        updated.forEach((item) => {
          if (item.y > 85 && item.y < 95) {
            const basketCenter = basketX;
            const itemCenter = item.x;
            const distance = Math.abs(basketCenter - itemCenter);

            if (distance < 8) {
              if (item.isSmile) {
                setScore((s) => s + 10);
                toast.success("+10 points! 😊");
              } else {
                setLives((l) => Math.max(0, l - 1));
                toast.error("Oops! That was sadness 😢");
              }
            }
          } else if (item.y > 100 && item.isSmile) {
            setLives((l) => Math.max(0, l - 1));
          }
        });

        return updated.filter((item) => item.y < 100);
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isPlaying, gameOver, basketX]);

  useEffect(() => {
    if (lives <= 0 && isPlaying) {
      setGameOver(true);
      setIsPlaying(false);
      toast.error(`Game Over! Final Score: ${score}`);
    }
  }, [lives, isPlaying, score]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex items-center gap-6 flex-wrap justify-center">
        <div className="text-lg font-semibold">
          Score: <span className="text-primary">{score}</span>
        </div>
        <div className="text-lg font-semibold flex items-center gap-1">
          Lives: {Array.from({ length: lives }).map((_, i) => (
            <span key={i} className="text-destructive">❤️</span>
          ))}
        </div>
        {!isPlaying && (
          <Button onClick={startGame} variant="default">
            <RotateCcw className="w-4 h-4 mr-2" />
            {gameOver ? "Play Again" : "Start Game"}
          </Button>
        )}
      </div>

      <Card
        className="relative w-full max-w-[600px] h-[400px] bg-gradient-to-b from-sky-200 to-sky-100 overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Falling items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute text-4xl transition-all duration-100 animate-pulse"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {item.isSmile ? "😊" : "😢"}
          </div>
        ))}

        {/* Basket */}
        {isPlaying && (
          <div
            className="absolute bottom-4 w-16 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-t-full transition-all duration-100 flex items-center justify-center text-2xl shadow-lg"
            style={{
              left: `${basketX}%`,
              transform: "translateX(-50%)",
            }}
          >
            🧺
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <Smile className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Catch The Smile</h3>
              <p className="text-muted-foreground mb-4">Catch the happy faces, avoid the sad ones!</p>
              <Button onClick={startGame} size="lg">
                Start Playing
              </Button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-accent mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
              <p className="text-xl text-primary mb-4">Final Score: {score}</p>
              <Button onClick={startGame} size="lg">
                Play Again
              </Button>
            </div>
          </div>
        )}
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Move your mouse or finger to control the basket
      </p>
    </div>
  );
};

export default CatchTheSmileGame;
