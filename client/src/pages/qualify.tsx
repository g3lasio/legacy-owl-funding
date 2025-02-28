import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";

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

export default function QualifyPage() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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
      
      // In a real implementation, you'd use formData with fetch
      // For this example, we'll just simulate the API call
      await apiRequest("POST", "/api/qualify", values);
      
      // Show success message
      setIsSuccess(true);
      
      // In a real app, you might redirect after a delay
      setTimeout(() => {
        setLocation("/dashboard");
      }, 3000);
      
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
          <Card className="border-green-500">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">¡Solicitud Recibida!</h2>
                <p className="text-lg mb-6">
                  Gracias por su interés. Hemos recibido su solicitud y la evaluaremos a la brevedad.
                  Un miembro de nuestro equipo se pondrá en contacto con usted en las próximas 24-48 horas.
                </p>
                <Button onClick={() => setLocation("/")}>
                  Volver al Inicio
                </Button>
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
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Calificación de Inversor</CardTitle>
            <CardDescription className="text-center">
              Complete el siguiente formulario para evaluar su elegibilidad para nuestros programas de inversión.
              Todos los datos proporcionados son confidenciales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Perfil del Inversionista</h3>
                    
                    <FormField
                      control={form.control}
                      name="investmentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacidad de Apalancamiento</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
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
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experiencia en Bienes Raíces</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
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
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investmentHorizon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disponibilidad de Tiempo</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
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
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Perfil Crediticio</h3>

                    <FormField
                      control={form.control}
                      name="creditScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Puntaje de Crédito</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
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
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="annualIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ingreso Anual</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
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
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accreditedStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calificación para Programa Legacy</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="legacy-vip-platinum">Legacy Founder</SelectItem>
                                <SelectItem value="legacy-vip-gold">Legacy VIP </SelectItem>
                                <SelectItem value="legacy-vip-silver">Legacy Executive </SelectItem>
              
                         <SelectItem value="not-sure">No estoy seguro / Deseo evaluación</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Seleccione la categoría que cree que mejor se adapta a su perfil, o elija "Deseo evaluación" para que nuestro equipo le asigne el nivel adecuado.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Documentación Adicional</h3>
                    
                    <div className="mb-4">
                      <FormLabel htmlFor="document-upload">Documentos Financieros (opcional)</FormLabel>
                      <div className="mt-1 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Input
                          id="document-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="document-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <span className="text-sm font-medium">
                              {selectedFile ? selectedFile.name : "Haga clic para cargar un documento"}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF, DOC, DOCX, JPG o PNG (máx. 10MB)
                            </p>
                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Puede proporcionar documentos financieros relevantes, como estados financieros, declaraciones de impuestos o informes de crédito.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Información Adicional</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Proporcione cualquier información adicional que considere relevante para su aplicación"
                              className="h-24 resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-6 flex items-start">
                  <AlertCircle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Al enviar este formulario, usted acepta que un representante de Legacy Capital Partners se ponga en contacto con usted para discutir oportunidades de inversión. 
                    Consulte nuestra <a href="/privacy" className="underline hover:text-primary">Política de Privacidad</a> y <a href="/terms" className="underline hover:text-primary">Términos de Servicio</a>.
                  </p>
                </div>

                <div className="text-center pt-4">
                  <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
                    {isSubmitting ? "Procesando..." : "Enviar Solicitud"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}