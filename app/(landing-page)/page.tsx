import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer/Footer'
import Achievements from "@/components/home/achievements";
import Brand from "@/components/home/brand";
import CreativeMind from "@/components/home/creative-mind";
import CustomerStories from "@/components/home/customer-stories";
import Faq from "@/components/home/faq";
import HeroSection from "@/components/home/hero";
import Innovation from "@/components/home/innovation";
import OnlinePresence from "@/components/home/online-presence";
import Solutions from "@/components/home/solution";
import Subscription from "@/components/home/subscription";
import WebResult from "@/components/home/web-result";
import { checkNoSession } from '@/utils/check-session';


export default async function Page() {
  
  await checkNoSession();
  return (
    <>
     <Header />
        <main className='mx-auto'>
          <HeroSection/>
          <Brand/>
          <WebResult/>
          <Innovation/>
          <OnlinePresence/>
          <CreativeMind/>
          <CustomerStories/>
          <Subscription/>
          <Faq/>
          <Achievements/>
          <Solutions/>
        </main>
      <Footer />
    </>
     
   
  );
}
