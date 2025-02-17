
import { Button } from "@/components/ui/button";

interface NumericKeypadProps {
  onKeyPress: (value: string) => void;
}

export const NumericKeypad = ({ onKeyPress }: NumericKeypadProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-lg shadow-lg">
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
