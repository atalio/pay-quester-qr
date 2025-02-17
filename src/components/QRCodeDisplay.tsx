
import QRCode from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface QRCodeDisplayProps {
  value: string;
  logo?: string;
}

export const QRCodeDisplay = ({ value, logo }: QRCodeDisplayProps) => {
  const [qrOptions, setQrOptions] = useState({
    size: 200,
    level: "H" as "L" | "M" | "Q" | "H",
    includeMargin: true,
    color: "#000000",
    backgroundColor: "#ffffff",
    style: "dots" as "dots" | "squares",
  });

  const exportQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "bitbob-qr-code.png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const updateQRStyle = (style: "dots" | "squares") => {
    setQrOptions(prev => ({ ...prev, style }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQRStyle("dots")}
        >
          Dots
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQRStyle("squares")}
        >
          Squares
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={exportQRCode}
        >
          Export PNG
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="relative p-4 bg-white rounded-2xl shadow-sm">
          <QRCode
            value={value}
            size={qrOptions.size}
            level={qrOptions.level}
            includeMargin={qrOptions.includeMargin}
            fgColor={qrOptions.color}
            bgColor={qrOptions.backgroundColor}
            renderAs="svg"
            imageSettings={logo ? {
              src: logo,
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            } : undefined}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};
