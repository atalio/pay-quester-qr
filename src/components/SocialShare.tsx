// SocialShare.tsx
import React from "react";
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
    const baseUrl = "https://bitbob.app/sign/";
    // Build query parameters with fixed variable names
    const params = new URLSearchParams({
      Amount: amount || "",
      addr: xrpAddress || "",
      Name: merchantName || "",
      Ident: productId || "",
      giphy: "26", // Fixed to number 26
      purpose: productName || "",
    });
    const url = `${baseUrl}?${params.toString().replace(/%20/g, "+")}`;
    console.debug("[Share] Generated Bitbob URL:", url);
    return url;
  };

  const generateShareText = () => {
    const currency = isAmountInXRP ? "XRP" : selectedFiat;
    const baseText = `${merchantName || "Someone"} ${t("is requesting")} ${currency}${amount}`;
    const purposeText = productName ? ` ${t("for")} ${productName}` : "";
    const finalText = `${baseText}${purposeText}. ${t("First verify if this request is expected and valid and if you are sure, please click on URL to proceed with payment.")}\n\n${constructBitbobUrl()}`;
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
