import HeroSection from "./sections/Hero";
import KummattiSection from "./sections/Kummatti";
import AboutSection from "./sections/About";
import KeralaTourismSection from "./sections/KeralaTourism";
import CountdownSection from "./sections/CountdownSection";
import PanchavadyamSection from "./sections/Panchavadyam";
import KarnanMemorial from "./sections/KarnanMemorial";
// import VideoSection from "./sections/VideoHighlights"; // Hidden for now
import GallerySection from "./sections/Gallery";
// import ElephantsSection from "./sections/Elephants"; // Hidden for now
import VedikkettuSection from "./sections/Vedikkettu";
// import ScheduleSection from "./sections/Schedule"; // Hidden for now
import Vela2026Section from "./sections/Vela2026";
import LocationSection from "./sections/Location";
import SupportVelaSection from "./sections/SupportVela";

export default function OldWebsitePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden bg-[#0F0F0F] text-[#F7F3E9] selection:bg-[#D4AF37] selection:text-[#0F0F0F]">
      <HeroSection />
      <KummattiSection />
      <CountdownSection />
      <AboutSection />
      <KeralaTourismSection />
      {/* <ScheduleSection /> */}
      <Vela2026Section />
      <PanchavadyamSection />
      {/* <ElephantsSection /> */}
      <KarnanMemorial />
      <VedikkettuSection />
      {/* <VideoSection /> */}
      <GallerySection />
      <LocationSection />
      <SupportVelaSection />
    </main>
  );
}
