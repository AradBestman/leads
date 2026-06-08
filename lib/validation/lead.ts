import Joi from "joi";
import type { LeadFormData } from "@/lib/types/lead";

export const leadSchema = Joi.object<LeadFormData>({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Please enter your name",
    "string.min": "Name must be at least 2 characters",
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Please enter your email",
      "string.email": "Please enter a valid email address",
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9+()\-\s]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Please enter your phone number",
      "string.pattern.base": "Please enter a valid phone number",
    }),
});

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

export type LeadValidationResult =
  | { errors: LeadFormErrors; value?: undefined }
  | { errors?: undefined; value: LeadFormData };

export const validateLeadForm = (data: LeadFormData): LeadValidationResult => {
  const { error, value } = leadSchema.validate(data, { abortEarly: false });

  if (!error) {
    return { value };
  }

  const errors: LeadFormErrors = {};
  error.details.forEach((detail) => {
    const field = detail.path[0] as keyof LeadFormData;
    if (!errors[field]) errors[field] = detail.message;
  });

  return { errors };
};
