// CustomLogoQR.tsx
import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface CustomLogoQRProps {
  value: string;
}

const MAX_LOGO_SIZE = {
  width: 64,
  height: 64,
};

export const CustomLogoQR = ({ value }: CustomLogoQRProps) => {
  const [customLogo, setCustomLogo] = useState<string>(
    "/pay-quester-qr/public/favicon.ico"
  );
  const [finalQrUrl, setFinalQrUrl] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("#403E43");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [eyeColor, setEyeColor] = useState<string>("#005794");
  const [eyeRadius, setEyeRadius] = useState<number>(12);
  const [logoPaddingStyle, setLogoPaddingStyle] = useState<"square" | "circle">("square");
  const qrWrapperRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  // 1) Validate & resize the uploaded image
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
      img.onerror = () => {
        reject(new Error("Error loading image"));
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // 2) Handle the file upload
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const resizedLogo = await validateAndResizeImage(file);
      setCustomLogo(resizedLogo);
      console.debug("[UI] Custom logo uploaded and resized");
      toast({
        title: t("toasts.logoUpload.success"),
        description: t("toasts.logoUpload.resized", {
          width: MAX_LOGO_SIZE.width,
          height: MAX_LOGO_SIZE.height,
        }),
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

  // 3) Combine translated scan text + final QR into one canvas
// In your mergeTextAndQr() function, use a fallback string to verify the translation key is working:
const mergeTextAndQr = () => {
  if (!qrWrapperRef.current) return;
  const qrCanvas = qrWrapperRef.current.querySelector("canvas");
  if (!qrCanvas) return;
  const qrWidth = qrCanvas.width;
  const qrHeight = qrCanvas.height;
  const extraTop = 50;
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = qrWidth;
  finalCanvas.height = qrHeight + extraTop;
  const ctx = finalCanvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  
  // Use a fallback value to ensure the key is working
  const scanText = t("qrCode.scanText", "Scan me with Bitbob.app");
  ctx.fillStyle = "#005794";
  ctx.font = "bold 30px poppins";
  const textWidth = ctx.measureText(scanText).width;
  const textX = (finalCanvas.width - textWidth) / 2;
  const textY = 30;
  ctx.fillText(scanText, textX, textY);
  
  ctx.drawImage(qrCanvas, 0, extraTop);
  const mergedUrl = finalCanvas.toDataURL("image/png");
  setFinalQrUrl(mergedUrl);
};

  // 4) Run merge after each render
  useEffect(() => {
    const timer = setTimeout(() => {
      mergeTextAndQr();
    }, 300);
    return () => clearTimeout(timer);
  }, [value, customLogo, t, fgColor, bgColor, eyeColor, eyeRadius, logoPaddingStyle]);

  // 5) Download final combined QR
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
          quietZone={16}
          qrStyle="dots"
          eyeRadius={eyeRadius}
          eyeColor={eyeColor}
          logoImage={customLogo}
          logoWidth={64}
          logoHeight={64}
          logoOpacity={1}
          logoPadding={8}
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

      {/* Options for customization */}
      <div className="space-y-4">
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
          <div className="space-y-2 col-span-2">
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
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            {t("buttons.exportPng")}
          </Button>
        </div>
      </div>
    </div>
  );
};
