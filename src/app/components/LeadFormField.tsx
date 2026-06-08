import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LeadFormData } from "@/lib/types/lead";

type LeadFormFieldProps = {
  id: keyof LeadFormData;
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
};

export const LeadFormField = ({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: LeadFormFieldProps) => (
  <Field>
    <FieldLabel htmlFor={id}>{label}</FieldLabel>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className="bg-zinc-50 pl-9 border-zinc-200 text-zinc-900"
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </Field>
);
