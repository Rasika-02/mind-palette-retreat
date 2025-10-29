import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Eraser, Trash2, Download } from "lucide-react";

const DrawingGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#8B5CF6");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");

  const colors = [
    "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", 
    "#3B82F6", "#EF4444", "#6366F1", "#14B8A6"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill with white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== "mousedown" && e.type !== "touchstart") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e 
      ? e.touches[0].clientX - rect.left 
      : e.clientX - rect.left;
    const y = "touches" in e 
      ? e.touches[0].clientY - rect.top 
      : e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = tool === "eraser" ? "white" : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "mindcanvas-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setTool("brush");
              }}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                color === c && tool === "brush" ? "ring-2 ring-offset-2 ring-primary scale-110" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant={tool === "eraser" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("eraser")}
          >
            <Eraser className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadDrawing}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <span className="text-sm text-muted-foreground">Brush Size:</span>
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-sm font-semibold">{brushSize}px</span>
      </div>

      <Card className="overflow-hidden shadow-xl">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[400px] md:h-[500px] touch-none cursor-crosshair bg-white"
        />
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        <Palette className="w-4 h-4 inline mr-1" />
        Express yourself through art and colors
      </p>
    </div>
  );
};

export default DrawingGame;
