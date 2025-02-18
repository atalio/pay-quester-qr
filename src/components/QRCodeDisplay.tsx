
import QRCode from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeDisplayProps {
  value: string;
  logo?: string;
}

export const QRCodeDisplay = ({ value, logo }: QRCodeDisplayProps) => {
  const qrOptions = {
    size: 256,
    level: "H" as "L" | "M" | "Q" | "H",
    includeMargin: true,
    color: "#000000",
    backgroundColor: "#ffffff",
  };

  const exportQRCode = () => {
    const svg = document.querySelector(".qr-code-container svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = qrOptions.size;
        canvas.height = qrOptions.size;
        
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "bitbob-qr-code.png";
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="qr-code-container flex justify-center">
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
              height: 48,
              width: 48,
              excavate: true,
            } : undefined}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={exportQRCode}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export PNG
        </Button>
      </div>
    </div>
  );
};
