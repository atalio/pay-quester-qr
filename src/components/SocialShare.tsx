
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

interface SocialShareProps {
  url: string;
  title: string;
  emailSubject?: string;
  emailBody?: string;
}

export const SocialShare = ({ url, title, emailSubject, emailBody }: SocialShareProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <EmailShareButton url={url} subject={emailSubject || title} body={emailBody || title}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <FacebookShareButton url={url} hashtag="#bitbob">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <RedditShareButton url={url} title={title}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </div>
  );
};
