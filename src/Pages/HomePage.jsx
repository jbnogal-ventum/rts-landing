import HeroHomePage from "../Components/Hero/HeroHomePage/HeroHomePage";
import HorizontalCarousel from "../Components/Carousel/HorizontalCarousel";
import Story from "../Components/Story/Story";
import Banner from "../Components/Banner/Banner";
import Marquee from "../Components/Marquee/Marquee";
import Hub from "../Components/Hub/Hub";
import Location from "../Components/Location/Location";

import bannerImg from "../assets/Banner.jpeg";

export default function HomePage({ onPhase }) {


  return (
    <main className="bg-background">
        
     <div style={{height: "1px"}} />
      <HeroHomePage onPhase={onPhase} />
 
      <HorizontalCarousel />
      <Marquee />

      <div >
        <Story />
        <Hub />
        <Location/>
      </div>

      <Banner
        variant="image"
        backgroundImage={bannerImg}
        overlay={50}
        titleDesktop={"LET'S SPARK YOUR\nINDUSTRIAL BRILLIANCE"}
        titleMobile={"LET'S SPARK\nYOUR INDUSTRIAL\nBRILLIANCE"}
        bodyDesktop={
          "Every challenge is an opportunity. Share yours, and\nlet's explore how to bring your vision to life."
        }
        bodyMobile={
          "Every challenge is an opportunity.\nShare yours, and let's explore how to\nbring your vision to life."
        }
        buttons={[
          { children: "Book a meeting now", onClick: () => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank"), variant: "filled-dark" },
        ]}
      />
    </main>
  );
}