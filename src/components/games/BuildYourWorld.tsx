import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Download, Trash2, Undo2, Redo2, Armchair, Sofa, Lamp, Home } from "lucide-react";
import { toast } from "sonner";

interface RoomItem {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  type: string;
}

const FURNITURE_ITEMS = [
  { emoji: "🛋️", label: "Sofa", type: "furniture" },
  { emoji: "🪑", label: "Chair", type: "furniture" },
  { emoji: "🛏️", label: "Bed", type: "furniture" },
  { emoji: "🪑", label: "Stool", type: "furniture" },
  { emoji: "🪟", label: "Window", type: "furniture" },
];

const DECOR_ITEMS = [
  { emoji: "🪴", label: "Plant", type: "decor" },
  { emoji: "💡", label: "Lamp", type: "decor" },
  { emoji: "🕯️", label: "Candle", type: "decor" },
  { emoji: "🖼️", label: "Picture", type: "decor" },
  { emoji: "🪞", label: "Mirror", type: "decor" },
];

const ACCESSORIES = [
  { emoji: "📚", label: "Books", type: "accessory" },
  { emoji: "🕰️", label: "Clock", type: "accessory" },
  { emoji: "🎨", label: "Art", type: "accessory" },
  { emoji: "🧸", label: "Teddy", type: "accessory" },
  { emoji: "🎵", label: "Music", type: "accessory" },
];

const BuildYourWorld = () => {
  const [items, setItems] = useState<RoomItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<RoomItem[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [draggedItem, setDraggedItem] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addToHistory = (newItems: RoomItem[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newItems);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const addItem = (emoji: string, type: string) => {
    const newItem: RoomItem = {
      id: `${Date.now()}-${Math.random()}`,
      emoji,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20,
      scale: 1,
      type,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    addToHistory(newItems);
    toast.success(`Added ${emoji} to your world!`);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    addToHistory(newItems);
    setSelectedId(null);
    toast.success("Item removed");
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setItems(history[historyIndex - 1]);
      toast.success("Undo");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setItems(history[historyIndex + 1]);
      toast.success("Redo");
    }
  };

  const resetRoom = () => {
    setItems([]);
    addToHistory([]);
    setSelectedId(null);
    toast.success("Room reset!");
  };

  const saveWorld = () => {
    if (!canvasRef.current) return;
    
    // Use html2canvas or similar library in production
    toast.success("Your world has been saved! 📸");
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setSelectedId(id);
    setDraggedItem({
      id,
      offsetX: e.clientX - (rect.left + (item.x * rect.width) / 100),
      offsetY: e.clientY - (rect.top + (item.y * rect.height) / 100),
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left - draggedItem.offsetX) / rect.width) * 100;
    const newY = ((e.clientY - rect.top - draggedItem.offsetY) / rect.height) * 100;

    setItems((prev) =>
      prev.map((item) =>
        item.id === draggedItem.id
          ? { ...item, x: Math.max(0, Math.min(95, newX)), y: Math.max(0, Math.min(95, newY)) }
          : item
      )
    );
  };

  const handleMouseUp = () => {
    if (draggedItem) {
      addToHistory(items);
      setDraggedItem(null);
    }
  };

  const handleWheel = (id: string, e: React.WheelEvent) => {
    e.preventDefault();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, scale: Math.max(0.5, Math.min(2, item.scale + (e.deltaY > 0 ? -0.1 : 0.1))) }
          : item
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <Card className="bg-gradient-to-r from-pink-50 via-rose-50 to-blue-50">
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
              <Button variant="outline" size="sm" onClick={resetRoom} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
            <Button onClick={saveWorld} className="gap-2">
              <Download className="w-4 h-4" />
              Save My World
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-[300px_1fr] gap-4">
        {/* Toolbar */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <Tabs defaultValue="furniture" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="furniture">
                  <Sofa className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="decor">
                  <Lamp className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="accessories">
                  <Home className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="furniture" className="space-y-2 mt-4">
                {FURNITURE_ITEMS.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="w-full justify-start gap-3 hover:scale-105 transition-transform"
                    onClick={() => addItem(item.emoji, item.type)}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="decor" className="space-y-2 mt-4">
                {DECOR_ITEMS.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="w-full justify-start gap-3 hover:scale-105 transition-transform"
                    onClick={() => addItem(item.emoji, item.type)}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </Button>
                ))}
              </TabsContent>

              <TabsContent value="accessories" className="space-y-2 mt-4">
                {ACCESSORIES.map((item) => (
                  <Button
                    key={item.label}
                    variant="outline"
                    className="w-full justify-start gap-3 hover:scale-105 transition-transform"
                    onClick={() => addItem(item.emoji, item.type)}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.label}</span>
                  </Button>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Room Canvas */}
        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
          <CardContent className="p-0">
            <div
              ref={canvasRef}
              className="relative w-full aspect-[4/3] bg-gradient-to-b from-sky-100 to-amber-50 cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Floor pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)'
                }} />
              </div>

              {/* Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`absolute cursor-move transition-all ${
                    selectedId === item.id ? "ring-4 ring-primary ring-offset-2 rounded-lg" : ""
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `scale(${item.scale})`,
                  }}
                  onMouseDown={(e) => handleMouseDown(item.id, e)}
                  onWheel={(e) => handleWheel(item.id, e)}
                >
                  <div className="relative group">
                    <span className="text-5xl drop-shadow-lg select-none animate-bounce-subtle">
                      {item.emoji}
                    </span>
                    {selectedId === item.id && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center space-y-2">
                    <Home className="w-12 h-12 mx-auto opacity-50" />
                    <p className="text-lg font-medium">Your canvas awaits</p>
                    <p className="text-sm">Click items from the toolbar to build your world</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">💡 Tip: Scroll on items to resize them</span>
            <span className="font-medium">{items.length} items placed</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildYourWorld;
