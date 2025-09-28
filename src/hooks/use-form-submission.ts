import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export type FormData = {
  name: string;
  email: string;
  message?: string;
  phone?: string;
  date?: string;
  time?: string;
  formType: 'contact' | 'newsletter' | 'booking';
};

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        toast({
          title: "Success!",
          description: result.message,
        });
        return { success: true, message: result.message };
      } else {
        setSubmitStatus('error');
        toast({
          title: "Error",
          description: result.message || 'Something went wrong. Please try again.',
          variant: "destructive",
        });
        return { success: false, message: result.message };
      }
    } catch (error) {
      setSubmitStatus('error');
      const errorMessage = 'Network error. Please check your connection and try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, message: errorMessage };
    } finally {
      setIsSubmitting(false);
      // Reset status after 4 seconds
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return {
    submitForm,
    isSubmitting,
    submitStatus,
  };
};