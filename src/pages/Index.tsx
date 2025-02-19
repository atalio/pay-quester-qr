import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Store, Package, DollarSign, Wallet, ChevronDown, ChevronUp, Hash } from "lucide-react";
import { fiatCurrencies } from "@/utils/currencies";
import { NumericKeypad } from "@/components/NumericKeypad";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { SocialShare } from "@/components/SocialShare";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState<string[]>([]);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [formData, setFormData] = useState({
    merchantName: "",
    productName: "",
    productId: "",
    amount: "",
    xrpAddress: "",
  });
  const [isAmountInXRP, setIsAmountInXRP] = useState(true);
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [qrData, setQrData] = useState("");
  const [showNumpad, setShowNumpad] = useState(false);
  const numpadTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLanguages(["en", "es", "de"]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      const sanitizedValue = value.replace(/,/g, ".");
      const numericValue = sanitizedValue.replace(/[^\d.]/g, "");
      const parts = numericValue.split(".");
      const finalValue = parts[0] + (parts.length > 1 ? "." + parts[1] : "");
      
      setFormData((prev) => ({ ...prev, [name]: finalValue }));
      
      if (numpadTimeoutRef.current) {
        clearTimeout(numpadTimeoutRef.current);
      }
      numpadTimeoutRef.current = setTimeout(() => {
        setShowNumpad(false);
      }, 800);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNumpadClick = (value: string) => {
    if (value === "backspace") {
      setFormData((prev) => ({
        ...prev,
        amount: prev.amount.slice(0, -1),
      }));
      return;
    }
    
    if (value === ".") {
      if (!formData.amount.includes(".")) {
        setFormData((prev) => ({
          ...prev,
          amount: prev.amount + value,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      amount: prev.amount + value,
    }));
  };

  const handleNumpadClose = () => {
    setShowNumpad(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageLabel = (lng: string): string => {
    switch (lng) {
      case "en":
        return "English";
      case "es":
        return "Español";
      case "de":
        return "Deutsch";
      default:
        return lng;
    }
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

    const qrContent = `Merchant: ${formData.merchantName || ""}\nProduct: ${formData.productName || ""}\nProduct ID: ${formData.productId || ""}\nAmount: ${formData.amount}\nCurrency: ${isAmountInXRP ? "XRP" : selectedFiat}\nXRP Address: ${formData.xrpAddress}`;
    setQrData(qrContent);
  };

  const getShareableContent = () => {
    const currency = isAmountInXRP ? "XRP" : selectedFiat;
    return `${formData.merchantName || ""} ${formData.productName || ""} ${currency} ${formData.amount}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-2xl mx-auto">
          <img 
            src="/lovable-uploads/7450c25d-f739-43d4-a8fc-a3ddf2cea909.png" 
            alt="Bitbob" 
            className="h-8 w-auto"
          />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {t("fields.amount.label")}
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Input
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        onFocus={() => setShowNumpad(true)}
                        placeholder={`${t("fields.amount.placeholder")} ${
                          isAmountInXRP ? t("currency.xrp") : selectedFiat
                        }`}
                        className="transition-all focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                      {showNumpad && (
                        <div className="absolute top-full left-0 z-50 mt-2">
                          <NumericKeypad 
                            onKeyPress={handleNumpadClick}
                            onClose={handleNumpadClose}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={isAmountInXRP}
                        onCheckedChange={(checked) => {
                          setIsAmountInXRP(checked);
                          if (!checked) {
                            setSelectedFiat("USD");
                          }
                        }}
                      />
                      {isAmountInXRP ? (
                        <Label>{t("currency.xrp")}</Label>
                      ) : (
                        <Select value={selectedFiat} onValueChange={setSelectedFiat}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fiatCurrencies.map((currency) => (
                              <SelectItem key={currency.code} value={currency.code}>
                                {currency.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="xrpAddress" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    {t("fields.xrpAddress.label")}
                  </Label>
                  <Input
                    id="xrpAddress"
                    name="xrpAddress"
                    value={formData.xrpAddress}
                    onChange={handleInputChange}
                    placeholder={t("fields.xrpAddress.placeholder")}
                    className="transition-all focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="w-full flex items-center justify-center gap-2"
              >
                {showOptionalFields ? (
                  <>Less Options <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>More Options <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>

              {showOptionalFields && (
                <div className="space-y-4 animate-accordion-down">
                  <div className="space-y-2">
                    <Label htmlFor="merchantName" className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      {t("fields.merchantName.label")}
                    </Label>
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
                    <Label htmlFor="productName" className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {t("fields.productName.label")}
                    </Label>
                    <Input
                      id="productName"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder={t("fields.productName.placeholder")}
                      className="transition-all focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productId" className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      {t("fields.productId.label")}
                    </Label>
                    <Input
                      id="productId"
                      name="productId"
                      value={formData.productId}
                      onChange={handleInputChange}
                      placeholder={t("fields.productId.placeholder")}
                      className="transition-all focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

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
                <QRCodeDisplay value={qrData} />
                <p className="text-gray-600 whitespace-pre-line text-sm">{qrData}</p>
                <SocialShare
                  url="https://bitbob.app"
                  title={getShareableContent()}
                  emailSubject="Bitbob Payment Request"
                  emailBody={getShareableContent()}
                />
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
