"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoFormSchema, MARKETS, type DemoFormValues } from "@/lib/schemas/demo";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass = "bg-black text-white border-0 px-4 py-[15px] text-base w-full";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="mono text-[11px]">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-bold underline">
          {error}
        </p>
      )}
    </div>
  );
}

export default function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: "",
      org: "",
      email: "",
      market: "",
      brief: "",
      company: "",
    },
  });

  const onSubmit = async (values: DemoFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border-2 border-black p-9">
        <h3 className="display text-[30px] mb-2.5">Request received</h3>
        <p>
          An editor will come back to you within one working day — with a
          fixture in mind.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[18px]">
      <div className="grid sm:grid-cols-2 gap-[18px]">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClass}
          />
        </Field>
        <Field label="Club or organisation" htmlFor="org" error={errors.org?.message}>
          <input
            id="org"
            type="text"
            autoComplete="organization"
            {...register("org")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Work email" htmlFor="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={inputClass}
        />
      </Field>

      <Field label="Market you want to grow" htmlFor="market" error={errors.market?.message}>
        <select id="market" defaultValue="" {...register("market")} className={inputClass}>
          <option value="">Select a market</option>
          {MARKETS.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>
      </Field>

      <Field label="What's the brief?" htmlFor="brief">
        <textarea
          id="brief"
          {...register("brief")}
          placeholder="A competition, a season, a channel you can't staff."
          className={`${inputClass} min-h-[110px] resize-y`}
        />
      </Field>

      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-black text-yellow px-[18px] py-[18px] font-semibold text-sm tracking-[0.08em] uppercase hover:bg-[#1a1a1a] transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a slot"}
      </button>
      <p className="text-[13px] font-medium opacity-70">
        We reply within one working day. No sales deck.
      </p>
      {status === "error" && (
        <p role="alert" className="text-[13px] font-bold underline">
          Something went wrong. Please try again or email hello@mmcsport.de directly.
        </p>
      )}
    </form>
  );
}
