import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PuzzleGame from "./PuzzleGame";
import MemoryGame from "./MemoryGame";
import DrawingGame from "./DrawingGame";
import CatchTheSmileGame from "./CatchTheSmileGame";

interface GameDialogProps {
  gameTitle: string;
  gameDescription: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GameDialog = ({ gameTitle, gameDescription, open, onOpenChange }: GameDialogProps) => {
  const renderGame = () => {
    switch (gameTitle) {
      case "Join the Pieces":
        return <PuzzleGame />;
      case "Memory Match":
        return <MemoryGame />;
      case "Drawing & Coloring":
        return <DrawingGame />;
      case "Catch the Smile":
        return <CatchTheSmileGame />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">This game is coming soon! 🎮</p>
            <p className="text-sm text-muted-foreground mt-2">
              Stay tuned for more therapeutic games
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{gameTitle}</DialogTitle>
          <DialogDescription>{gameDescription}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {renderGame()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameDialog;
