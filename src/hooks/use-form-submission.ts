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

    console.log('🚀 Submitting form data:', { formType: data.formType, name: data.name, email: data.email });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        console.error('❌ Response not OK:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Response data:', result);

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
      console.error('❌ Form submission error:', error);
      setSubmitStatus('error');
      
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Cannot connect to server. Please check your internet connection.';
      } else if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Server is not responding. Please try again in a moment.';
        } else if (error.message.includes('HTTP error')) {
          errorMessage = `Server error (${error.message}). Please try again.`;
        } else {
          errorMessage = error.message;
        }
      }
      
      console.error('📝 Error message for user:', errorMessage);
      
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