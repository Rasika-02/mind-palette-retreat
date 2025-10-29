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
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const gameInterval = useRef<NodeJS.Timeout>();
  const itemIdCounter = useRef(0);

  const getSpawnRate = () => level === 1 ? 1200 : level === 2 ? 800 : 500;
  const getSpeed = () => 1 + (level - 1) * 0.5 + Math.random() * 2;

  const startGame = (newLevel?: number) => {
    setScore(0);
    setLives(3);
    setItems([]);
    setGameOver(false);
    setIsPlaying(true);
    if (newLevel) setLevel(newLevel);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    gameInterval.current = setInterval(() => {
      const newItem: FallingItem = {
        id: itemIdCounter.current++,
        x: Math.random() * 90,
        y: 0,
        isSmile: Math.random() > 0.25,
        speed: getSpeed(),
      };

      setItems((prev) => [...prev, newItem]);
    }, getSpawnRate());

    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [isPlaying, gameOver, level]);

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
      if (score > highScore) {
        setHighScore(score);
        toast.success(`🏆 New High Score: ${score}!`);
      } else {
        toast.error(`Game Over! Score: ${score}`);
      }
    }
  }, [lives, isPlaying, score]);

  useEffect(() => {
    // Level up every 50 points
    if (score > 0 && score % 50 === 0 && level < 3) {
      setLevel((prev) => prev + 1);
      toast.success(`🎉 Level ${level + 1} Unlocked! Speed increased!`);
    }
  }, [score]);

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
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="flex gap-2">
          {[1, 2, 3].map((l) => (
            <Button
              key={l}
              onClick={() => startGame(l)}
              variant={level === l ? "default" : "outline"}
              size="sm"
              disabled={isPlaying}
              className="animate-scale-in"
            >
              Level {l}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 flex-wrap justify-center">
        <div className="text-lg font-semibold animate-fade-in">
          Score: <span className="text-primary font-bold text-xl">{score}</span>
        </div>
        <div className="text-lg font-semibold">
          Level: <span className="text-accent">{level}</span>
        </div>
        <div className="text-lg font-semibold flex items-center gap-1">
          Lives: {Array.from({ length: lives }).map((_, i) => (
            <span key={i} className="text-destructive animate-pulse">❤️</span>
          ))}
        </div>
        {highScore > 0 && (
          <div className="text-sm text-muted-foreground">
            High Score: {highScore}
          </div>
        )}
        {!isPlaying && (
          <Button onClick={() => startGame()} variant="default" className="animate-scale-in">
            <RotateCcw className="w-4 h-4 mr-2" />
            {gameOver ? "Play Again" : "Start Game"}
          </Button>
        )}
      </div>

      <Card
        className="relative w-full max-w-[600px] h-[400px] bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 overflow-hidden cursor-none shadow-2xl"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Falling items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute text-4xl transition-all duration-100 animate-bounce"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: "translate(-50%, -50%) rotate(20deg)",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
            }}
          >
            {item.isSmile ? "😊" : "😢"}
          </div>
        ))}

        {/* Clouds decoration */}
        {isPlaying && (
          <>
            <div className="absolute top-10 left-10 text-4xl animate-pulse opacity-70">☁️</div>
            <div className="absolute top-20 right-20 text-3xl animate-pulse opacity-60" style={{ animationDelay: "1s" }}>☁️</div>
            <div className="absolute top-32 left-1/2 text-2xl animate-pulse opacity-50" style={{ animationDelay: "2s" }}>☁️</div>
          </>
        )}

        {/* Basket */}
        {isPlaying && (
          <div
            className="absolute bottom-4 w-16 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-t-full transition-all duration-100 flex items-center justify-center text-3xl shadow-2xl animate-pulse"
            style={{
              left: `${basketX}%`,
              transform: "translateX(-50%) scale(1.1)",
              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.3))",
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
              <Button onClick={() => startGame()} size="lg">
                Start Playing
              </Button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in">
            <div className="text-center space-y-4">
              <Trophy className="w-20 h-20 text-accent mx-auto animate-bounce" />
              <h3 className="text-3xl font-bold">Game Over!</h3>
              <p className="text-2xl text-primary font-bold">Final Score: {score}</p>
              <p className="text-lg text-muted-foreground">Level Reached: {level}</p>
              {score === highScore && score > 0 && (
                <p className="text-lg text-accent font-semibold animate-pulse">🏆 New High Score!</p>
              )}
              <Button onClick={() => startGame()} size="lg" className="animate-scale-in">
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
