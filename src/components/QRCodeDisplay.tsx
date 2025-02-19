
import { useState } from "react";
import { ModernDotsQR } from "./qr-styles/ModernDotsQR";
import { GradientQR } from "./qr-styles/GradientQR";
import { RoundedQR } from "./qr-styles/RoundedQR";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QRCodeDisplayProps {
  value: string;
}

export const QRCodeDisplay = ({ value }: QRCodeDisplayProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>("modern-default");

  const renderQRCode = () => {
    switch (selectedStyle) {
      case "modern-default":
        return <ModernDotsQR value={value} variant="default" />;
      case "modern-purple":
        return <ModernDotsQR value={value} variant="purple" />;
      case "modern-sunset":
        return <ModernDotsQR value={value} variant="sunset" />;
      case "modern-ocean":
        return <ModernDotsQR value={value} variant="ocean" />;
      case "modern-forest":
        return <ModernDotsQR value={value} variant="forest" />;
      case "modern-crimson":
        return <ModernDotsQR value={value} variant="crimson" />;
      case "gradient":
        return <GradientQR value={value} />;
      case "rounded":
        return <RoundedQR value={value} />;
      default:
        return <ModernDotsQR value={value} variant="default" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <Select
          value={selectedStyle}
          onValueChange={setSelectedStyle}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern-default">Modern Dots - Classic</SelectItem>
            <SelectItem value="modern-purple">Modern Dots - Purple</SelectItem>
            <SelectItem value="modern-sunset">Modern Dots - Sunset</SelectItem>
            <SelectItem value="modern-ocean">Modern Dots - Ocean</SelectItem>
            <SelectItem value="modern-forest">Modern Dots - Forest</SelectItem>
            <SelectItem value="modern-crimson">Modern Dots - Crimson</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderQRCode()}
    </div>
  );
};
