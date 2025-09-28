import { z } from 'zod';

// Client-side form validation schemas
export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
});

export const newsletterFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
});

export const bookingFormSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .refine((phone) => /^[\+]?[\d\s\-\(\)]+$/.test(phone), {
      message: "Please enter a valid phone number"
    }),
  date: z.string()
    .min(1, "Please select a date"),
  time: z.string()
    .min(1, "Please select a time"),
  message: z.string()
    .trim()
    .min(10, "Please tell us about your needs (minimum 10 characters)")
    .max(1000, "Message must be less than 1000 characters")
});

// Validation helper functions
export const validateForm = <T>(schema: z.ZodSchema<T>, data: any): { success: boolean; errors?: string[] } => {
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(e => e.message) 
      };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, ''); // Remove event handlers
};