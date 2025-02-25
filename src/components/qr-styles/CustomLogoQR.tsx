import { useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./CustomLogoQR.css"; // Import the CSS file

type GenerateQRCodeWithTextOptions = {
  value: string;
  fgColor: string;
  fgGradient: any;
  bgColor: string;
  bgGradient: any;
  logo: string;
  logoPaddingStyle: "square" | "circle";
  scanText: string;
  width: number;
  height: number;
  margin: number;
  dotsType: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
  cornersSquareType: "square" | "dot" | "extra-rounded" | "classy" | "classy-rounded" | "rounded";
  cornersDotType: "square" | "dot" | "extra-rounded" | "classy" | "classy-rounded" | "rounded";
  cornersSquareColor: string;
  cornersDotColor: string;
};

const MAX_LOGO_SIZE = { width: 80, height: 80 };

const predefinedLogos = [
  { name: "None", url: "none" },
  { name: "Bitbob", url: "/qrinput/favicon.ico" },
  { name: "XRPL", url: "/qrinput/xrpl.png" },
  { name: "Custom", url: "custom" },
  { name: "Smiling Face", url: "https://api.iconify.design/fluent-emoji/smiling-face.svg" },
  { name: "Thumbs Up", url: "https://api.iconify.design/fluent-emoji/thumbs-up.svg" },
  { name: "Rocket", url: "https://api.iconify.design/fluent-emoji/rocket.svg" },
  { name: "Party Popper", url: "https://api.iconify.design/fluent-emoji/party-popper.svg" },
  { name: "Grinning Face", url: "https://api.iconify.design/fluent-emoji/grinning-face.svg" },
  { name: "Face with Tears of Joy", url: "https://api.iconify.design/fluent-emoji/face-with-tears-of-joy.svg" },
  { name: "Rolling on the Floor Laughing", url: "https://api.iconify.design/fluent-emoji/rolling-on-the-floor-laughing.svg" },
  { name: "Smiling Face with Heart-Eyes", url: "https://api.iconify.design/fluent-emoji/smiling-face-with-heart-eyes.svg" },
  { name: "Star-Struck", url: "https://api.iconify.design/fluent-emoji/star-struck.svg" },
  { name: "Face Blowing a Kiss", url: "https://api.iconify.design/fluent-emoji/face-blowing-a-kiss.svg" },
  { name: "Smiling Face with Sunglasses", url: "https://api.iconify.design/fluent-emoji/smiling-face-with-sunglasses.svg" },
  { name: "Thinking Face", url: "https://api.iconify.design/fluent-emoji/thinking-face.svg" },
  { name: "Zany Face", url: "https://api.iconify.design/fluent-emoji/zany-face.svg" },
  { name: "Face with Raised Eyebrow", url: "https://api.iconify.design/fluent-emoji/face-with-raised-eyebrow.svg" },
  { name: "Face with Monocle", url: "https://api.iconify.design/fluent-emoji/face-with-monocle.svg" },
  { name: "Nerd Face", url: "https://api.iconify.design/fluent-emoji/nerd-face.svg" },
  { name: "Face with Tongue", url: "https://api.iconify.design/fluent-emoji/face-with-tongue.svg" },
  { name: "Winking Face with Tongue", url: "https://api.iconify.design/fluent-emoji/winking-face-with-tongue.svg" },
  { name: "Money-Mouth Face", url: "https://api.iconify.design/fluent-emoji/money-mouth-face.svg" },
  { name: "Hugging Face", url: "https://api.iconify.design/fluent-emoji/hugging-face.svg" },
  { name: "Face with Hand Over Mouth", url: "https://api.iconify.design/fluent-emoji/face-with-hand-over-mouth.svg" },
  { name: "Shushing Face", url: "https://api.iconify.design/fluent-emoji/shushing-face.svg" },
  { name: "Face with Symbols on Mouth", url: "https://api.iconify.design/fluent-emoji/face-with-symbols-on-mouth.svg" },
  { name: "Exploding Head", url: "https://api.iconify.design/fluent-emoji/exploding-head.svg" },
  { name: "Cowboy Hat Face", url: "https://api.iconify.design/fluent-emoji/cowboy-hat-face.svg" },
  { name: "Partying Face", url: "https://api.iconify.design/fluent-emoji/partying-face.svg" },
  { name: "Smiling Face with Halo", url: "https://api.iconify.design/fluent-emoji/smiling-face-with-halo.svg" },
  { name: "Face with Medical Mask", url: "https://api.iconify.design/fluent-emoji/face-with-medical-mask.svg" },
  { name: "Face with Thermometer", url: "https://api.iconify.design/fluent-emoji/face-with-thermometer.svg" },
  { name: "Face with Head-Bandage", url: "https://api.iconify.design/fluent-emoji/face-with-head-bandage.svg" },
  { name: "Nauseated Face", url: "https://api.iconify.design/fluent-emoji/nauseated-face.svg" },
  { name: "Face Vomiting", url: "https://api.iconify.design/fluent-emoji/face-vomiting.svg" },
  { name: "Sneezing Face", url: "https://api.iconify.design/fluent-emoji/sneezing-face.svg" },
  { name: "Hot Face", url: "https://api.iconify.design/fluent-emoji/hot-face.svg" },
  { name: "Cold Face", url: "https://api.iconify.design/fluent-emoji/cold-face.svg" },
  { name: "Woozy Face", url: "https://api.iconify.design/fluent-emoji/woozy-face.svg" },
  { name: "Dizzy Face", url: "https://api.iconify.design/fluent-emoji/dizzy-face.svg" },
  { name: "Face with Spiral Eyes", url: "https://api.iconify.design/fluent-emoji/face-with-spiral-eyes.svg" },
  { name: "Face in Clouds", url: "https://api.iconify.design/fluent-emoji/face-in-clouds.svg" },
  { name: "Face Exhaling", url: "https://api.iconify.design/fluent-emoji/face-exhaling.svg" },
  { name: "Face with Open Mouth", url: "https://api.iconify.design/fluent-emoji/face-with-open-mouth.svg" },
  { name: "Face Screaming in Fear", url: "https://api.iconify.design/fluent-emoji/face-screaming-in-fear.svg" },
  { name: "Astonished Face", url: "https://api.iconify.design/fluent-emoji/astonished-face.svg" },
  { name: "Flushed Face", url: "https://api.iconify.design/fluent-emoji/flushed-face.svg" },
  { name: "Sleeping Face", url: "https://api.iconify.design/fluent-emoji/sleeping-face.svg" },
  { name: "Drooling Face", url: "https://api.iconify.design/fluent-emoji/drooling-face.svg" },
  { name: "Face with Crossed-Out Eyes", url: "https://api.iconify.design/fluent-emoji/face-with-crossed-out-eyes.svg" },
  { name: "Face with Peeking Eye", url: "https://api.iconify.design/fluent-emoji/face-with-peeking-eye.svg" },
];

export const CustomLogoQR = ({
  value,
  onQrGenerated,
}: {
  value: string;
  onQrGenerated?: (url: string) => void;
}) => {
  const [customLogo, setCustomLogo] = useState<string>("/qrinput/favicon.ico");
  const [selectedPredefinedLogo, setSelectedPredefinedLogo] = useState<string>("/qrinput/favicon.ico");
  const [fgColor, setFgColor] = useState<string>("#403E43");
  const [bgColor, setBgColor] = useState<string>("#ffffff");

  // Styling options for corners and dots
  const [dotsType, setDotsType] = useState<"square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded">("extra-rounded");
  const [cornersSquareType, setCornersSquareType] = useState<"square" | "dot" | "extra-rounded" | "classy" | "classy-rounded" | "rounded">("extra-rounded");
  const [cornersDotType, setCornersDotType] = useState<"square" | "dot" | "extra-rounded" | "classy" | "classy-rounded" | "rounded">("extra-rounded");
  const [cornersSquareColor, setCornersSquareColor] = useState<string>("#403E43");
  const [cornersDotColor, setCornersDotColor] = useState<string>("#403E43");
  const [logoPaddingStyle, setLogoPaddingStyle] = useState<"square" | "circle">("circle");

  // Gradient options for foreground and background
  const [fgGradient, setFgGradient] = useState<any>({
    type: "linear",
    rotation: 0,
    colorStops: [
      { offset: 0, color: "#403E43" },
      { offset: 1, color: "#005794" },
    ],
  });
  const bgGradient = null;

  const [finalQrUrl, setFinalQrUrl] = useState<string>("");

  const { toast } = useToast();
  const { t } = useTranslation();

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
        resolve(e.target?.result as string);
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
      setSelectedPredefinedLogo("custom");
      toast({
        title: t("toasts.logoUpload.success"),
        description: t("toasts.logoUpload.resized", {
          width: MAX_LOGO_SIZE.width,
          height: MAX_LOGO_SIZE.height,
        }),
      });
    } catch (error) {
      toast({
        title: t("toasts.logoUpload.error"),
        description: t("toasts.logoUpload.tryAgain"),
        variant: "destructive",
      });
    }
  };

  const handlePredefinedLogoSelect = (logoUrl: string) => {
    setSelectedPredefinedLogo(logoUrl);
    if (logoUrl !== "custom") {
      setCustomLogo(logoUrl);
    }
  };

  const updateQRCode = async () => {
    const logoToUse =
      selectedPredefinedLogo !== "none"
        ? selectedPredefinedLogo === "custom"
          ? customLogo
          : selectedPredefinedLogo
        : "";

    const mergedUrl = await generateQRCodeWithText({
      value,
      fgColor,
      fgGradient,
      bgColor,
      bgGradient,
      logo: logoToUse,
      logoPaddingStyle,
      scanText: t("qrCode.scanText", "Bitbob.app"),
      width: 300,
      height: 300,
      margin: 10,
      dotsType,
      cornersSquareType,
      cornersDotType,
      cornersSquareColor,
      cornersDotColor,
    });

    console.log("QR Data URL =>", mergedUrl);
    setFinalQrUrl(mergedUrl);
    if (onQrGenerated) onQrGenerated(mergedUrl);
  };

  useEffect(() => {
    updateQRCode();
  }, [
    value,
    customLogo,
    fgColor,
    bgColor,
    logoPaddingStyle,
    selectedPredefinedLogo,
    dotsType,
    cornersSquareType,
    cornersDotType,
    cornersSquareColor,
    cornersDotColor,
    fgGradient,
    bgGradient,
    t,
  ]);

  useEffect(() => {
    updateQRCode();
  }, []); // Run only once when the component mounts

  const handleDownload = () => {
    if (!finalQrUrl) return;
    const link = document.createElement("a");
    link.download = "bitbob-qr-custom.png";
    link.href = finalQrUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          {t("buttons.exportPng")}
        </Button>
      </div>
      <div className="flex justify-center">
        {finalQrUrl ? (
          <img src={finalQrUrl} alt="Bitbob QR" className="qr-image" />
        ) : (
          <p className="text-sm text-gray-500">{t("qrCode.generating")}</p>
        )}
      </div>
      <div className="flex justify-center"></div>
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
        <div className="space-y-2">
          <Label htmlFor="fgColor">{t("qrCode.customization.fgColor")}</Label>
          <Input id="fgColor" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bgColor">{t("qrCode.customization.bgColor")}</Label>
          <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fgGradientStart">FG Gradient Start</Label>
          <Input
            id="fgGradientStart"
            type="color"
            value={fgGradient?.colorStops?.[0]?.color || "#403E43"}
            onChange={(e) =>
              setFgGradient({
                type: "linear",
                rotation: 0,
                colorStops: [
                  { offset: 0, color: e.target.value },
                  { offset: 1, color: fgGradient?.colorStops?.[1]?.color || "#005794" },
                ],
              })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fgGradientEnd">FG Gradient End</Label>
          <Input
            id="fgGradientEnd"
            type="color"
            value={fgGradient?.colorStops?.[1]?.color || "#005794"}
            onChange={(e) =>
              setFgGradient({
                type: "linear",
                rotation: 0,
                colorStops: [
                  { offset: 0, color: fgGradient?.colorStops?.[0]?.color || "#403E43" },
                  { offset: 1, color: e.target.value },
                ],
              })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>Dots Type</Label>
          <select
            value={dotsType}
            onChange={(e) => setDotsType(e.target.value as typeof dotsType)}
            className="p-2 border rounded w-full"
          >
            <option value="extra-rounded">extra-rounded</option>
            <option value="square">square</option>
            <option value="dots">dots</option>
            <option value="rounded">rounded</option>
            <option value="classy">classy</option>
            <option value="classy-rounded">classy-rounded</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Corners Square Type</Label>
          <select
            value={cornersSquareType}
            onChange={(e) => setCornersSquareType(e.target.value as typeof cornersSquareType)}
            className="p-2 border rounded w-full"
          >
            <option value="extra-rounded">extra-rounded</option>
            <option value="square">square</option>
            <option value="dot">dot</option>
            <option value="classy">classy</option>
            <option value="classy-rounded">classy-rounded</option>
            <option value="rounded">rounded</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Corners Square Color</Label>
          <Input
            type="color"
            value={cornersSquareColor}
            onChange={(e) => setCornersSquareColor(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>Corners Dot Type</Label>
          <select
            value={cornersDotType}
            onChange={(e) => setCornersDotType(e.target.value as typeof cornersDotType)}
            className="p-2 border rounded w-full"
          >
            <option value="extra-rounded">extra-rounded</option>
            <option value="square">square</option>
            <option value="dot">dot</option>
            <option value="classy">classy</option>
            <option value="classy-rounded">classy-rounded</option>
            <option value="rounded">rounded</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Corners Dot Color</Label>
          <Input
            type="color"
            value={cornersDotColor}
            onChange={(e) => setCornersDotColor(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>Logo Padding Style</Label>
          <select
            value={logoPaddingStyle}
            onChange={(e) => setLogoPaddingStyle(e.target.value as "square" | "circle")}
            className="p-2 border rounded w-full"
          >
            <option value="square">square</option>
            <option value="circle">circle</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomLogoQR;
// Replace your existing generateQRCodeWithText function with the following:
async function generateQRCodeWithText(options: GenerateQRCodeWithTextOptions): Promise<string> {
  const {
    value,
    fgColor,
    fgGradient,
    bgColor,
    bgGradient,
    logo,
    logoPaddingStyle,
    scanText,
    width,
    height,
    margin,
    dotsType,
    cornersSquareType,
    cornersDotType,
    cornersSquareColor,
    cornersDotColor,
  } = options;

  // Create the base QR code
  const qrCode = new QRCodeStyling({
    width,
    height,
    data: value,
    image: logo,
    dotsOptions: {
      color: fgColor,
      type: dotsType,
      gradient: fgGradient,
    },
    backgroundOptions: {
      color: bgColor,
      gradient: bgGradient,
    },
    cornersSquareOptions: {
      type: cornersSquareType,
      color: cornersSquareColor,
    },
    cornersDotOptions: {
      type: cornersDotType,
      color: cornersDotColor,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin,
      imageSize: 0.4,
      hideBackgroundDots: true,
    },
  });

  // Get raw PNG data
  const blob = await qrCode.getRawData("png");
  if (!(blob instanceof Blob)) throw new Error("Failed to generate QR code");

  // Convert Blob to an object URL, then load into an Image
  const objectURL = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const qrImage = new Image();
    qrImage.src = objectURL;

    qrImage.onload = () => {
      // Extra space at top for text
      const textAreaHeight = 60;
      const canvas = document.createElement("canvas");
      canvas.width = qrImage.naturalWidth || width;
      canvas.height = (qrImage.naturalHeight || height) + textAreaHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectURL);
        return resolve("");
      }

      // Optional background (white)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text (e.g. "Bitbob.app") at top
      ctx.fillStyle = "#005794";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(scanText || "Bitbob.app", canvas.width / 2, 55);

      // Draw the QR code below the text
      ctx.drawImage(qrImage, 0, textAreaHeight);

      // Convert final canvas to base64
      const finalDataUrl = canvas.toDataURL("image/png");
      URL.revokeObjectURL(objectURL);
      resolve(finalDataUrl);
    };

    qrImage.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error("Error loading QR image"));
    };
  });
}
