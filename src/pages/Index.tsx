import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  TelegramShareButton,
  RedditShareButton,
  WhatsappIcon,
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";
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
import { Globe } from "lucide-react";

const fiatCurrencies = [
  { code: "AFN", name: "Afghan Afghani" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "AWG", name: "Aruban Florin" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "AZN", name: "Azerbaijani Manat" },
  { code: "BSD", name: "Bahamian Dollar" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "BBD", name: "Barbadian Dollar" },
  { code: "BYN", name: "Belarusian Ruble" },
  { code: "BZD", name: "Belize Dollar" },
  { code: "XOF", name: "West African CFA Franc" },
  { code: "BMD", name: "Bermudian Dollar" },
  { code: "BTN", name: "Bhutanese Ngultrum" },
  { code: "BOB", name: "Bolivian Boliviano" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
  { code: "BWP", name: "Botswanan Pula" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "GBP", name: "British Pound" },
  { code: "BND", name: "Brunei Dollar" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BIF", name: "Burundian Franc" },
  { code: "KHR", name: "Cambodian Riel" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CVE", name: "Cape Verdean Escudo" },
  { code: "KYD", name: "Cayman Islands Dollar" },
  { code: "XAF", name: "Central African CFA Franc" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "COP", name: "Colombian Peso" },
  { code: "KMF", name: "Comorian Franc" },
  { code: "CDF", name: "Congolese Franc" },
  { code: "CRC", name: "Costa Rican Colón" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "CUP", name: "Cuban Peso" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "DJF", name: "Djiboutian Franc" },
  { code: "DOP", name: "Dominican Peso" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "ERN", name: "Eritrean Nakfa" },
  { code: "ETB", name: "Ethiopian Birr" },
  { code: "FJD", name: "Fijian Dollar" },
  { code: "GMD", name: "Gambian Dalasi" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "GTQ", name: "Guatemalan Quetzal" },
  { code: "GNF", name: "Guinean Franc" },
  { code: "GYD", name: "Guyanaese Dollar" },
  { code: "HTG", name: "Haitian Gourde" },
  { code: "HNL", name: "Honduran Lempira" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "INR", name: "Indian Rupee" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "IRR", name: "Iranian Rial" },
  { code: "IQD", name: "Iraqi Dinar" },
  { code: "ILS", name: "Israeli New Shekel" },
  { code: "JMD", name: "Jamaican Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "KZT", name: "Kazakhstani Tenge" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "KGS", name: "Kyrgystani Som" },
  { code: "LAK", name: "Laotian Kip" },
  { code: "LBP", name: "Lebanese Pound" },
  { code: "LSL", name: "Lesotho Loti" },
  { code: "LRD", name: "Liberian Dollar" },
  { code: "LYD", name: "Libyan Dinar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "MOP", name: "Macanese Pataca" },
  { code: "MGA", name: "Malagasy Ariary" },
  { code: "MWK", name: "Malawian Kwacha" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "MVR", name: "Maldivian Rufiyaa" },
  { code: "MRU", name: "Mauritanian Ouguiya" },
  { code: "MUR", name: "Mauritian Rupee" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MDL", name: "Moldovan Leu" },
  { code: "MNT", name: "Mongolian Tugrik" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "MZN", name: "Mozambican Metical" },
  { code: "MMK", name: "Myanmar Kyat" },
  { code: "NAD", name: "Namibian Dollar" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "NIO", name: "Nicaraguan Córdoba" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "OMR", name: "Omani Rial" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "PGK", name: "Papua New Guinean Kina" },
  { code: "PYG", name: "Paraguayan Guarani" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Złoty" },
  { code: "QAR", name: "Qatari Rial" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "RWF", name: "Rwandan Franc" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "RSD", name: "Serbian Dinar" },
  { code: "SCR", name: "Seychellois Rupee" },
  { code: "SLL", name: "Sierra Leonean Leone" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "SBD", name: "Solomon Islands Dollar" },
  { code: "SOS", name: "Somali Shilling" },
  { code: "ZAR", name: "South African Rand" },
  { code: "KRW", name: "South Korean Won" },
  { code: "SSP", name: "South Sudanese Pound" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "SDG", name: "Sudanese Pound" },
  { code: "SRD", name: "Surinamese Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SYP", name: "Syrian Pound" },
  { code: "TJS", name: "Tajikistani Somoni" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "THB", name: "Thai Baht" },
  { code: "TOP", name: "Tongan Paʻanga" },
  { code: "TTD", name: "Trinidad & Tobago Dollar" },
  { code: "TND", name: "Tunisian Dinar" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "TMT", name: "Turkmenistani Manat" },
  { code: "UGX", name: "Ugandan Shilling" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "UYU", name: "Uruguayan Peso" },
  { code: "UZS", name: "Uzbekistani Som" },
  { code: "VUV", name: "Vanuatu Vatu" },
  { code: "VEF", name: "Venezuelan Bolívar" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "YER", name: "Yemeni Rial" },
  { code: "ZMW", name: "Zambian Kwacha" }
];

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
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [qrData, setQrData] = useState("");
  const [showNumpad, setShowNumpad] = useState(false);
  const [qrOptions, setQrOptions] = useState({
    size: 200,
    level: "H",
    includeMargin: true,
    color: "#000000",
    backgroundColor: "#ffffff",
    style: "dots",
  });
  const numpadTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLanguages(["en", "es", "de"]);
  }, []);

  useEffect(() => {
    return () => {
      if (numpadTimeoutRef.current) {
        clearTimeout(numpadTimeoutRef.current);
      }
    };
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
    }\nCurrency: ${isAmountInXRP ? "XRP" : selectedFiat}\nXRP Address: ${formData.xrpAddress}`;
    setQrData(qrContent);
  };

  const shareableContent = `Payment Request - Scan me with Bitbob App\n\nQR Code Data:\n${qrData}\n\nFor more information, visit: https://bitbob.app`;

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

  const renderNumpad = () => (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-lg shadow-lg">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "←"].map((num) => (
        <Button
          key={num}
          variant="outline"
          onClick={() => handleNumpadClick(num === "←" ? "backspace" : num.toString())}
          className="p-4 text-xl"
        >
          {num}
        </Button>
      ))}
    </div>
  );

  const exportQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "bitbob-qr-code.png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const updateQRStyle = (style: string) => {
    setQrOptions(prev => ({ ...prev, style }));
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
                      {renderNumpad()}
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
              
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQRStyle("dots")}
                  >
                    Dots
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQRStyle("squares")}
                  >
                    Squares
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportQRCode}
                  >
                    Export PNG
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative p-4 bg-white rounded-2xl shadow-sm">
                  <QRCode
                    value={qrData}
                    size={qrOptions.size}
                    level={qrOptions.level as "L" | "M" | "Q" | "H"}
                    includeMargin={qrOptions.includeMargin}
                    fgColor={qrOptions.color}
                    bgColor={qrOptions.backgroundColor}
                    renderAs="svg"
                    imageSettings={{
                      src: "/lovable-uploads/04f01451-2fee-4a5b-87b8-4d15deb89578.png",
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              
              <p className="text-gray-600 whitespace-pre-line text-sm">{qrData}</p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <WhatsappShareButton url="https://bitbob.app" title={shareableContent}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <EmailShareButton url="https://bitbob.app" subject="Bitbob Payment Request" body={shareableContent}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <TwitterShareButton url="https://bitbob.app" title={shareableContent}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url="https://bitbob.app" title={shareableContent}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <FacebookShareButton url="https://bitbob.app" quote={shareableContent}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TelegramShareButton url="https://bitbob.app" title={shareableContent}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <RedditShareButton url="https://bitbob.app" title={shareableContent}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
