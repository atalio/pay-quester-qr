
import { Youtube, Globe, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-4 mt-12 bg-white/80 backdrop-blur-sm border-t">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://apps.apple.com/nl/app/bitbob/id6463562212" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-[40px]"
            >
              <img 
                src="/app-store-badge.png" 
                alt="Download on the App Store" 
                className="h-full w-auto"
              />
            </a>
            <a 
              href="https://play.google.com/store/apps/details?id=com.bitbob.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-[40px]"
            >
              <img 
                src="/google-play-badge.png" 
                alt="Get it on Google Play" 
                className="h-full w-auto"
              />
            </a>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://bitbob.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <Globe className="h-6 w-6" />
            </a>
            <a 
              href="https://www.youtube.com/@BitbobApp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/company/106025933" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
