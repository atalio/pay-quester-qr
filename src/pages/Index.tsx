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
      case "af":
        return "Afrikaans";
      case "sq":
        return "Albanian";
      case "am":
        return "Amharic";
      case "ar":
        return "Arabic";
      case "hy":
        return "Armenian";
      case "as":
        return "Assamese";
      case "az":
        return "Azerbaijani";
      case "bn":
        return "Bangla";
      case "ba":
        return "Bashkir";
      case "eu":
        return "Basque";
      case "bs":
        return "Bosnian";
      case "bg":
        return "Bulgarian";
      case "yue":
        return "Cantonese_Traditional";
      case "ca":
        return "Catalan";
      case "lzh":
        return "Chinese_Literary";
      case "zh-Hans":
        return "Chinese_Simplified";
      case "zh-Hant":
        return "Chinese_Traditional";
      case "hr":
        return "Croatian";
      case "cs":
        return "Czech";
      case "da":
        return "Danish";
      case "prs":
        return "Dari";
      case "dv":
        return "Divehi";
      case "nl":
        return "Dutch";
      case "en":
        return "English";
      case "et":
        return "Estonian";
      case "fo":
        return "Faroese";
      case "fj":
        return "Fijian";
      case "fil":
        return "Filipino";
      case "fi":
        return "Finnish";
      case "fr":
        return "French";
      case "fr-CA":
        return "French_Canada";
      case "gl":
        return "Galician";
      case "ka":
        return "Georgian";
      case "de":
        return "German";
      case "el":
        return "Greek";
      case "gu":
        return "Gujarati";
      case "ht":
        return "Haitian_Creole";
      case "he":
        return "Hebrew";
      case "hi":
        return "Hindi";
      case "mww":
        return "Hmong_Daw";
      case "hu":
        return "Hungarian";
      case "is":
        return "Icelandic";
      case "id":
        return "Indonesian";
      case "ikt":
        return "Inuinnaqtun";
      case "iu":
        return "Inuktitut";
      case "iu-Latn":
        return "Inuktitut_Latin";
      case "ga":
        return "Irish";
      case "it":
        return "Italian";
      case "ja":
        return "Japanese";
      case "kn":
        return "Kannada";
      case "kk":
        return "Kazakh";
      case "km":
        return "Khmer";
      case "tlh-Latn":
        return "Klingon_Latin";
      case "ko":
        return "Korean";
      case "ku":
        return "Kurdish_Central";
      case "kmr":
        return "Kurdish_Northern";
      case "ky":
        return "Kyrgyz";
      case "lo":
        return "Lao";
      case "lv":
        return "Latvian";
      case "lt":
        return "Lithuanian";
      case "mk":
        return "Macedonian";
      case "mg":
        return "Malagasy";
      case "ms":
        return "Malay";
      case "ml":
        return "Malayalam";
      case "mt":
        return "Maltese";
      case "mr":
        return "Marathi";
      case "mn-Cyrl":
        return "Mongolian_Cyrillic";
      case "mn-Mong":
        return "Mongolian_Traditional";
      case "my":
        return "Myanmar_Burmese";
      case "mi":
        return "Māori";
      case "ne":
        return "Nepali";
      case "nb":
        return "Norwegian";
      case "or":
        return "Odia";
      case "ps":
        return "Pashto";
      case "fa":
        return "Persian";
      case "pl":
        return "Polish";
      case "pt":
        return "Portuguese_Brazil";
      case "pt-PT":
        return "Portuguese_Portugal";
      case "pa":
        return "Punjabi";
      case "otq":
        return "Querétaro_Otomi";
      case "ro":
        return "Romanian";
      case "ru":
        return "Russian";
      case "sm":
        return "Samoan";
      case "sr-Cyrl":
        return "Serbian_Cyrillic";
      case "sr-Latn":
        return "Serbian_Latin";
      case "sk":
        return "Slovak";
      case "sl":
        return "Slovenian";
      case "so":
        return "Somali";
      case "es":
        return "Spanish";
      case "sw":
        return "Swahili";
      case "sv":
        return "Swedish";
      case "ty":
        return "Tahitian";
      case "ta":
        return "Tamil";
      case "tt":
        return "Tatar";
      case "te":
        return "Telugu";
      case "th":
        return "Thai";
      case "bo":
        return "Tibetan";
      case "ti":
        return "Tigrinya";
      case "to":
        return "Tongan";
      case "tr":
        return "Turkish";
      case "tk":
        return "Turkmen";
      case "uk":
        return "Ukrainian";
      case "hsb":
        return "Upper_Sorbian";
      case "ur":
        return "Urdu";
      case "ug":
        return "Uyghur";
      case "uz":
        return "Uzbek_Latin";
      case "vi":
        return "Vietnamese";
      case "cy":
        return "Welsh";
      case "yua":
        return "Yucatec_Maya";
      case "zu":
        return "Zulu";
      default:
        return lng;
    }
};
<<<<<<< HEAD

=======
>>>>>>> f59fc94a5515f3081ee3eaab859563e84611ec6d

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
              <DropdownMenuContent className="max-h-[800px] overflow-y-auto text-sm">
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
