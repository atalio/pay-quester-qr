
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
  logo?: string;
}

export const QRCodeDisplay = ({ value, logo }: QRCodeDisplayProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>("modern");

  const renderQRCode = () => {
    switch (selectedStyle) {
      case "modern":
        return <ModernDotsQR value={value} logo={logo} />;
      case "gradient":
        return <GradientQR value={value} logo={logo} />;
      case "rounded":
        return <RoundedQR value={value} logo={logo} />;
      default:
        return <ModernDotsQR value={value} logo={logo} />;
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
            <SelectItem value="modern">Modern Dots</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderQRCode()}
    </div>
  );
};
