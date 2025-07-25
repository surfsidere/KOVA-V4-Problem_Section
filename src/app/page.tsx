import { InteractiveDiagnosisDeck } from "@/components/interactive-diagnosis-deck";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-12 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4">
            Problemas Comunes en Beneficios Corporativos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Identifica los principales desafíos que enfrentan las empresas en la gestión de beneficios para empleados.
          </p>
        </div>
        <InteractiveDiagnosisDeck />
      </div>
    </main>
  );
}
