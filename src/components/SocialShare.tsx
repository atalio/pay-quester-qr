
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
import { useTranslation } from "react-i18next";

interface SocialShareProps {
  url: string;
  title: string;
  amount: string;
  merchantName: string;
  xrpAddress: string;
  productId: string;
  productName: string;
  isAmountInXRP: boolean;
  selectedFiat: string;
}

export const SocialShare = ({
  amount,
  merchantName,
  xrpAddress,
  productId,
  productName,
  isAmountInXRP,
  selectedFiat,
}: SocialShareProps) => {
  const { t } = useTranslation();
  
  const constructBitbobUrl = () => {
    // Format the URL according to the Bitbob native app specification
    const baseUrl = "https://bitbob.app/sign/";
    const currency = isAmountInXRP ? "XRP" : selectedFiat;
    
    // Build query parameters matching the iOS/Android app format
    const params = new URLSearchParams({
      Amount: amount || "",
      addr: merchantName || "", // Using merchantName instead of firstname
      Name: xrpAddress || "",
      Ident: productId || "",
      giphy: "", // We don't have GIF support, so leaving blank
      purpose: productName || "",
    });

    const url = `${baseUrl}?${params.toString().replace(/%20/g, "+")}`;
    console.debug("[Share] Generated Bitbob URL:", url);
    return url;
  };

  const generateShareText = () => {
    const currency = isAmountInXRP ? "XRP" : selectedFiat;
    const baseText = `${merchantName || "Someone"} is requesting ${currency}${amount}`;
    const purposeText = productName ? ` for ${productName}` : "";
    const finalText = `${baseText}${purposeText}. Please click on URL and complete payment.\n\n${constructBitbobUrl()}`;
    
    console.debug("[Share] Generated share text:", finalText);
    return finalText;
  };

  const shareText = generateShareText();
  const bitbobUrl = constructBitbobUrl();

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      <WhatsappShareButton url={bitbobUrl} title={shareText}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <EmailShareButton url={bitbobUrl} subject="Bitbob Payment Request" body={shareText}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <TwitterShareButton url={bitbobUrl} title={shareText}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={bitbobUrl} title={shareText}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <FacebookShareButton url={bitbobUrl} hashtag="#bitbob">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={bitbobUrl} title={shareText}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <RedditShareButton url={bitbobUrl} title={shareText}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </div>
  );
};

