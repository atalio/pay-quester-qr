
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

interface NumericKeypadProps {
  onKeyPress: (value: string) => void;
  onClose: () => void;
}

export const NumericKeypad = ({ onKeyPress, onClose }: NumericKeypadProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-lg shadow-lg relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <X className="h-4 w-4" />
      </Button>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((num) => (
        <Button
          key={num}
          variant="outline"
          onClick={() => onKeyPress(num === "←" ? "backspace" : num.toString())}
          className="p-4 text-xl"
        >
          {num}
        </Button>
      ))}
    </div>
  );
};
