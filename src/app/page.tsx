import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { IntroSection } from "@/components/sections/intro-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { ConnectionMethodsBanner } from "@/components/sections/connection-methods-banner";
import { FinalCTASection } from "@/components/sections/final-cta-section";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        {/* Hero/Intro Section with Cards */}
        <IntroSection 
          title="Las asistencias tradicionales se han quedado atrás."
          subtitle="Sus ofertas genéricas y procesos confusos no generan valor ni conexión, perdiendo relevancia frente a las necesidades del usuario moderno."
        />

        {/* Solution Reveal */}
        <SolutionSection 
          title="Somos La Solución"
          subtitle="Mas Conexión, Mas Uso, Mas Valor"
        />

        {/* Connection Methods */}
        <ConnectionMethodsBanner className="py-16" />

        {/* Final CTA with Toggle */}
        <FinalCTASection />
      </main>
    </SmoothScrollProvider>
  );
}
