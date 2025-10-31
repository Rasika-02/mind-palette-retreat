import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Undo2, Redo2, Download, Sparkles, Play, Pause } from "lucide-react";
import { toast } from "sonner";

type StarType = "star" | "glow" | "comet" | "moon";
type BrushColor = "#00FFFF" | "#FF00FF" | "#FFD700" | "#FFFFFF";

interface Star {
  x: number;
  y: number;
  size: number;
  color: BrushColor;
  type: StarType;
  opacity: number;
}

interface ConstellationLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: BrushColor;
}

const STAR_TYPES: { type: StarType; emoji: string; label: string }[] = [
  { type: "star", emoji: "✨", label: "Star" },
  { type: "glow", emoji: "🌟", label: "Glow" },
  { type: "comet", emoji: "💫", label: "Comet" },
  { type: "moon", emoji: "🌙", label: "Moon" },
];

const COLORS: { color: BrushColor; label: string }[] = [
  { color: "#00FFFF", label: "Cyan" },
  { color: "#FF00FF", label: "Violet" },
  { color: "#FFD700", label: "Gold" },
  { color: "#FFFFFF", label: "White" },
];

const SkyPainter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [lines, setLines] = useState<ConstellationLine[]>([]);
  const [history, setHistory] = useState<{ stars: Star[]; lines: ConstellationLine[] }[]>([
    { stars: [], lines: [] },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const [selectedType, setSelectedType] = useState<StarType>("star");
  const [selectedColor, setSelectedColor] = useState<BrushColor>("#FFFFFF");
  const [brushSize, setBrushSize] = useState([20]);
  const [opacity, setOpacity] = useState([80]);
  const [constellationMode, setConstellationMode] = useState(false);
  const [lastStar, setLastStar] = useState<{ x: number; y: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = "rgb(15, 23, 42)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgb(15, 23, 42)");
      gradient.addColorStop(0.5, "rgb(30, 41, 59)");
      gradient.addColorStop(1, "rgb(51, 65, 85)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw constellation lines
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw stars
      stars.forEach((star) => {
        ctx.save();
        ctx.globalAlpha = star.opacity;

        if (star.type === "star") {
          drawStar(ctx, star.x, star.y, star.size, star.color);
        } else if (star.type === "glow") {
          drawGlowStar(ctx, star.x, star.y, star.size, star.color);
        } else if (star.type === "comet") {
          drawComet(ctx, star.x, star.y, star.size, star.color);
        } else if (star.type === "moon") {
          drawMoon(ctx, star.x, star.y, star.size, star.color);
        }

        ctx.restore();
      });
    };

    const animate = () => {
      draw();
      if (isAnimating) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [stars, lines, isAnimating]);

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? size : size / 2;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawGlowStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawComet = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    const gradient = ctx.createLinearGradient(x, y, x - size * 3, y - size * 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size * 3, y - size * 2);
    ctx.lineTo(x - size * 2, y - size);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawMoon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    const gradient = ctx.createRadialGradient(x, y, size / 2, x, y, size * 1.5);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const addToHistory = (newStars: Star[], newLines: ConstellationLine[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ stars: newStars, lines: newLines });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (constellationMode) {
      if (lastStar) {
        const newLine: ConstellationLine = {
          x1: lastStar.x,
          y1: lastStar.y,
          x2: x,
          y2: y,
          color: selectedColor,
        };
        const newLines = [...lines, newLine];
        setLines(newLines);
        addToHistory(stars, newLines);
        toast.success("Constellation line drawn!");
      }
      setLastStar({ x, y });
    } else {
      const newStar: Star = {
        x,
        y,
        size: brushSize[0],
        color: selectedColor,
        type: selectedType,
        opacity: opacity[0] / 100,
      };
      const newStars = [...stars, newStar];
      setStars(newStars);
      addToHistory(newStars, lines);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setStars(prev.stars);
      setLines(prev.lines);
      setHistoryIndex(historyIndex - 1);
      toast.success("Undo");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setStars(next.stars);
      setLines(next.lines);
      setHistoryIndex(historyIndex + 1);
      toast.success("Redo");
    }
  };

  const clearSky = () => {
    setStars([]);
    setLines([]);
    setLastStar(null);
    addToHistory([], []);
    toast.success("Sky cleared!");
  };

  const downloadSky = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-sky.png";
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Your sky has been downloaded! 🌌");
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card className="bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-sky-900/20 border-indigo-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="gap-2"
              >
                <Undo2 className="w-4 h-4" />
                Undo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="gap-2"
              >
                <Redo2 className="w-4 h-4" />
                Redo
              </Button>
              <Button variant="outline" size="sm" onClick={clearSky} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Clear Sky
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnimating(!isAnimating)}
                className="gap-2"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAnimating ? "Pause" : "Animate"}
              </Button>
              <Button onClick={downloadSky} className="gap-2">
                <Download className="w-4 h-4" />
                Download Sky
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-[280px_1fr] gap-4">
        {/* Palette Panel */}
        <Card className="h-fit bg-gradient-to-b from-indigo-950/40 to-purple-950/40 border-indigo-500/20">
          <CardContent className="p-4 space-y-6">
            {/* Star Types */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Star Type</label>
              <div className="grid grid-cols-2 gap-2">
                {STAR_TYPES.map((star) => (
                  <Button
                    key={star.type}
                    variant={selectedType === star.type ? "default" : "outline"}
                    className="gap-2 justify-start"
                    onClick={() => {
                      setSelectedType(star.type);
                      setConstellationMode(false);
                      setLastStar(null);
                    }}
                  >
                    <span className="text-xl">{star.emoji}</span>
                    <span className="text-xs">{star.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Color</label>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.color}
                    className={`h-10 rounded-lg border-2 transition-all ${
                      selectedColor === c.color ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c.color }}
                    onClick={() => setSelectedColor(c.color)}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Size: {brushSize[0]}px</label>
              <Slider
                value={brushSize}
                onValueChange={setBrushSize}
                min={5}
                max={50}
                step={5}
                className="w-full"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Opacity: {opacity[0]}%</label>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                min={10}
                max={100}
                step={10}
                className="w-full"
              />
            </div>

            {/* Constellation Mode */}
            <Button
              variant={constellationMode ? "default" : "outline"}
              className="w-full gap-2"
              onClick={() => {
                setConstellationMode(!constellationMode);
                setLastStar(null);
                toast.info(
                  constellationMode ? "Constellation mode off" : "Click stars to connect them!"
                );
              }}
            >
              <Sparkles className="w-4 h-4" />
              {constellationMode ? "Drawing Lines" : "Constellation Mode"}
            </Button>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card className="overflow-hidden bg-gradient-to-br from-indigo-900 via-sky-900 to-purple-900">
          <CardContent className="p-0">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full cursor-crosshair"
              onClick={handleCanvasClick}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-sky-900/20 to-indigo-900/20 border-sky-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>💫 Tip: Use constellation mode to connect your stars</span>
            <span className="font-medium">
              {stars.length} stars • {lines.length} lines
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkyPainter;
