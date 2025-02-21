import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomLogoQRProps {
  value: string;
  onQrGenerated?: (url: string) => void;
}

const MAX_LOGO_SIZE = {
  width: 64,
  height: 64,
};

// Hardcoded predefined logos; default is "Bitbob"
const predefinedLogos = [
  { name: "Bitbob", url: "/qrinput/favicon.ico"},
  { name: "XRPL", url: "/qrinput/xrpl.png" },
  // Add more logos as needed.
];

export const CustomLogoQR = ({ value, onQrGenerated }: CustomLogoQRProps) => {
  // Default selected logo is Bitbob.
  const [customLogo, setCustomLogo] = useState<string>("/qrinput/favicon.ico");
  const [finalQrUrl, setFinalQrUrl] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("#403E43");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [eyeColor, setEyeColor] = useState<string>("#005794");
  const [eyeRadius, setEyeRadius] = useState<number>(12);
  const [logoPaddingStyle, setLogoPaddingStyle] = useState<"square" | "circle">("square");
  const [selectedPredefinedLogo, setSelectedPredefinedLogo] = useState<string>("/public/favicon.ico");
  const qrWrapperRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Validate & resize uploaded image
  const validateAndResizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = MAX_LOGO_SIZE.width;
        canvas.height = MAX_LOGO_SIZE.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        const scale = Math.min(
          MAX_LOGO_SIZE.width / img.width,
          MAX_LOGO_SIZE.height / img.height
        );
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const x = (MAX_LOGO_SIZE.width - newWidth) / 2;
        const y = (MAX_LOGO_SIZE.height - newHeight) / 2;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, newWidth, newHeight);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Error loading image"));
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const resizedLogo = await validateAndResizeImage(file);
      setCustomLogo(resizedLogo);
      setSelectedPredefinedLogo(""); // Clear predefined selection
      console.debug("[UI] Custom logo uploaded and resized");
      toast({
        title: t("toasts.logoUpload.success"),
        description: t("toasts.logoUpload.resized", { width: MAX_LOGO_SIZE.width, height: MAX_LOGO_SIZE.height }),
      });
    } catch (error) {
      console.error("[UI] Error processing logo:", error);
      toast({
        title: t("toasts.logoUpload.error"),
        description: t("toasts.logoUpload.tryAgain"),
        variant: "destructive",
      });
    }
  };

  // Handle predefined logo selection from dropdown
  const handlePredefinedLogoSelect = (logoUrl: string) => {
    setSelectedPredefinedLogo(logoUrl);
    setCustomLogo(logoUrl);
  };

  // Merge scan text and QR code into one canvas
  const mergeTextAndQr = () => {
    if (!qrWrapperRef.current) return;
    const qrCanvas = qrWrapperRef.current.querySelector("canvas");
    if (!qrCanvas) return;
    const qrWidth = qrCanvas.width;
    const qrHeight = qrCanvas.height;
    const extraTop = 80;
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = qrWidth;
    finalCanvas.height = qrHeight + extraTop;
    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    const scanText = t("qrCode.scanText", "Bitbob.app");
    ctx.fillStyle = "#005794";
    ctx.font = "bold 40px arial";
    const textWidth = ctx.measureText(scanText).width;
    const textX = (finalCanvas.width - textWidth) / 2;
    const textY = 60;
    ctx.fillText(scanText, textX, textY);
    ctx.drawImage(qrCanvas, 0, extraTop);

    // Optionally mask the logo area if needed (not shown here)

    const mergedUrl = finalCanvas.toDataURL("image/png");
    setFinalQrUrl(mergedUrl);
    // Lift the final QR URL to parent if callback provided
    if (onQrGenerated) {
      onQrGenerated(mergedUrl);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => mergeTextAndQr(), 300);
    return () => clearTimeout(timer);
  }, [value, customLogo, t, fgColor, bgColor, eyeColor, eyeRadius, logoPaddingStyle]);

  const handleDownload = () => {
    if (!finalQrUrl) return;
    const link = document.createElement("a");
    link.download = "bitbob-qr-custom.png";
    link.href = finalQrUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.debug("[UI] QR code downloaded");
  };

  return (
    <div className="space-y-4">
      {/* Hidden container for generating the QR code */}
      <div ref={qrWrapperRef} style={{ display: "none" }}>
      <QRCode
  value={value}
  size={256}
  quietZone={20}                // Increased quiet zone for extra margin
  qrStyle="dots"
  eyeRadius={eyeRadius}
  eyeColor={eyeColor}
  logoImage={customLogo}
  logoWidth={64}
  logoHeight={64}
  logoOpacity={0.6}             // Semi-transparent logo to help preserve data
  logoPadding={16}              // More padding behind the logo to clear QR dots
  logoPaddingStyle={logoPaddingStyle}
  removeQrCodeBehindLogo={true}
  bgColor={bgColor}
  fgColor={fgColor}
/>
      </div>

      {/* Display merged final QR (text + code) */}
      <div className="flex justify-center">
        {finalQrUrl ? (
          <img src={finalQrUrl} alt="Bitbob QR" style={{ maxWidth: 256, maxHeight: 300 }} />
        ) : (
          <p className="text-sm text-gray-500">{t("qrCode.generating")}</p>
        )}
          </div>
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            {t("buttons.exportPng")}
          </Button>
        </div>

      {/* Customization Options */}
      <div className="space-y-4">
        {/* Predefined Logos Dropdown */}
        <div>
          <Label className="mb-2">{t("qrCode.predefinedLogos")}</Label>
          <Select value={selectedPredefinedLogo} onValueChange={handlePredefinedLogoSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("qrCode.selectPredefinedLogo")} />
            </SelectTrigger>
            <SelectContent>
              {predefinedLogos.map((logo) => (
                <SelectItem key={logo.name} value={logo.url}>
                  {logo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Upload Option */}
        <div className="space-y-2">
          <Label htmlFor="logo-upload">
            {t("qrCode.logoUpload.label", { width: MAX_LOGO_SIZE.width, height: MAX_LOGO_SIZE.height })}
          </Label>
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            {t("qrCode.logoUpload.help", { width: MAX_LOGO_SIZE.width, height: MAX_LOGO_SIZE.height })}
          </p>
        </div>
        {/* Color and Style Options */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fgColor">{t("qrCode.customization.fgColor")}</Label>
            <Input
              id="fgColor"
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bgColor">{t("qrCode.customization.bgColor")}</Label>
            <Input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eyeColor">{t("qrCode.customization.eyeColor")}</Label>
            <Input
              id="eyeColor"
              type="color"
              value={eyeColor}
              onChange={(e) => setEyeColor(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eyeRadius">{t("qrCode.customization.eyeRadius")}</Label>
            <Input
              id="eyeRadius"
              type="number"
              value={eyeRadius}
              onChange={(e) => setEyeRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="logoPaddingStyle">{t("qrCode.customization.logoPaddingStyle")}</Label>
            <select
              id="logoPaddingStyle"
              value={logoPaddingStyle}
              onChange={(e) => setLogoPaddingStyle(e.target.value as "square" | "circle")}
              className="p-2 border rounded w-full"
            >
              <option value="square">{t("qrCode.customization.square")}</option>
              <option value="circle">{t("qrCode.customization.circle")}</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomLogoQR;
