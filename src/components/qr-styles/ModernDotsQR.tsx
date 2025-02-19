
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ModernDotsQRProps {
  value: string;
  logo?: string;
}

export const ModernDotsQR = ({ value, logo }: ModernDotsQRProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const qrCode = new QRCodeStyling({
    width: 256,
    height: 256,
    data: value,
    margin: 16,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "H"
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0
    },
    dotsOptions: {
      type: "dots",
      color: "#000000",
      gradient: {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: "#3b82f6" },
          { offset: 1, color: "#1d4ed8" }
        ]
      }
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#1d4ed8"
    },
    cornersDotOptions: {
      type: "dot",
      color: "#1d4ed8"
    },
    image: logo
  });

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  useEffect(() => {
    qrCode.update({
      data: value
    });
  }, [value]);

  const handleDownload = () => {
    qrCode.download({
      extension: "png",
      name: "bitbob-qr-modern"
    });
  };

  return (
    <div className="space-y-4">
      <div ref={ref} className="flex justify-center" />
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Export PNG
        </Button>
      </div>
    </div>
  );
};
