import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  investmentAmount: z.string().min(1, { message: "Investment amount is required" }),
  investmentType: z.string().min(1, { message: "Investment type is required" }),
  accreditedStatus: z.string().min(1, { message: "Accredited status is required" }),
  investmentHorizon: z.string().min(1, { message: "Investment horizon is required" }),
});

export default function QualifyPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentAmount: "",
      investmentType: "",
      accreditedStatus: "",
      investmentHorizon: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await apiRequest("POST", "/api/qualify", values);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting qualification form:", error);
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Investor Qualification</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="investmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Planned Investment Amount</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select investment amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="less50k">Less than $50,000</SelectItem>
                            <SelectItem value="50k-250k">$50,000 - $250,000</SelectItem>
                            <SelectItem value="250k-1m">$250,000 - $1,000,000</SelectItem>
                            <SelectItem value="over1m">Over $1,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Type Interest</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private-equity">Private Equity</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="venture-capital">Venture Capital</SelectItem>
                            <SelectItem value="debt">Private Debt</SelectItem>
                            <SelectItem value="multiple">Multiple Strategies</SelectItem>
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
                      <FormLabel>Accredited Investor Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select accredited status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accredited">Accredited Investor</SelectItem>
                            <SelectItem value="qualified">Qualified Purchaser</SelectItem>
                            <SelectItem value="non-accredited">Non-Accredited</SelectItem>
                            <SelectItem value="not-sure">Not Sure</SelectItem>
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
                      <FormLabel>Investment Time Horizon</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time horizon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="text-center pt-4">
                  <Button type="submit" size="lg">
                    Submit and Continue
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