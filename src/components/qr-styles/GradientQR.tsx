
import { useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface GradientQRProps {
  value: string;
}

export const GradientQR = ({ value }: GradientQRProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 256;
        canvas.height = 256;
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "bitbob-qr-gradient.png";
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
      <div ref={qrRef} className="flex justify-center">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700">
          <QRCode
            value={value}
            size={256}
            level="H"
            fgColor="#ffffff"
            bgColor="transparent"
            renderAs="svg"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Export PNG
        </Button>
      </div>
    </div>
  );
};
