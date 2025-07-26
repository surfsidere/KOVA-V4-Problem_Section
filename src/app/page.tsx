import { InteractiveDiagnosisDeck } from "@/components/interactive-diagnosis-deck";
import { SolutionSection } from "@/components/solution-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-12 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4">
            Las asistencias tradicionales se han quedado atrás.
          </h1>
        </div>
        <InteractiveDiagnosisDeck />
        <div className="text-center mt-24">
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Sus ofertas genéricas y procesos confusos no generan valor ni conexión, perdiendo relevancia frente a las necesidades del usuario moderno.
          </p>
        </div>
        <SolutionSection />
      </div>
    </main>
  );
}
