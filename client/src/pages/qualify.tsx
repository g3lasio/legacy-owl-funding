
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Lock, Shield, Upload, CheckCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  investmentAmount: z.string().min(1, { message: "Investment amount is required" }),
  investmentType: z.string().min(1, { message: "Investment type is required" }),
  accreditedStatus: z.string().min(1, { message: "Accredited status is required" }),
  investmentHorizon: z.string().min(1, { message: "Investment horizon is required" }),
  creditScore: z.string().min(1, { message: "Credit score range is required" }),
  annualIncome: z.string().min(1, { message: "Annual income range is required" }),
  additionalInfo: z.string().optional(),
  // We'll handle file uploads separately from the form validation
});

// Define the steps for our qualification process
const steps = [
  { id: "investor-profile", title: "Perfil del Inversionista" },
  { id: "credit-profile", title: "Perfil Crediticio" },
  { id: "documentation", title: "Documentación" },
  { id: "review", title: "Revisión" },
];

export default function QualifyPage() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentAmount: "",
      investmentType: "",
      accreditedStatus: "",
      investmentHorizon: "",
      creditScore: "",
      annualIncome: "",
      additionalInfo: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const nextStep = () => {
    // Basic validation for the current step
    let canProceed = true;
    
    // Validate specific fields based on the current step
    if (currentStep === 0) {
      const investorFields = ['investmentAmount', 'investmentType', 'investmentHorizon'];
      investorFields.forEach(field => {
        const value = form.getValues(field as any);
        if (!value) canProceed = false;
      });
    } else if (currentStep === 1) {
      const creditFields = ['creditScore', 'annualIncome', 'accreditedStatus'];
      creditFields.forEach(field => {
        const value = form.getValues(field as any);
        if (!value) canProceed = false;
      });
    }
    
    if (canProceed) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    } else {
      // Trigger validation to show errors
      form.trigger();
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Add all form values
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add file if selected
      if (selectedFile) {
        formData.append('document', selectedFile);
      }
      
      // Enviar el formulario con fetch
      const response = await fetch('/api/qualify', {
        method: 'POST',
        body: formData, // No establecer Content-Type, fetch lo hará automáticamente con FormData
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar el formulario');
      }
      
      // Show success message
      setIsSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        setLocation("/");
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting qualification form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="pt-12 pb-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCheck className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Solicitud Recibida con Éxito</h2>
                <p className="text-lg mb-8 max-w-2xl text-muted-foreground">
                  Gracias por su interés en Legacy Capital Partners. Su solicitud ha sido recibida por nuestro equipo de evaluación exclusiva. 
                  Un representante personal se pondrá en contacto con usted en las próximas 24-48 horas para discutir los siguientes pasos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" onClick={() => setLocation("/")} className="min-w-[150px]">
                    Volver al Inicio
                  </Button>
                  <Button variant="default" className="min-w-[150px]">
                    Ver Programas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Proceso de Precalificación Exclusiva</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete nuestro proceso de evaluación profesional para determinar su elegibilidad para los programas exclusivos de Legacy Capital Partners.
          </p>
        </div>

        <div className="mb-10 mt-6">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center transition-all ${
                  index === currentStep 
                    ? "text-primary" 
                    : index < currentStep 
                      ? "text-primary/70" 
                      : "text-muted-foreground"
                }`}
              >
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center mb-2
                  ${
                    index === currentStep 
                      ? "bg-primary text-white" 
                      : index < currentStep 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                  }
                `}>
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Card className="border-primary/10 shadow-lg">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "Comparta información sobre su experiencia y capacidad de inversión."}
              {currentStep === 1 && "Información sobre su perfil crediticio para evaluación."}
              {currentStep === 2 && "Documentación relevante para verificar su elegibilidad."}
              {currentStep === 3 && "Revise su información antes de enviar su solicitud."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Investor Profile */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="bg-muted/20 p-6 rounded-lg">
                      <FormField
                        control={form.control}
                        name="investmentAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Capacidad de Apalancamiento</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Seleccione su capacidad de apalancamiento" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="less50k">Menos de $50,000</SelectItem>
                                  <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                                  <SelectItem value="250k-1m">$250,000 - $1,000,000</SelectItem>
                                  <SelectItem value="over1m">Más de $1,000,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Monto aproximado al que podría acceder mediante líneas de crédito.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="investmentType"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel className="text-base font-medium">Experiencia en Bienes Raíces</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Seleccione su nivel de experiencia" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">Sin experiencia previa</SelectItem>
                                  <SelectItem value="basic">Básica (1-2 propiedades)</SelectItem>
                                  <SelectItem value="intermediate">Intermedia (3-5 propiedades)</SelectItem>
                                  <SelectItem value="advanced">Avanzada (más de 5 propiedades)</SelectItem>
                                  <SelectItem value="professional">Profesional del sector</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="investmentHorizon"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel className="text-base font-medium">Disponibilidad de Tiempo</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Seleccione su disponibilidad" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="full-time">Tiempo completo</SelectItem>
                                  <SelectItem value="part-time">Tiempo parcial</SelectItem>
                                  <SelectItem value="weekends">Solo fines de semana</SelectItem>
                                  <SelectItem value="minimal">Mínima (inversión pasiva)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Tiempo que podría dedicar a la gestión de inversiones inmobiliarias.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Credit Profile */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="bg-muted/20 p-6 rounded-lg">
                      <FormField
                        control={form.control}
                        name="creditScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Puntaje de Crédito</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Seleccione rango de puntaje" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="excellent">Excelente (750+)</SelectItem>
                                  <SelectItem value="very-good">Muy Bueno (700-749)</SelectItem>
                                  <SelectItem value="good">Bueno (650-699)</SelectItem>
                                  <SelectItem value="fair">Regular (600-649)</SelectItem>
                                  <SelectItem value="poor">Bajo (Menos de 600)</SelectItem>
                                  <SelectItem value="not-sure">No estoy seguro</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Esta información nos ayuda a evaluar la viabilidad del programa para usted.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="annualIncome"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel className="text-base font-medium">Ingreso Anual</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Seleccione rango de ingresos" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="less50k">Menos de $50,000</SelectItem>
                                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                                  <SelectItem value="over500k">Más de $500,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accreditedStatus"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel className="text-base font-medium">Calificación para Programa Legacy</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Seleccione estado" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="legacy-founder">Legacy Founder</SelectItem>
                                  <SelectItem value="legacy-vip">Legacy VIP</SelectItem>
                                  <SelectItem value="legacy-executive">Legacy Executive</SelectItem>
                                  <SelectItem value="not-sure">No estoy seguro / Deseo evaluación</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Seleccione la categoría que cree que mejor se adapta a su perfil, o elija "Deseo evaluación" para que nuestro equipo le asigne el nivel adecuado.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Documentation */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-muted/20 p-6 rounded-lg">
                      <div className="mb-6">
                        <FormLabel htmlFor="document-upload" className="text-base font-medium">Documentos Financieros (opcional)</FormLabel>
                        <div className="mt-2 border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
                          <Input
                            id="document-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <label htmlFor="document-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Upload className="h-8 w-8 text-primary" />
                              </div>
                              <span className="text-base font-medium mb-1">
                                {selectedFile ? selectedFile.name : "Haga clic para cargar un documento"}
                              </span>
                              <p className="text-sm text-muted-foreground mt-1">
                                PDF, DOC, DOCX, JPG o PNG (máx. 10MB)
                              </p>
                            </div>
                          </label>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center">
                          <Lock className="h-4 w-4 mr-1" />
                          Sus documentos están protegidos con encriptación de nivel bancario.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Información Adicional</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Proporcione cualquier información adicional que considere relevante para su aplicación"
                                className="h-32 resize-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-muted/20 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Resumen de su Solicitud</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Perfil del Inversionista</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm font-medium">Capacidad de Apalancamiento</p>
                              <p className="text-base">
                                {form.watch("investmentAmount") === "less50k" && "Menos de $50,000"}
                                {form.watch("investmentAmount") === "50k-250k" && "$50,000 - $250,000"}
                                {form.watch("investmentAmount") === "250k-1m" && "$250,000 - $1,000,000"}
                                {form.watch("investmentAmount") === "over1m" && "Más de $1,000,000"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Experiencia en Bienes Raíces</p>
                              <p className="text-base">
                                {form.watch("investmentType") === "none" && "Sin experiencia previa"}
                                {form.watch("investmentType") === "basic" && "Básica (1-2 propiedades)"}
                                {form.watch("investmentType") === "intermediate" && "Intermedia (3-5 propiedades)"}
                                {form.watch("investmentType") === "advanced" && "Avanzada (más de 5 propiedades)"}
                                {form.watch("investmentType") === "professional" && "Profesional del sector"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Disponibilidad de Tiempo</p>
                              <p className="text-base">
                                {form.watch("investmentHorizon") === "full-time" && "Tiempo completo"}
                                {form.watch("investmentHorizon") === "part-time" && "Tiempo parcial"}
                                {form.watch("investmentHorizon") === "weekends" && "Solo fines de semana"}
                                {form.watch("investmentHorizon") === "minimal" && "Mínima (inversión pasiva)"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Perfil Crediticio</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm font-medium">Puntaje de Crédito</p>
                              <p className="text-base">
                                {form.watch("creditScore") === "excellent" && "Excelente (750+)"}
                                {form.watch("creditScore") === "very-good" && "Muy Bueno (700-749)"}
                                {form.watch("creditScore") === "good" && "Bueno (650-699)"}
                                {form.watch("creditScore") === "fair" && "Regular (600-649)"}
                                {form.watch("creditScore") === "poor" && "Bajo (Menos de 600)"}
                                {form.watch("creditScore") === "not-sure" && "No estoy seguro"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Ingreso Anual</p>
                              <p className="text-base">
                                {form.watch("annualIncome") === "less50k" && "Menos de $50,000"}
                                {form.watch("annualIncome") === "50k-100k" && "$50,000 - $100,000"}
                                {form.watch("annualIncome") === "100k-250k" && "$100,000 - $250,000"}
                                {form.watch("annualIncome") === "250k-500k" && "$250,000 - $500,000"}
                                {form.watch("annualIncome") === "over500k" && "Más de $500,000"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Programa Legacy</p>
                              <p className="text-base">
                                {form.watch("accreditedStatus") === "legacy-founder" && "Legacy Founder"}
                                {form.watch("accreditedStatus") === "legacy-vip" && "Legacy VIP"}
                                {form.watch("accreditedStatus") === "legacy-executive" && "Legacy Executive"}
                                {form.watch("accreditedStatus") === "not-sure" && "Pendiente de evaluación"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Documentación</h4>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Documentos Adjuntos</p>
                            <p className="text-base">{selectedFile ? selectedFile.name : "Ningún documento adjunto"}</p>
                          </div>
                          
                          {form.watch("additionalInfo") && (
                            <div className="mt-4">
                              <p className="text-sm font-medium">Información Adicional</p>
                              <p className="text-base">{form.watch("additionalInfo")}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-lg flex items-start border border-primary/10">
                      <Shield className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-base font-medium mb-1">Declaración de Privacidad y Confidencialidad</h3>
                        <p className="text-sm text-muted-foreground">
                          Al enviar este formulario, usted acepta que un representante de Legacy Capital Partners se ponga en contacto con usted para discutir oportunidades de inversión. 
                          Toda la información proporcionada será tratada con estricta confidencialidad según nuestras políticas. 
                          Consulte nuestra <a href="/privacy" className="underline hover:text-primary">Política de Privacidad</a> y <a href="/terms" className="underline hover:text-primary">Términos de Servicio</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    onClick={prevStep} 
                    variant="outline"
                    disabled={currentStep === 0}
                    className="min-w-[120px]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="min-w-[120px]"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="min-w-[120px]"
                    >
                      {isSubmitting ? "Procesando..." : "Enviar Solicitud"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
