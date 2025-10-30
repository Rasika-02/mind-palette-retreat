import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Leaf, Plus, Moon, Star, Circle, RotateCcw, Palette } from "lucide-react";

const ZenGarden = () => {
  const [stars, setStars] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [stones, setStones] = useState([]);
  const [gratitude, setGratitude] = useState("");
  const [mode, setMode] = useState("sand");
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const constellations = {
    hope: { points: 5, pattern: "Hope", emoji: "⭐", color: "#fbbf24" },
    peace: { points: 7, pattern: "Peace", emoji: "🕊️", color: "#60a5fa" },
    growth: { points: 10, pattern: "Growth", emoji: "🌱", color: "#34d399" },
    joy: { points: 15, pattern: "Joy", emoji: "✨", color: "#f472b6" }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    drawDesertScene(ctx, canvas.width, canvas.height);
  }, []);

  const drawDesertScene = (ctx, width, height) => {
    // Sky gradient - beautiful sunset/dusk colors matching home theme
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGradient.addColorStop(0, "#1a1a2e");
    skyGradient.addColorStop(0.3, "#2d1b4e");
    skyGradient.addColorStop(0.6, "#5a3d6e");
    skyGradient.addColorStop(1, "#8b6f9e");
    
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.6);

    // Stars in the sky
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * (height * 0.5);
      const size = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Moon
    const moonGradient = ctx.createRadialGradient(width * 0.85, height * 0.15, 5, width * 0.85, height * 0.15, 40);
    moonGradient.addColorStop(0, "#fffef7");
    moonGradient.addColorStop(0.7, "#f4e5c9");
    moonGradient.addColorStop(1, "rgba(244, 229, 201, 0)");
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 40, 0, Math.PI * 2);
    ctx.fill();

    // Horizon glow
    const horizonGradient = ctx.createLinearGradient(0, height * 0.5, 0, height * 0.7);
    horizonGradient.addColorStop(0, "rgba(255, 179, 120, 0.3)");
    horizonGradient.addColorStop(1, "rgba(255, 179, 120, 0)");
    ctx.fillStyle = horizonGradient;
    ctx.fillRect(0, height * 0.5, width, height * 0.2);

    // Desert sand - realistic texture with dunes
    const sandGradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
    sandGradient.addColorStop(0, "#f5deb3");
    sandGradient.addColorStop(0.3, "#f4e4c1");
    sandGradient.addColorStop(0.6, "#e8d4a8");
    sandGradient.addColorStop(1, "#d9c89e");
    
    ctx.fillStyle = sandGradient;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);

    // Sand texture
    ctx.fillStyle = "rgba(210, 180, 140, 0.1)";
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * width;
      const y = height * 0.6 + Math.random() * (height * 0.4);
      const size = Math.random() * 1.5;
      ctx.fillRect(x, y, size, size);
    }

    // Sand dunes - create depth
    ctx.fillStyle = "rgba(218, 185, 135, 0.3)";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const startY = height * 0.65 + i * 50;
      ctx.moveTo(0, startY);
      for (let x = 0; x < width; x += 20) {
        const wave = Math.sin((x + i * 200) * 0.01) * 20;
        ctx.lineTo(x, startY + wave);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    }

    // Subtle ripples in sand
    ctx.strokeStyle = "rgba(205, 170, 125, 0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      const y = height * 0.7 + i * 20;
      for (let x = 0; x < width; x += 15) {
        const wave = Math.sin((x + i * 30) * 0.02) * 2;
        if (x === 0) {
          ctx.moveTo(x, y + wave);
        } else {
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();
    }
  };

  const startDrawing = (e) => {
    if (mode !== "sand") return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || mode !== "sand") return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    const ctx = ctxRef.current;
    
    // Deep groove - darkest shadow
    ctx.strokeStyle = "rgba(101, 67, 33, 0.8)";
    ctx.lineWidth = 20;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Inner shadow
    ctx.strokeStyle = "rgba(139, 90, 43, 0.6)";
    ctx.lineWidth = 16;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Mid-tone displaced sand
    ctx.strokeStyle = "rgba(160, 120, 70, 0.5)";
    ctx.lineWidth = 12;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Edges - pushed up sand
    ctx.strokeStyle = "rgba(200, 165, 120, 0.4)";
    ctx.lineWidth = 24;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Light rim - sand catching light
    ctx.strokeStyle = "rgba(245, 220, 180, 0.3)";
    ctx.lineWidth = 28;
    ctx.lineTo(x, y);
    ctx.stroke();

    // Displaced sand particles around the groove
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 10 + Math.random() * 15;
      const offsetX = x + Math.cos(angle) * distance;
      const offsetY = y + Math.sin(angle) * distance;
      const size = Math.random() * 2 + 1;
      
      ctx.fillStyle = `rgba(${180 + Math.random() * 40}, ${140 + Math.random() * 40}, ${90 + Math.random() * 30}, ${0.2 + Math.random() * 0.3})`;
      ctx.fillRect(offsetX, offsetY, size, size);
    }
    
    // Add texture variation in the groove
    for (let i = 0; i < 3; i++) {
      const offsetX = x + (Math.random() - 0.5) * 8;
      const offsetY = y + (Math.random() - 0.5) * 8;
      ctx.fillStyle = "rgba(80, 50, 20, 0.3)";
      ctx.fillRect(offsetX, offsetY, 1, 1);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (mode === "star") {
      addStar(x, y);
    } else if (mode === "stone") {
      addStone(x, y);
    }
  };

  const addStar = (x = null, y = null) => {
    const emotions = ["hope", "peace", "joy", "calm", "love"];
    const colors = ["#fbbf24", "#60a5fa", "#f472b6", "#34d399", "#a78bfa"];
    
    const newStar = {
      x: x || Math.random() * 90 + 5,
      y: y || Math.random() * 50,
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 0.5 + 0.8,
    };
    setStars([...stars, newStar]);
  };

  const addStone = (x = null, y = null) => {
    const sizes = ["small", "medium", "large"];
    const newStone = {
      x: x || Math.random() * 80 + 10,
      y: y || (Math.random() * 30 + 65),
      size: sizes[Math.floor(Math.random() * sizes.length)],
    };
    setStones([...stones, newStone]);
  };

  const addLeaf = () => {
    if (gratitude.trim()) {
      setLeaves([...leaves, gratitude]);
      setGratitude("");
    }
  };

  const resetSandGarden = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    drawDesertScene(ctx, canvas.width, canvas.height);
  };

  const clearAll = () => {
    setStars([]);
    setLeaves([]);
    setStones([]);
    resetSandGarden();
  };

  const getConstellation = () => {
    const count = stars.length;
    if (count >= 15) return constellations.joy;
    if (count >= 10) return constellations.growth;
    if (count >= 7) return constellations.peace;
    if (count >= 5) return constellations.hope;
    return null;
  };

  const constellation = getConstellation();

  const getTreeGrowth = () => {
    const count = leaves.length;
    return {
      stage: count >= 20 ? "Ancient" : count >= 15 ? "Flourishing" : count >= 10 ? "Blooming" : count >= 5 ? "Growing" : "Sprouting",
      height: Math.min(count * 10 + 60, 280),
      branches: Math.min(Math.floor(count / 2), 12),
      leafCount: count
    };
  };

  const treeGrowth = getTreeGrowth();

  const renderTree = () => {
    if (leaves.length === 0) return null;

    const { height, branches, leafCount } = treeGrowth;
    const trunkWidth = 25 + leafCount * 1.5;
    const trunkHeight = height * 0.55;

    return (
      <svg
        width="320"
        height={height + 40}
        viewBox={`0 0 320 ${height + 40}`}
        className="absolute bottom-0 left-12"
        style={{ filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.4))" }}
      >
        <defs>
          {/* Realistic bark texture */}
          <pattern id="barkTexture" x="0" y="0" width="20" height="30" patternUnits="userSpaceOnUse">
            <rect width="20" height="30" fill="#3e2723"/>
            <path d="M 0,5 Q 5,3 10,5 T 20,5" stroke="#2c1810" strokeWidth="1.5" fill="none"/>
            <path d="M 0,12 Q 7,10 14,12 T 20,12" stroke="#2c1810" strokeWidth="1" fill="none"/>
            <path d="M 0,20 Q 6,18 12,20 T 20,20" stroke="#2c1810" strokeWidth="1.2" fill="none"/>
            <path d="M 0,28 Q 8,26 16,28 T 20,28" stroke="#2c1810" strokeWidth="1" fill="none"/>
            <circle cx="5" cy="8" r="0.8" fill="#2c1810"/>
            <circle cx="14" cy="16" r="0.6" fill="#2c1810"/>
            <circle cx="8" cy="24" r="0.7" fill="#2c1810"/>
          </pattern>
          
          {/* Trunk gradient */}
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3e2723" />
            <stop offset="30%" stopColor="#4e342e" />
            <stop offset="60%" stopColor="#5d4037" />
            <stop offset="100%" stopColor="#3e2723" />
          </linearGradient>

          {/* Shadow gradient */}
          <radialGradient id="groundShadow">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse
          cx="80"
          cy={height + 35}
          rx="70"
          ry="12"
          fill="url(#groundShadow)"
        />

        {/* Root system emerging from ground */}
        {leafCount >= 5 && (
          <g opacity="0.7">
            <path
              d={`M 80,${height + 30} Q 60,${height + 25} 50,${height + 20} Q 45,${height + 18} 40,${height + 20}`}
              stroke="#4e342e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 80,${height + 30} Q 100,${height + 25} 110,${height + 20} Q 115,${height + 18} 120,${height + 20}`}
              stroke="#4e342e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M 75,${height + 32} Q 70,${height + 28} 65,${height + 27}`}
              stroke="#3e2723"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Main trunk with realistic texture */}
        <path
          d={`M ${80 - trunkWidth/2},${height + 30} 
              Q ${80 - trunkWidth/2.5},${height + 10} ${80 - trunkWidth/3},${height - trunkHeight/2}
              Q ${80 - trunkWidth/4},${height - trunkHeight} ${80},${height - trunkHeight - 20}
              Q ${80 + trunkWidth/4},${height - trunkHeight} ${80 + trunkWidth/3},${height - trunkHeight/2}
              Q ${80 + trunkWidth/2.5},${height + 10} ${80 + trunkWidth/2},${height + 30} Z`}
          fill="url(#trunkGradient)"
        />
        
        {/* Bark texture overlay */}
        <path
          d={`M ${80 - trunkWidth/2},${height + 30} 
              Q ${80 - trunkWidth/2.5},${height + 10} ${80 - trunkWidth/3},${height - trunkHeight/2}
              Q ${80 - trunkWidth/4},${height - trunkHeight} ${80},${height - trunkHeight - 20}
              Q ${80 + trunkWidth/4},${height - trunkHeight} ${80 + trunkWidth/3},${height - trunkHeight/2}
              Q ${80 + trunkWidth/2.5},${height + 10} ${80 + trunkWidth/2},${height + 30} Z`}
          fill="url(#barkTexture)"
          opacity="0.6"
        />

        {/* Trunk highlights and shadows for depth */}
        <path
          d={`M ${80 - trunkWidth/2.8},${height + 25} Q ${80 - trunkWidth/3.5},${height - trunkHeight/2} ${80 - trunkWidth/5},${height - trunkHeight - 15}`}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M ${80 + trunkWidth/2.8},${height + 25} Q ${80 + trunkWidth/3.5},${height - trunkHeight/2} ${80 + trunkWidth/5},${height - trunkHeight - 15}`}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Main branches - realistic curves */}
        {Array.from({ length: Math.min(branches, 10) }).map((_, i) => {
          const branchStart = height - trunkHeight + (trunkHeight / (branches + 2)) * (i + 1);
          const isLeft = i % 2 === 0;
          const branchLength = 35 + i * 6;
          const thickness = Math.max(8 - i * 0.5, 3);
          const curve1X = isLeft ? 80 - 15 - i * 3 : 80 + 15 + i * 3;
          const curve1Y = branchStart - 15;
          const endX = isLeft ? 80 - branchLength : 80 + branchLength;
          const endY = branchStart - 30 - i * 2;
          
          return (
            <g key={`branch-${i}`}>
              {/* Branch shadow */}
              <path
                d={`M 80,${branchStart} Q ${curve1X + 2},${curve1Y + 2} ${endX + 2},${endY + 2}`}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth={thickness}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Main branch */}
              <path
                d={`M 80,${branchStart} Q ${curve1X},${curve1Y} ${endX},${endY}`}
                stroke="#4e342e"
                strokeWidth={thickness}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Branch highlight */}
              <path
                d={`M 80,${branchStart} Q ${curve1X},${curve1Y} ${endX},${endY}`}
                stroke="rgba(92, 64, 51, 0.8)"
                strokeWidth={thickness * 0.6}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Secondary smaller branches */}
              {leafCount >= 8 && i % 2 === 0 && (
                <path
                  d={`M ${endX},${endY} Q ${endX + (isLeft ? -8 : 8)},${endY - 8} ${endX + (isLeft ? -15 : 15)},${endY - 15}`}
                  stroke="#5d4037"
                  strokeWidth={thickness * 0.5}
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}

        {/* Foliage clusters - realistic grouping */}
        {Array.from({ length: Math.min(Math.floor(leafCount / 2) + 3, 12) }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const radiusVariation = 0.7 + Math.random() * 0.4;
          const radius = 45 + leafCount * 2;
          const clusterX = 80 + Math.cos(angle) * radius * radiusVariation;
          const clusterY = height - trunkHeight - 40 + Math.sin(angle) * radius * radiusVariation * 0.8;
          const clusterSize = 25 + Math.random() * 15;
          
          // Determine color based on position (depth)
          const depthColors = ['#2d5016', '#3d6b1f', '#4d7c2f', '#6b9b37', '#7cb342'];
          const colorIndex = Math.floor((angle + Math.PI/2) / (Math.PI * 2) * depthColors.length);
          
          return (
            <g key={`foliage-${i}`}>
              {/* Shadow */}
              <circle
                cx={clusterX + 2}
                cy={clusterY + 3}
                r={clusterSize}
                fill="rgba(0,0,0,0.15)"
              />
              {/* Main cluster */}
              <circle
                cx={clusterX}
                cy={clusterY}
                r={clusterSize}
                fill={depthColors[colorIndex % depthColors.length]}
                opacity="0.85"
              />
              {/* Highlight */}
              <circle
                cx={clusterX - clusterSize * 0.3}
                cy={clusterY - clusterSize * 0.3}
                r={clusterSize * 0.4}
                fill="rgba(255,255,255,0.15)"
              />
            </g>
          );
        })}

        {/* Individual leaf details */}
        {Array.from({ length: Math.min(leafCount * 3, 60) }).map((_, i) => {
          const angle = (i / (leafCount * 3)) * Math.PI * 2;
          const radius = 40 + leafCount * 2 + Math.random() * 25;
          const leafX = 80 + Math.cos(angle) * radius;
          const leafY = height - trunkHeight - 40 + Math.sin(angle) * radius * 0.75;
          const rotation = angle * 180 / Math.PI + Math.random() * 60 - 30;
          const leafColors = ['#558b2f', '#689f38', '#7cb342', '#8bc34a', '#9ccc65'];
          const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];
          
          return (
            <g key={`leaf-${i}`} transform={`translate(${leafX}, ${leafY}) rotate(${rotation})`}>
              <ellipse
                cx="0" cy="0"
                rx="5" ry="8"
                fill={leafColor}
                opacity="0.9"
              />
              <line
                x1="0" y1="-8"
                x2="0" y2="8"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="0.5"
              />
            </g>
          );
        })}

        {/* Flowers for mature trees */}
        {leafCount >= 10 && Array.from({ length: Math.min(Math.floor(leafCount / 2), 20) }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2 + Math.PI / 8;
          const radius = 45 + leafCount * 2;
          const flowerX = 80 + Math.cos(angle) * radius;
          const flowerY = height - trunkHeight - 40 + Math.sin(angle) * radius * 0.75;
          const flowerColors = ['#e91e63', '#ff9800', '#ffeb3b', '#ff5722', '#f06292'];
          const flowerColor = flowerColors[i % flowerColors.length];
          
          return (
            <g key={`flower-${i}`}>
              {/* Petals */}
              {[0, 60, 120, 180, 240, 300].map((petal, p) => (
                <ellipse
                  key={p}
                  cx={flowerX}
                  cy={flowerY}
                  rx="4"
                  ry="7"
                  fill={flowerColor}
                  opacity="0.9"
                  transform={`rotate(${petal}, ${flowerX}, ${flowerY})`}
                />
              ))}
              {/* Center */}
              <circle
                cx={flowerX}
                cy={flowerY}
                r="3"
                fill="#ffd54f"
              />
              <circle
                cx={flowerX}
                cy={flowerY}
                r="1.5"
                fill="#ff8f00"
              />
            </g>
          );
        })}

        {/* Ground grass/vegetation */}
        {Array.from({ length: 30 }).map((_, i) => {
          const grassX = 20 + i * 8;
          const grassHeight = 8 + Math.random() * 12;
          const sway = Math.sin(i * 0.8) * 3;
          const grassColor = i % 3 === 0 ? '#7cb342' : i % 3 === 1 ? '#689f38' : '#558b2f';
          
          return (
            <path
              key={`grass-${i}`}
              d={`M ${grassX},${height + 30} Q ${grassX + sway},${height + 30 - grassHeight / 2} ${grassX + sway * 1.5},${height + 30 - grassHeight}`}
              stroke={grassColor}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Decorative Background Blobs - matching home page */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blob opacity-60" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-secondary/20 rounded-full blob opacity-50" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-accent/15 rounded-full blob opacity-40" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-primary/15 rounded-full blob opacity-50" style={{ animationDelay: "6s" }} />
      </div>

      {/* Background Pattern - matching home page */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - matching home page style */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20 mb-4">
              <Moon className="w-4 h-4 animate-twinkle" />
              <span className="text-sm font-semibold">Your Personal Sanctuary</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Zen Garden
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Create your magical desert sanctuary under the stars. Draw peaceful patterns in the sand, 
              plant a gratitude tree, place meditation stones, and watch constellations form above.
            </p>
          </div>

          {/* Interactive Canvas */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Card className="overflow-hidden border-2 border-primary/20 bg-card/80 backdrop-blur-sm shadow-float hover:shadow-glow transition-all">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[500px] md:h-[600px] cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onClick={handleCanvasClick}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
                  }}
                  onTouchMove={(e) => {
                    e.preventDefault();
                    const touch = e.touches[0];
                    draw({ clientX: touch.clientX, clientY: touch.clientY });
                  }}
                  onTouchEnd={stopDrawing}
                />

                {/* Stars with realistic glow */}
                {stars.map((star, index) => (
                  <div
                    key={`star-${index}`}
                    className="absolute pointer-events-none animate-twinkle"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`,
                      color: star.color,
                      filter: `drop-shadow(0 0 12px ${star.color}) drop-shadow(0 0 20px ${star.color})`,
                      animationDelay: `${index * 0.15}s`,
                      transform: `scale(${star.size})`
                    }}
                  >
                    <Sparkles className="w-6 h-6" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-card/95 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/20 font-medium shadow-soft">
                      {star.emotion}
                    </span>
                  </div>
                ))}

                {/* Realistic Stones */}
                {stones.map((stone, index) => {
                  const stoneSize = stone.size === "small" ? { w: 40, h: 28 } : stone.size === "medium" ? { w: 56, h: 40 } : { w: 72, h: 52 };
                  return (
                    <div
                      key={`stone-${index}`}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${stone.x}%`,
                        top: `${stone.y}%`,
                        transform: "translateX(-50%)"
                      }}
                    >
                      <svg width={stoneSize.w} height={stoneSize.h} viewBox={`0 0 ${stoneSize.w} ${stoneSize.h}`}>
                        <defs>
                          <radialGradient id={`stoneGrad-${index}`}>
                            <stop offset="0%" stopColor="#8d8d8d" />
                            <stop offset="50%" stopColor="#6b6b6b" />
                            <stop offset="100%" stopColor="#4a4a4a" />
                          </radialGradient>
                          <filter id={`stoneShadow-${index}`}>
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                            <feOffset dx="0" dy="4" result="offsetblur"/>
                            <feFlood floodColor="#000000" floodOpacity="0.3"/>
                            <feComposite in2="offsetblur" operator="in"/>
                            <feMerge>
                              <feMergeNode/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <ellipse
                          cx={stoneSize.w / 2}
                          cy={stoneSize.h / 2}
                          rx={stoneSize.w / 2.2}
                          ry={stoneSize.h / 2.2}
                          fill={`url(#stoneGrad-${index})`}
                          filter={`url(#stoneShadow-${index})`}
                        />
                        {/* Stone texture */}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <ellipse
                            key={i}
                            cx={stoneSize.w / 2 + (Math.random() - 0.5) * stoneSize.w * 0.4}
                            cy={stoneSize.h / 2 + (Math.random() - 0.5) * stoneSize.h * 0.4}
                            rx={Math.random() * 3 + 1}
                            ry={Math.random() * 2 + 1}
                            fill="rgba(0,0,0,0.2)"
                          />
                        ))}
                        {/* Highlight */}
                        <ellipse
                          cx={stoneSize.w / 2.5}
                          cy={stoneSize.h / 3}
                          rx={stoneSize.w / 6}
                          ry={stoneSize.h / 8}
                          fill="rgba(255,255,255,0.15)"
                        />
                      </svg>
                    </div>
                  );
                })}

                {/* Gratitude Tree */}
                {renderTree()}

                {/* Constellation Achievement */}
                {constellation && (
                  <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-full border-2 border-primary/30 shadow-float animate-slide-up">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" style={{ color: constellation.color }} />
                      <span className="font-semibold">{constellation.emoji} {constellation.pattern}</span>
                    </div>
                  </div>
                )}

                {/* Tree Growth Status */}
                {leaves.length > 0 && (
                  <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm px-4 py-3 rounded-full border-2 border-success/30 shadow-float animate-slide-up">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-success" />
                      <span className="font-semibold">{treeGrowth.stage} Tree</span>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                  <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm border-2 border-primary/20 shadow-soft">
                    <Star className="w-4 h-4 inline mr-1 text-primary" />
                    <span className="font-semibold">{stars.length}</span> <span className="text-muted-foreground">stars</span>
                  </div>
                  <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm border-2 border-accent/20 shadow-soft">
                    <Circle className="w-4 h-4 inline mr-1 text-accent" />
                    <span className="font-semibold">{stones.length}</span> <span className="text-muted-foreground">stones</span>
                  </div>
                  <div className="bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm border-2 border-success/20 shadow-soft">
                    <Leaf className="w-4 h-4 inline mr-1 text-success" />
                    <span className="font-semibold">{leaves.length}</span> <span className="text-muted-foreground">leaves</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Mode Selection */}
            <Card className="border-2 border-primary/20 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-float transition-all animate-slide-up" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Palette className="w-5 h-5" />
                  Drawing Mode
                </CardTitle>
                <CardDescription>Choose how to create in your sanctuary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setMode("sand")}
                  variant={mode === "sand" ? "default" : "outline"}
                  className="w-full"
                >
                  🏖️ Draw in Sand
                </Button>
                <Button
                  onClick={() => setMode("star")}
                  variant={mode === "star" ? "default" : "outline"}
                  className="w-full"
                >
                  ⭐ Place Stars
                </Button>
                <Button
                  onClick={() => setMode("stone")}
                  variant={mode === "stone" ? "default" : "outline"}
                  className="w-full"
                >
                  🪨 Place Stones
                </Button>
              </CardContent>
            </Card>

            {/* Gratitude Input */}
            <Card className="border-2 border-success/20 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-float transition-all animate-slide-up" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Leaf className="w-5 h-5" />
                  Gratitude Leaf
                </CardTitle>
                <CardDescription>Add thankfulness to grow your tree</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                    placeholder="I'm grateful for..."
                    onKeyPress={(e) => e.key === "Enter" && addLeaf()}
                    className="border-success/30 bg-background"
                  />
                  <Button onClick={addLeaf} size="icon" className="bg-success hover:bg-success/90 shadow-soft">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-center font-medium">
                    🌳 Your tree is <span className="font-bold text-success">{treeGrowth.stage}</span>
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-1">
                    {leaves.length < 5 ? "Keep adding gratitude to help it grow!" : 
                     leaves.length < 10 ? "Your tree is growing beautifully!" :
                     leaves.length < 15 ? "What a magnificent tree!" :
                     "Your tree has reached wisdom!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reset Controls */}
            <Card className="border-2 border-accent/20 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-float transition-all animate-slide-up" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Reset Options
                </CardTitle>
                <CardDescription>Clear parts or reset everything</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={resetSandGarden} variant="outline" className="w-full border-primary/30 hover:border-primary">
                  Clear Sand Drawings
                </Button>
                <Button onClick={() => setStars([])} variant="outline" className="w-full border-primary/30 hover:border-primary">
                  Clear All Stars
                </Button>
                <Button onClick={() => setStones([])} variant="outline" className="w-full border-primary/30 hover:border-primary">
                  Clear All Stones
                </Button>
                <Button onClick={clearAll} variant="destructive" className="w-full shadow-soft">
                  Reset Everything
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Constellation Progress */}
          <Card className="border-2 border-primary/20 bg-card/80 backdrop-blur-sm shadow-soft hover:shadow-float transition-all mb-8 animate-slide-up" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Emotional Constellation Map
              </CardTitle>
              <CardDescription>
                Each star represents an emotion. Create constellations by adding more stars to the night sky.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(constellations).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      stars.length >= value.points
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-muted bg-muted/30"
                    }`}
                  >
                    <div className="text-3xl mb-3">{value.emoji}</div>
                    <div className="text-lg font-bold mb-1">{value.pattern}</div>
                    <div className="text-sm text-muted-foreground">
                      {stars.length >= value.points ? (
                        <span className="text-success font-semibold">✓ Unlocked!</span>
                      ) : (
                        <span>{value.points - stars.length} more star{value.points - stars.length !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 shadow-float animate-slide-up" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Moon className="w-6 h-6 text-primary" />
                Welcome to Your Desert Sanctuary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/80 text-base leading-relaxed">
                This is your personal oasis—a magical desert under a starlit sky where you can find peace and express gratitude. 
                Draw meditative patterns in the sand with your finger or mouse, place glowing stars to represent your emotions, 
                position meditation stones for balance, and watch your gratitude tree grow from a small sprout into an ancient, 
                flourishing tree filled with flowers.
              </p>
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-card/50 rounded-xl border border-primary/10">
                  <div className="text-2xl mb-2">🏜️</div>
                  <div className="font-semibold mb-1">Sand Drawing</div>
                  <div className="text-sm text-muted-foreground">Create calming patterns that feel like real sand</div>
                </div>
                <div className="p-4 bg-card/50 rounded-xl border border-primary/10">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold mb-1">Star Emotions</div>
                  <div className="text-sm text-muted-foreground">Each star captures a moment of feeling</div>
                </div>
                <div className="p-4 bg-card/50 rounded-xl border border-primary/10">
                  <div className="text-2xl mb-2">🌳</div>
                  <div className="font-semibold mb-1">Gratitude Tree</div>
                  <div className="text-sm text-muted-foreground">Watch it bloom as you express thanks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .blob {
          animation: blob 7s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ZenGarden;
