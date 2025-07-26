"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";

export const SolutionSection = () => {
  const [isInstituciones, setIsInstituciones] = useState(true);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4">
        Somos La Solución:
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Más conexión. Más uso. Más valor.
      </p>
      <div className="flex items-center justify-center space-x-2 mt-8">
        <label
          htmlFor="toggle-switch"
          className={`font-bold ${
            isInstituciones ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Instituciones
        </label>
        <Switch
          id="toggle-switch"
          checked={!isInstituciones}
          onCheckedChange={() => setIsInstituciones(!isInstituciones)}
        />
        <label
          htmlFor="toggle-switch"
          className={`font-bold ${
            !isInstituciones ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Aliados
        </label>
      </div>
      <motion.div
        className="mt-8"
        key={isInstituciones ? "instituciones" : "aliados"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isInstituciones ? (
          <div>
            <h3 className="text-2xl font-bold">Para Instituciones</h3>
            <p className="text-lg text-muted-foreground mt-4">
              Aquí va el contenido para las instituciones.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold">Para Aliados</h3>
            <p className="text-lg text-muted-foreground mt-4">
              Aquí va el contenido para los aliados.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
