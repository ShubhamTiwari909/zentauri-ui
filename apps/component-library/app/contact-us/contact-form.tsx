"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Card } from "@zentauri-ui/zentauri-components/ui/card";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { submitContactForm, type ContactFormActionState } from "./actions";
import { contactFormSchema, type ContactFormValues } from "./schema";

const initialState: ContactFormActionState = {
  ok: false,
  message: "",
};

export function ContactForm() {
  const [actionState, setActionState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitContactForm(values);
      setActionState(result);

      if (result.ok) {
        reset();
      }
    });
  });

  return (
    <Card appearance="glass" rounded="lg" size="lg">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-lg font-semibold text-white">Send a Message</h2>
      </div>
      <div className="flex flex-1 flex-col">
        <form className="flex flex-col gap-5 pt-1" onSubmit={onSubmit}>
          <Input
            label="Name"
            placeholder="Your name"
            autoComplete="name"
            appearance={errors.name ? "error" : "default"}
            errorMessage={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            autoComplete="email"
            type="email"
            appearance={errors.email ? "error" : "default"}
            errorMessage={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Phone"
            placeholder="Optional"
            autoComplete="tel"
            appearance={errors.phone ? "error" : "default"}
            errorMessage={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Subject"
            placeholder="What should we talk about?"
            appearance={errors.subject ? "error" : "default"}
            errorMessage={errors.subject?.message}
            {...register("subject")}
          />

          <Input
            as="textarea"
            label="Message"
            placeholder="Share the details here."
            rows={7}
            appearance={errors.message ? "error" : "default"}
            errorMessage={errors.message?.message}
            {...register("message")}
          />

          {actionState.message ? (
            <p
              className={
                actionState.ok
                  ? "rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                  : "rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
              }
              role="status"
            >
              {actionState.message}
            </p>
          ) : null}

          <Button
            appearance="gradient-teal"
            className="w-full md:w-fit"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Sending..." : "Send message"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
