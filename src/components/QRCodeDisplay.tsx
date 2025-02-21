
import { useState, useEffect } from "react";
import { ModernDotsQR } from "./qr-styles/ModernDotsQR";
import { GradientQR } from "./qr-styles/GradientQR";
import { RoundedQR } from "./qr-styles/RoundedQR";
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
  const [key, setKey] = useState(0);

  // Refresh QR code when value changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [value]);

  const renderQRCode = () => {
    switch (selectedStyle) {
      case "modern-default":
        return <ModernDotsQR key={key} value={value} variant="default" />;
      case "modern-purple":
        return <ModernDotsQR key={key} value={value} variant="purple" />;
      case "modern-sunset":
        return <ModernDotsQR key={key} value={value} variant="sunset" />;
      case "modern-ocean":
        return <ModernDotsQR key={key} value={value} variant="ocean" />;
      case "modern-forest":
        return <ModernDotsQR key={key} value={value} variant="forest" />;
      case "modern-crimson":
        return <ModernDotsQR key={key} value={value} variant="crimson" />;
      case "modern-midnight":
        return <ModernDotsQR key={key} value={value} variant="midnight" />;
      case "modern-cosmic":
        return <ModernDotsQR key={key} value={value} variant="cosmic" />;
      case "modern-rainbow":
        return <ModernDotsQR key={key} value={value} variant="rainbow" />;
      case "modern-emerald":
        return <ModernDotsQR key={key} value={value} variant="emerald" />;
      case "modern-golden":
        return <ModernDotsQR key={key} value={value} variant="golden" />;
      default:
        return <ModernDotsQR key={key} value={value} variant="default" />;
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
            <SelectItem value="modern-default">Classic</SelectItem>
            <SelectItem value="modern-purple">Purple</SelectItem>
            <SelectItem value="modern-sunset">Sunset</SelectItem>
            <SelectItem value="modern-ocean">Ocean</SelectItem>
            <SelectItem value="modern-forest">Forest</SelectItem>
            <SelectItem value="modern-crimson">Crimson</SelectItem>
            <SelectItem value="modern-midnight">Midnight</SelectItem>
            <SelectItem value="modern-cosmic">Cosmic</SelectItem>
            <SelectItem value="modern-rainbow">Rainbow</SelectItem>
            <SelectItem value="modern-emerald">Emerald</SelectItem>
            <SelectItem value="modern-golden">Golden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderQRCode()}
    </div>
  );
};
