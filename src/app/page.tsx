import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlatformTransparency from "@/components/features/PlatformTransparency";
import EfficiencyMission from "@/components/features/EfficiencyMission";
import TheAdvantage from "@/components/features/TheAdvantage";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="transparency">
        <PlatformTransparency />
      </div>
      <div id="efficiency">
        <EfficiencyMission />
      </div>
      <div id="how-it-works">
        <TheAdvantage />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact-us">
        <Footer />
      </div>
    </main>
  );
}
