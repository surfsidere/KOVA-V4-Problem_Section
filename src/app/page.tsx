import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { IntroSection } from "@/components/sections/intro-section";
import { ProblemCardsContainer } from "@/components/sections/problem-cards-container";
import { SolutionSection } from "@/components/sections/solution-section";
import { ConnectionMethodsBanner } from "@/components/sections/connection-methods-banner";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        {/* Hero/Intro Section */}
        <IntroSection 
          title="Las asistencias tradicionales se han quedado atrás."
          subtitle="Sus ofertas genéricas y procesos confusos no generan valor ni conexión, perdiendo relevancia frente a las necesidades del usuario moderno."
        />

        {/* Problem Cards with Vacuum Effect */}
        <ProblemCardsContainer />

        {/* Solution Reveal */}
        <SolutionSection 
          title="Somos La Solución"
          subtitle="Transformamos la experiencia de beneficios corporativos con tecnología inteligente, personalización avanzada y un enfoque centrado en el usuario que genera valor real para empleados y empresas."
        />

        {/* Connection Methods */}
        <ConnectionMethodsBanner />
      </main>
    </SmoothScrollProvider>
  );
}
