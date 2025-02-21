
import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download } from "lucide-react";

interface CustomLogoQRProps {
  value: string;
}

export const CustomLogoQR = ({ value }: CustomLogoQRProps) => {
  const [customLogo, setCustomLogo] = useState<string>("/lovable-uploads/7450c25d-f739-43d4-a8fc-a3ddf2cea909.png");
  const qrRef = useRef<HTMLDivElement>(null);
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomLogo(reader.result as string);
        console.debug("[UI] Custom logo uploaded");
      };
      reader.readAsDataURL(file);
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
          logoWidth={64}
          logoHeight={64}
          logoOpacity={1}
          backgroundColor="#ffffff"
          fgColor="#403E43"
          removeQrCodeBehindLogo={true}
        />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Logo Image</Label>
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="cursor-pointer"
          />
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

