import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { FluidScrollHero } from "@/components/sections/fluid-scroll-hero";
import { PremiumSolutionSection } from "@/components/sections/premium-solution-section";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        {/* Fluid Scroll Hero with Original Cards */}
        <FluidScrollHero 
          title="Las asistencias tradicionales se han quedado atrás."
          subtitle="Sus ofertas genéricas y procesos confusos no generan valor ni conexión, perdiendo relevancia frente a las necesidades del usuario moderno."
        />

        {/* Premium Solution with Instituciones/Aliados Toggle */}
        <PremiumSolutionSection />
      </main>
    </SmoothScrollProvider>
  );
}
