
import { useEffect, useRef } from "react";
import QRious from "qrious";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface GradientQRProps {
  value: string;
  logo?: string;
}

export const GradientQR = ({ value }: GradientQRProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const qr = new QRious({
        element: canvasRef.current,
        value: value,
        size: 256,
        level: 'H',
        backgroundAlpha: 1,
        foreground: '#3b82f6',
        background: '#ffffff',
        padding: 16,
      });

      // Add gradient effect
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
    }
  }, [value]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'bitbob-qr-gradient.png';
      link.href = canvasRef.current.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="rounded-xl" />
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
