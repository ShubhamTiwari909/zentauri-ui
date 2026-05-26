"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@zentauri-ui/zentauri-components/hooks/useLocalStorage";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Card } from "@zentauri-ui/zentauri-components/ui/card";
import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { HiCheckCircle } from "react-icons/hi2";

import { submitContactForm, type ContactFormActionState } from "./actions";
import { contactFormSchema, type ContactFormValues } from "./schema";

const initialState: ContactFormActionState = {
  ok: false,
  message: "",
};

const contactSubmissionStorageKey = "zentauri-contact-submission";
const contactSubmissionWindowMs = 24 * 60 * 60 * 1000;

type ContactSubmissionMarker = {
  expiresAt: number;
};

function subscribeToClientReady(onStoreChange: () => void) {
  const timeoutId = window.setTimeout(onStoreChange, 0);
  return () => {
    window.clearTimeout(timeoutId);
  };
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ContactForm() {
  const [actionState, setActionState] = useState(initialState);
  const hasMounted = useSyncExternalStore(
    subscribeToClientReady,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isPending, startTransition] = useTransition();
  const [submissionMarker, setSubmissionMarker, clearSubmissionMarker] =
    useLocalStorage(
      contactSubmissionStorageKey,
      null as ContactSubmissionMarker | null,
    );

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
        setSubmissionMarker({
          expiresAt: Date.now() + contactSubmissionWindowMs,
        });
        reset();
      }
    });
  });

  useEffect(() => {
    if (!submissionMarker) {
      return;
    }

    const remainingMs = submissionMarker.expiresAt - Date.now();
    const timeoutId = window.setTimeout(
      () => {
        clearSubmissionMarker();
      },
      Math.max(0, remainingMs),
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [clearSubmissionMarker, submissionMarker]);

  if (hasMounted && submissionMarker) {
    return (
      <Card appearance="glass" rounded="lg" size="lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">
                Thank you for reaching out.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Your message has been submitted successfully. We have saved this
                confirmation for 24 hours so you do not accidentally send the
                same request again.
              </p>
            </div>
            <span className="flex size-7 lg:size-11 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/30">
              <HiCheckCircle className="size-4 lg:size-6" aria-hidden />
            </span>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-300">
            Need to send a different request? Clear this confirmation and the
            form will be ready again.
          </div>

          <Button
            appearance="gradient-teal"
            className="w-full md:w-fit"
            onClick={() => {
              clearSubmissionMarker();
              setActionState(initialState);
            }}
            type="button"
          >
            Submit another form
          </Button>
        </div>
      </Card>
    );
  }

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
