
import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  WhatsappIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    merchantName: "",
    productName: "",
    productId: "",
    amount: "",
    xrpAddress: "",
  });
  const [isAmountInXRP, setIsAmountInXRP] = useState(true);
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    // Dynamically fetch available languages
    fetch("/locales/languages.json")
      .catch(() => {
        // If languages.json doesn't exist, default to hardcoded languages
        return { json: () => Promise.resolve(["en", "es", "de"]) };
      })
      .then((response) => response.json())
      .then((data) => setLanguages(Array.isArray(data) ? data : ["en", "es", "de"]))
      .catch(console.error);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateQRCode = () => {
    if (!formData.amount || !formData.xrpAddress) {
      toast({
        title: t("errors.requiredFields.title"),
        description: t("errors.requiredFields.description"),
        variant: "destructive",
      });
      return;
    }

    const qrContent = `Merchant: ${formData.merchantName}\nProduct: ${formData.productName}\nAmount: ${
      formData.amount
    }\nCurrency: ${isAmountInXRP ? "XRP" : "USD"}\nXRP Address: ${formData.xrpAddress}`;
    setQrData(qrContent);
  };

  const shareableContent = `Here is the Bitbob QR code!\n\nQR Code Data:\n${qrData}\n\nFor more information, visit: https://bitbob.app`;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageLabel = (code: string) => {
    const labels: { [key: string]: string } = {
      en: "English",
      es: "Español",
      de: "Deutsch",
    };
    return labels[code] || code;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lng) => (
                <DropdownMenuItem key={lng} onClick={() => changeLanguage(lng)}>
                  {getLanguageLabel(lng)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <Card className="p-6 space-y-6 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-in">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="xrpAddress">{t("fields.xrpAddress.label")}</Label>
              <Input
                id="xrpAddress"
                name="xrpAddress"
                value={formData.xrpAddress}
                onChange={handleInputChange}
                placeholder={t("fields.xrpAddress.placeholder")}
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">{t("fields.amount.label")}</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder={`${t("fields.amount.placeholder")} ${
                    isAmountInXRP ? t("currency.xrp") : t("currency.usd")
                  }`}
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isAmountInXRP}
                    onCheckedChange={setIsAmountInXRP}
                  />
                  <Label>{t("currency.xrp")}</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchantName">{t("fields.merchantName.label")}</Label>
              <Input
                id="merchantName"
                name="merchantName"
                value={formData.merchantName}
                onChange={handleInputChange}
                placeholder={t("fields.merchantName.placeholder")}
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">{t("fields.productName.label")}</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder={t("fields.productName.placeholder")}
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              onClick={generateQRCode}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {t("buttons.generate")}
            </Button>
          </div>
        </Card>

        {qrData && (
          <Card className="p-6 space-y-6 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-up">
            <div className="text-center space-y-4">
              <p className="text-gray-700 font-medium">{t("qrCode.title")}</p>
              <div className="flex justify-center">
                <div className="relative p-4 bg-white rounded-2xl shadow-sm">
                  <QRCode
                    value={qrData}
                    size={200}
                    level="H"
                    imageSettings={{
                      src: "/lovable-uploads/04f01451-2fee-4a5b-87b8-4d15deb89578.png",
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
              </div>
              <p className="text-gray-600 whitespace-pre-line text-sm">{qrData}</p>
              
              <div className="flex justify-center space-x-4 pt-4">
                <WhatsappShareButton url="https://bitbob.app" title={shareableContent}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <EmailShareButton url="https://bitbob.app" subject="Bitbob Payment Request" body={shareableContent}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <TwitterShareButton url="https://bitbob.app" title={shareableContent}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
