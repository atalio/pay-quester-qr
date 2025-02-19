
import QRCode from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface RoundedQRProps {
  value: string;
  logo?: string;
}

export const RoundedQR = ({ value, logo }: RoundedQRProps) => {
  const handleDownload = () => {
    const svg = document.querySelector(".rounded-qr svg");
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
          link.download = "bitbob-qr-rounded.png";
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
      <div className="rounded-qr flex justify-center">
        <div className="relative p-4 bg-white rounded-2xl shadow-sm">
          <QRCode
            value={value}
            size={256}
            level="H"
            includeMargin={true}
            imageSettings={logo ? {
              src: logo,
              height: 40,
              width: 40,
              excavate: true,
            } : undefined}
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
      <style>{`
        .rounded-qr svg {
          border-radius: 1rem;
        }
        .rounded-qr svg path {
          stroke-width: 0;
        }
      `}</style>
    </div>
  );
};
