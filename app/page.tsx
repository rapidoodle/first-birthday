import LoadingScreen from "@/components/LoadingScreen";
import FairyNav from "@/components/FairyNav";
import FloatingFairy from "@/components/FloatingFairy";
import CursorSparkles from "@/components/CursorSparkles";
import MusicToggle from "@/components/MusicToggle";
import FirstVisitConfetti from "@/components/FirstVisitConfetti";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Memories from "@/components/Memories";
import Details from "@/components/Details";
import Rsvp from "@/components/Rsvp";
import Gallery from "@/components/Gallery";
import Gifts from "@/components/Gifts";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <LoadingScreen />
      <FirstVisitConfetti />
      <FloatingFairy />
      <CursorSparkles />
      <FairyNav />
      <MusicToggle />
      <Hero />
      <Story />
      <Memories />
      <Details />
      <Rsvp />
      <Gallery />
      <Gifts />
      <Guestbook />
      <Footer />
    </main>
  );
}
