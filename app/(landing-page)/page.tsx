import Header from "@/components/(landing-page)/layout/index";
import Footer from "@/components/(landing-page)/layout/footer";
import Achievements from "@/components/(landing-page)/sections/achievements";
import Brand from "@/components/(landing-page)/sections/brand";
import CreativeMind from "@/components/(landing-page)/sections/creative-mind";
import CustomerStories from "@/components/(landing-page)/sections/customer-stories";
import Faq from "@/components/(landing-page)/sections/faq";
import HeroSection from "@/components/(landing-page)/sections/hero";
import Innovation from "@/components/(landing-page)/sections/innovation";
import OnlinePresence from "@/components/(landing-page)/sections/online-presence";
import Solutions from "@/components/(landing-page)/sections/solution";
import Subscription from "@/components/(landing-page)/sections/subscription";
import WebResult from "@/components/(landing-page)/sections/web-result";
import { checkNoSession } from "@/utils/check-session";

export default async function Page() {
  await checkNoSession();
  return (
    <div className="relative w-full px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10 overflow-x-hidden">
      <Header />
      <div className="container">
        <main className="flex flex-col">
          <HeroSection />
          <Brand />
          <WebResult />
          {/* No problem in above */}

          <Innovation />
          <OnlinePresence />
          <CreativeMind />
          <CustomerStories />

          {/* No problem in the below */}

          <Subscription />
          <Faq />
          <Achievements />
          <Solutions />
        </main>
        <Footer />
      </div>
    </div>
  );
}
