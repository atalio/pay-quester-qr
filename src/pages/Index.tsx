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
import { Globe, Store, Package, DollarSign, Hash, ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { fiatCurrencies } from "@/utils/currencies";
import { NumericKeypad } from "@/components/NumericKeypad";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { SocialShare } from "@/components/SocialShare";
import { Footer } from "@/components/Footer";
import { XRPAddressInput } from "@/components/XRPAddressInput";
import { CustomLogoQR } from "@/components/qr-styles/CustomLogoQR";
import { DebugPanel } from "@/components/DebugPanel";

const languageLabels: Record<string, string> = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  as: "Assamese",
  az: "Azerbaijani",
  bn: "Bangla",
  ba: "Bashkir",
  eu: "Basque",
  bs: "Bosnian",
  bg: "Bulgarian",
  yue: "Cantonese (Traditional)",
  ca: "Catalan",
  lzh: "Chinese Literary",
  "zh-Hans": "Chinese (Simplified)",
  "zh-Hant": "Chinese (Traditional)",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  prs: "Dari",
  dv: "Divehi",
  nl: "Dutch",
  en: "English",
  et: "Estonian",
  fo: "Faroese",
  fj: "Fijian",
  fil: "Filipino",
  fi: "Finnish",
  fr: "French",
  "fr-CA": "French (Canada)",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  he: "Hebrew",
  hi: "Hindi",
  mww: "Hmong Daw",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  ikt: "Inuinnaqtun",
  iu: "Inuktitut",
  "iu-Latn": "Inuktitut (Latin)",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  "tlh-Latn": "Klingon (Latin)",
  ko: "Korean",
  ku: "Kurdish (Central)",
  kmr: "Kurdish (Northern)",
  ky: "Kyrgyz",
  lo: "Lao",
  lv: "Latvian",
  lt: "Lithuanian",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mr: "Marathi",
  "mn-Cyrl": "Mongolian (Cyrillic)",
  "mn-Mong": "Mongolian (Traditional)",
  my: "Myanmar (Burmese)",
  mi: "Māori",
  ne: "Nepali",
  nb: "Norwegian",
  or: "Odia",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  pa: "Punjabi",
  otq: "Querétaro Otomi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  "sr-Cyrl": "Serbian (Cyrillic)",
  "sr-Latn": "Serbian (Latin)",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  ty: "Tahitian",
  ta: "Tamil",
  tt: "Tatar",
  te: "Telugu",
  th: "Thai",
  bo: "Tibetan",
  ti: "Tigrinya",
  to: "Tongan",
  tr: "Turkish",
  tk: "Turkmen",
  uk: "Ukrainian",
  hsb: "Upper Sorbian",
  ur: "Urdu",
  ug: "Uyghur",
  uz: "Uzbek (Latin)",
  vi: "Vietnamese",
  cy: "Welsh",
  yua: "Yucatec Maya",
  zu: "Zulu",
};

