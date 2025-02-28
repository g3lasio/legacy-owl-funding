
import React from 'react';
import Image from './ui/image';
import { motion } from "framer-motion";

export default function ImageExample() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestras Propiedades
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oportunidades de inversión exclusivas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ejemplo con la imagen por defecto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image height="240px" className="mb-4" />
            <h3 className="text-xl font-bold mt-2">Propiedad Premium</h3>
            <p className="text-muted-foreground">Miami, Florida</p>
          </motion.div>
          
          {/* Ejemplo con imagen personalizada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image 
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" 
              height="240px" 
              className="mb-4"
            />
            <h3 className="text-xl font-bold mt-2">Residencia Exclusiva</h3>
            <p className="text-muted-foreground">Los Ángeles, California</p>
          </motion.div>
          
          {/* Otro ejemplo con imagen personalizada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image 
              image="https://images.unsplash.com/photo-1605146769289-440113cc3d00" 
              height="240px" 
              className="mb-4"
            />
            <h3 className="text-xl font-bold mt-2">Condominio de Lujo</h3>
            <p className="text-muted-foreground">Nueva York, NY</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
