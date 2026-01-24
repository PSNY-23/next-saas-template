import Image from "next/image";
import { SiteLogo } from "../site-logo";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center text-center gap-2">
       <SiteLogo className="" />
      <div>
        <p className="text-xl font-bold">{title}</p>
      {subtitle && <p className="mt-1 text-sm">{subtitle}</p>}   
      </div> 
    </div>
  );
};