const getLanguageLabel = (lng: string): string => {
  return languageLabels[lng] || lng;
};

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
  const [qrStyle, setQrStyle] = useState("custom-logo");
  const numpadTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLanguages([
      "af", "sq", "am", "ar", "hy", "as", "az", "bn", "ba", "eu", "bs", "bg", "yue", "ca", "lzh",
      "zh-Hans", "zh-Hant", "hr", "cs", "da", "prs", "dv", "nl", "en", "et", "fo", "fj", "fil", "fi",
      "fr", "fr-CA", "gl", "ka", "de", "el", "gu", "ht", "he", "hi", "mww", "hu", "is", "id", "ikt",
      "iu", "iu-Latn", "ga", "it", "ja", "kn", "kk", "km", "tlh-Latn", "ko", "ku", "kmr", "ky", "lo",
      "lv", "lt", "mk", "mg", "ms", "ml", "mt", "mr", "mn-Cyrl", "mn-Mong", "my", "mi", "ne", "nb",
      "or", "ps", "fa", "pl", "pt", "pt-PT", "pa", "otq", "ro", "ru", "sm", "sr-Cyrl", "sr-Latn", "sk",
      "sl", "so", "es", "sw", "sv", "ty", "ta", "tt", "te", "th", "bo", "ti", "to", "tr", "tk", "uk",
      "hsb", "ur", "ug", "uz", "vi", "cy", "yua", "zu",
    ]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const sanitizedValue = value.replace(/,/g, ".");
      const numericValue = sanitizedValue.replace(/[^\d.]/g, "");
      const parts = numericValue.split(".");
      const finalValue = parts[0] + (parts.length > 1 ? "." + parts[1] : "");
      setFormData((prev) => ({ ...prev, [name]: finalValue }));
      console.debug("[UI] Amount updated:", finalValue);
      if (numpadTimeoutRef.current) {
        clearTimeout(numpadTimeoutRef.current);
      }
      numpadTimeoutRef.current = setTimeout(() => setShowNumpad(false), 800);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      console.debug(`[UI] ${name} updated:`, value);
    }
  };

  const handleNumpadClick = (value: string) => {
    if (value === "backspace") {
      setFormData((prev) => ({ ...prev, amount: prev.amount.slice(0, -1) }));
      return;
    }
    if (value === ".") {
      if (!formData.amount.includes(".")) {
        setFormData((prev) => ({ ...prev, amount: prev.amount + value }));
      }
      return;
    }
    setFormData((prev) => ({ ...prev, amount: prev.amount + value }));
  };

  const handleNumpadClose = () => setShowNumpad(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
    // QR content is comma-separated to match Android KT code expectations.
    const qrContent = `Merchant: ${formData.merchantName || ""}, Product: ${formData.productName || ""}, Product ID: ${formData.productId || ""}, Amount: ${formData.amount}, Currency: ${isAmountInXRP ? "XRP" : selectedFiat}, XRP Address: ${formData.xrpAddress}`;
    setQrData(qrContent);
    console.debug("[UI] QR code generated");
  };

  const handleXRPAddressChange = (value: string) => {
    setFormData((prev) => ({ ...prev, xrpAddress: value }));
    console.debug("[UI] XRP address updated:", value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
     <header className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-b relative">
  <div className="max-w-2xl mx-auto flex items-center justify-between">
    {/* Left: Logo */}
    <div className="flex items-center gap-4">
      <img
        src="/lovable-uploads/7450c25d-f739-43d4-a8fc-a3ddf2cea909.png"
        alt="Bitbob"
        className="h-6 w-auto"
      />
    </div>
    {/* Center: Title & Subtitle (absolutely centered) */}
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className="text-sm font-bold text-gray-900">{t("title")}</h1>
      <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
    </div>
    {/* Right: Language Switch */}
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-[800px] overflow-y-auto text-sm">
          {languages.map((lng) => (
            <DropdownMenuItem key={lng} onClick={() => changeLanguage(lng)}>
              {getLanguageLabel(lng)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</header>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
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
                        placeholder={`${t("fields.amount.placeholder")} ${isAmountInXRP ? t("currency.xrp") : selectedFiat}`}
                        className="transition-all focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                      {showNumpad && (
                        <div className="absolute top-full left-0 z-50 mt-2">
                          <NumericKeypad onKeyPress={handleNumpadClick} onClose={handleNumpadClose} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={isAmountInXRP}
                        onCheckedChange={(checked) => {
                          setIsAmountInXRP(checked);
                          if (!checked) setSelectedFiat("USD");
                          console.debug("[UI] Currency type changed:", checked ? "XRP" : "Fiat");
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
                <XRPAddressInput
                  value={formData.xrpAddress}
                  onChange={handleXRPAddressChange}
                  label={t("fields.xrpAddress.label")}
                  placeholder={t("fields.xrpAddress.placeholder")}
                />
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
              <Button onClick={generateQRCode} className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                {t("buttons.generate")}
              </Button>
            </div>
          </Card>
          {qrData && (
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-up">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Left Column: QR Code Image */}
                <div className="flex-shrink-0">
                  {qrStyle === "custom-logo" ? (
                    <CustomLogoQR value={qrData} />
                  ) : (
                    <QRCodeDisplay value={qrData} />
                  )}
                </div>
                {/* Right Column: Social Sharing Options */}
                <div className="flex flex-col items-center gap-4">
                  <Button variant="outline" className="p-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <SocialShare
                      url="https://bitbob.app"
                      title={`${formData.merchantName || ""} ${formData.productName || ""} ${isAmountInXRP ? "XRP" : selectedFiat} ${formData.amount}`}
                      amount={formData.amount}
                      merchantName={formData.merchantName}
                      xrpAddress={formData.xrpAddress}
                      productId={formData.productId}
                      productName={formData.productName}
                      isAmountInXRP={isAmountInXRP}
                      selectedFiat={selectedFiat}
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 whitespace-pre-line text-sm">{qrData}</p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
      <DebugPanel />
    </div>
  );
};

export default Index;