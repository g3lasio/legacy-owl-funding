
import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Dirección de email inválida"),
  phone: z.string().min(10, "Por favor ingrese un número telefónico válido"),
  creditScore: z.string().min(1, "Por favor seleccione un rango de puntaje crediticio"),
  investmentExperience: z.string().min(1, "Por favor seleccione su nivel de experiencia"),
  investmentGoals: z.string().min(1, "Por favor seleccione su objetivo de inversión"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar los términos y condiciones" }),
  }),
});

export default function QualifyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [qualified, setQualified] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      creditScore: "",
      investmentExperience: "",
      investmentGoals: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Lógica simple para determinar si el usuario califica
    // En una implementación real, esto podría ser más complejo o utilizar una API
    const qualifies = values.creditScore === "700-749" || 
                      values.creditScore === "750-799" ||
                      values.creditScore === "800+";
                      
    setQualified(qualifies);
    setSubmitted(true);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Verifique su Elegibilidad
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Complete este breve formulario para verificar si califica para nuestro programa exclusivo de inversiones inmobiliarias.
          </p>
        </div>

        {!submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Formulario de Calificación</CardTitle>
                <CardDescription>
                  La información proporcionada será utilizada únicamente para evaluar su elegibilidad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ingrese su nombre completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="nombre@ejemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="Su número telefónico" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="creditScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Puntaje Crediticio</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione su rango de puntaje crediticio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Below 600">Menos de 600</SelectItem>
                              <SelectItem value="600-649">600-649</SelectItem>
                              <SelectItem value="650-699">650-699</SelectItem>
                              <SelectItem value="700-749">700-749</SelectItem>
                              <SelectItem value="750-799">750-799</SelectItem>
                              <SelectItem value="800+">800+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="investmentExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experiencia en Inversiones</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione su nivel de experiencia" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="None">Ninguna</SelectItem>
                              <SelectItem value="Beginner">Principiante</SelectItem>
                              <SelectItem value="Intermediate">Intermedio</SelectItem>
                              <SelectItem value="Advanced">Avanzado</SelectItem>
                              <SelectItem value="Expert">Experto</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="investmentGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Objetivos de Inversión</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione su objetivo principal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Passive Income">Ingresos Pasivos</SelectItem>
                              <SelectItem value="Capital Growth">Crecimiento de Capital</SelectItem>
                              <SelectItem value="Diversification">Diversificación</SelectItem>
                              <SelectItem value="Tax Benefits">Beneficios Fiscales</SelectItem>
                              <SelectItem value="Retirement Planning">Planificación de Jubilación</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Acepto los términos y condiciones y la política de privacidad.
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Verificar Elegibilidad</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card>
              <CardHeader>
                <CardTitle>{qualified ? "¡Felicidades!" : "Gracias por su interés"}</CardTitle>
              </CardHeader>
              <CardContent>
                {qualified ? (
                  <div className="space-y-4">
                    <p className="text-lg">
                      Basado en la información proporcionada, usted califica para nuestro programa exclusivo de inversiones inmobiliarias.
                    </p>
                    <p>
                      Uno de nuestros asesores se pondrá en contacto con usted pronto para discutir las oportunidades disponibles y los próximos pasos.
                    </p>
                    <Button 
                      onClick={() => window.location.href = "/#program"} 
                      className="mt-4"
                    >
                      Conocer más sobre nuestro programa
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg">
                      Basado en la información proporcionada, actualmente no cumple con todos los requisitos para nuestro programa.
                    </p>
                    <p>
                      Sin embargo, tenemos otras opciones que podrían ser adecuadas para usted. Un asesor se pondrá en contacto para discutir alternativas.
                    </p>
                    <Button 
                      onClick={() => window.location.href = "/#contact"} 
                      className="mt-4"
                    >
                      Contactar a un asesor
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
