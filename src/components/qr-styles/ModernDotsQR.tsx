
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ModernDotsQRProps {
  value: string;
  variant?: "default" | "purple" | "sunset" | "ocean" | "forest" | "crimson";
}

export const ModernDotsQR = ({ value, variant = "default" }: ModernDotsQRProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const getStyleConfig = (variant: string) => {
    switch (variant) {
      case "purple":
        return {
          dotsOptions: {
            type: "dots",
            color: "#9b87f5",
            gradient: {
              type: "linear",
              rotation: 45,
              colorStops: [
                { offset: 0, color: "#9b87f5" },
                { offset: 1, color: "#7E69AB" }
              ]
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#6E59A5"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#6E59A5"
          }
        };
      case "sunset":
        return {
          dotsOptions: {
            type: "dots",
            gradient: {
              type: "linear",
              rotation: 90,
              colorStops: [
                { offset: 0, color: "#F97316" },
                { offset: 1, color: "#D946EF" }
              ]
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#D946EF"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#F97316"
          }
        };
      case "ocean":
        return {
          dotsOptions: {
            type: "dots",
            gradient: {
              type: "linear",
              rotation: 60,
              colorStops: [
                { offset: 0, color: "#0EA5E9" },
                { offset: 1, color: "#33C3F0" }
              ]
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#0EA5E9"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#33C3F0"
          }
        };
      case "forest":
        return {
          dotsOptions: {
            type: "dots",
            gradient: {
              type: "linear",
              rotation: 30,
              colorStops: [
                { offset: 0, color: "#059669" },
                { offset: 1, color: "#10B981" }
              ]
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#059669"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#10B981"
          }
        };
      case "crimson":
        return {
          dotsOptions: {
            type: "dots",
            gradient: {
              type: "linear",
              rotation: 120,
              colorStops: [
                { offset: 0, color: "#ea384c" },
                { offset: 1, color: "#dc2626" }
              ]
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#dc2626"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#ea384c"
          }
        };
      default:
        return {
          dotsOptions: {
            type: "dots",
            gradient: {
              type: "linear",
              rotation: 45,
              colorStops: [
                { offset: 0, color: "#3b82f6" },
                { offset: 1, color: "#1d4ed8" }
              ]
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#1d4ed8"
          },
          cornersDotOptions: {
            type: "dot",
            color: "#1d4ed8"
          }
        };
    }
  };

  const styleConfig = getStyleConfig(variant);
  
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
    dotsOptions: styleConfig.dotsOptions,
    backgroundOptions: {
      color: "#ffffff",
    },
    cornersSquareOptions: styleConfig.cornersSquareOptions,
    cornersDotOptions: styleConfig.cornersDotOptions,
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, [variant]);

  useEffect(() => {
    qrCode.update({
      data: value
    });
  }, [value]);

  const handleDownload = () => {
    qrCode.download({
      extension: "png",
      name: `bitbob-qr-${variant}`
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
