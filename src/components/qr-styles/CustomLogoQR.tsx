
import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CustomLogoQRProps {
  value: string;
}

const MAX_LOGO_SIZE = {
  width: 64,
  height: 64,
};

export const CustomLogoQR = ({ value }: CustomLogoQRProps) => {
  const [customLogo, setCustomLogo] = useState<string>("/lovable-uploads/7450c25d-f739-43d4-a8fc-a3ddf2cea909.png");
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const validateAndResizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = MAX_LOGO_SIZE.width;
        canvas.height = MAX_LOGO_SIZE.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Draw image maintaining aspect ratio
        const scale = Math.min(
          MAX_LOGO_SIZE.width / img.width,
          MAX_LOGO_SIZE.height / img.height
        );
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        
        // Center the image
        const x = (MAX_LOGO_SIZE.width - newWidth) / 2;
        const y = (MAX_LOGO_SIZE.height - newHeight) / 2;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, newWidth, newHeight);
        
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => {
        reject(new Error('Error loading image'));
      };
      
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const resizedLogo = await validateAndResizeImage(file);
      setCustomLogo(resizedLogo);
      console.debug("[UI] Custom logo uploaded and resized");
      toast({
        title: "Logo uploaded successfully",
        description: `Logo resized to ${MAX_LOGO_SIZE.width}x${MAX_LOGO_SIZE.height} pixels`,
      });
    } catch (error) {
      console.error("[UI] Error processing logo:", error);
      toast({
        title: "Error uploading logo",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector(".custom-logo-qr canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "bitbob-qr-custom.png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.debug("[UI] QR code downloaded");
    }
  };

  return (
    <div className="space-y-4">
      <div className="custom-logo-qr flex justify-center">
        <QRCode
          value={value}
          size={256}
          quietZone={16}
          qrStyle="dots"
          eyeRadius={8}
          logoImage={customLogo}
          logoWidth={MAX_LOGO_SIZE.width}
          logoHeight={MAX_LOGO_SIZE.height}
          logoOpacity={1}
          bgColor="#ffffff"
          fgColor="#403E43"
          removeQrCodeBehindLogo={true}
        />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Logo Image ({MAX_LOGO_SIZE.width}x{MAX_LOGO_SIZE.height}px)</Label>
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Logo will be resized to fit in a {MAX_LOGO_SIZE.width}x{MAX_LOGO_SIZE.height}px area
          </p>
        </div>
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Export PNG
          </Button>
        </div>
      </div>
    </div>
  );
};
