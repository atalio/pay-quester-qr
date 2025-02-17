
import { useState } from "react";
import { QRCode } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
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

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    merchantName: "",
    productName: "",
    productId: "",
    amount: "",
    xrpAddress: "",
  });
  const [isAmountInXRP, setIsAmountInXRP] = useState(true);
  const [qrData, setQrData] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateQRCode = () => {
    if (!formData.amount || !formData.xrpAddress) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bitbob Payment Request</h1>
          <p className="text-muted-foreground">Generate a QR code for payment requests</p>
        </div>

        <Card className="p-6 space-y-6 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-in">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="xrpAddress">XRP Address (Required)</Label>
              <Input
                id="xrpAddress"
                name="xrpAddress"
                value={formData.xrpAddress}
                onChange={handleInputChange}
                placeholder="Enter your XRP address"
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Required)</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder={`Amount in ${isAmountInXRP ? "XRP" : "USD"}`}
                  className="transition-all focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isAmountInXRP}
                    onCheckedChange={setIsAmountInXRP}
                  />
                  <Label>XRP</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchantName">Merchant Name (Optional)</Label>
              <Input
                id="merchantName"
                name="merchantName"
                value={formData.merchantName}
                onChange={handleInputChange}
                placeholder="Enter merchant name"
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">Product Name (Optional)</Label>
              <Input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              onClick={generateQRCode}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Generate QR Code
            </Button>
          </div>
        </Card>

        {qrData && (
          <Card className="p-6 space-y-6 bg-white/80 backdrop-blur-sm shadow-lg animate-fade-up">
            <div className="text-center space-y-4">
              <p className="text-gray-700 font-medium">Payment Request - Scan me with Bitbob App</p>
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
