"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { Section, SectionTitle, Reveal } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitRsvp } from "@/lib/supabase";
import { snowBurst } from "@/components/FirstVisitConfetti";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(1, "Please enter a first name"),
  lastName: z.string().min(1, "Please enter a last name"),
  guests: z.coerce.number().int().min(1, "At least 1 guest").max(10, "Max 10 guests"),
  attending: z.enum(["yes", "no"], { message: "Please pick one" }),
  allergies: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { guests: 1 },
  });

  const attending = watch("attending");

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      await submitRsvp({
        first_name: values.firstName,
        last_name: values.lastName,
        guests: values.guests,
        attending: values.attending === "yes",
        allergies: values.allergies || undefined,
        message: values.message || undefined,
      });
      setSubmitted(true);
      if (values.attending === "yes") snowBurst();
    } catch {
      setError("Something went wrong — please try again in a moment.");
    }
  };

  return (
    <Section id="rsvp">
      <SectionTitle
        eyebrow="will you join us?"
        title="RSVP 🎈"
        subtitle="Kindly respond by August 9 so we can save you a seat at the cottage."
      />

      <Reveal className="mx-auto max-w-xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-8 shadow-snow-lg backdrop-blur-xl md:p-10">
          {/* snow corner decorations */}
          <span aria-hidden className="absolute -left-3 -top-3 text-4xl opacity-60">🍎</span>
          <span aria-hidden className="absolute -bottom-3 -right-3 text-4xl opacity-60">🌹</span>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <span className="text-6xl">🎉</span>
                <h3 className="mt-4 font-display text-3xl font-bold text-snow-royal">
                  Thank you!
                </h3>
                <p className="mt-3 text-lg text-snow-ink/80">
                  We can&apos;t wait to celebrate with you!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -16 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Juan" {...register("firstName")} />
                    {errors.firstName && (
                      <p className="mt-1 text-xs font-semibold text-snow-red-deep">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Dela Cruz" {...register("lastName")} />
                    {errors.lastName && (
                      <p className="mt-1 text-xs font-semibold text-snow-red-deep">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min={1}
                    max={10}
                    {...register("guests")}
                  />
                  {errors.guests && (
                    <p className="mt-1 text-xs font-semibold text-snow-red-deep">{errors.guests.message}</p>
                  )}
                </div>

                <div>
                  <Label>Will you attend?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        ["yes", "Yes, we'll be there! 🍎"],
                        ["no", "Sadly, no 💔"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setValue("attending", value, { shouldValidate: true })
                        }
                        className={cn(
                          "rounded-2xl border-2 px-4 py-3 font-display font-bold transition-all duration-200",
                          attending === value
                            ? "border-snow-red bg-gradient-to-r from-snow-blush to-snow-blue text-snow-royal shadow-snow"
                            : "border-snow-blue/70 bg-white/60 text-snow-ink/70 hover:border-snow-blush"
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" {...register("attending")} />
                  {errors.attending && (
                    <p className="mt-1 text-xs font-semibold text-snow-red-deep">{errors.attending.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="allergies">Food Allergies</Label>
                  <Input
                    id="allergies"
                    placeholder="e.g. peanuts, dairy (optional)"
                    {...register("allergies")}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message for Niane</Label>
                  <Textarea
                    id="message"
                    placeholder="A sweet note for our birthday girl… (optional)"
                    {...register("message")}
                  />
                </div>

                {error && (
                  <p className="rounded-2xl bg-snow-blush/40 p-3 text-sm font-semibold text-snow-red-deep">
                    {error}
                  </p>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send RSVP
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
