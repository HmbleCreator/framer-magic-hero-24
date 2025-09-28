import React, { useState } from 'react';
import { useFormSubmission } from '@/hooks/use-form-submission';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  onClose?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const { submitForm, isSubmitting, submitStatus } = useFormSubmission();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    phone: '',
    time: '',
    message: ''
  });

  // Business hours time slots (9 AM - 5 PM, 30-min intervals)
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      return;
    }

    const result = await submitForm({
      ...formData,
      date: date.toISOString(),
      formType: 'booking'
    });

    if (result.success) {
      setFormData({ name: '', email: '', phone: '', time: '', message: '' });
      setDate(undefined);
      if (onClose) {
        setTimeout(onClose, 2000);
      }
    }
  };

  // Disable weekends and past dates
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-orbit-card/30 backdrop-blur-sm border border-orbit-purple/20 rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-orbit-text-primary mb-2">Book a Consultation</h2>
          <p className="text-orbit-text-muted text-sm">
            Schedule a free 30-minute consultation to discuss your automation needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-orbit-text-primary mb-1">
                Full Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-orbit-dark border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-orbit-text-primary mb-1">
                Email *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-orbit-dark border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-orbit-text-primary mb-1">
              Phone Number *
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="bg-orbit-dark border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-orbit-text-primary mb-1">
                Preferred Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-orbit-dark border-orbit-purple/20 text-orbit-text-primary hover:bg-orbit-card",
                      !date && "text-orbit-text-muted"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-orbit-card border-orbit-purple/20" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isDateDisabled}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-orbit-text-primary mb-1">
                Preferred Time *
              </label>
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-orbit-dark border border-orbit-purple/20 rounded-md text-orbit-text-primary focus:outline-none focus:ring-2 focus:ring-orbit-purple"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-orbit-text-primary mb-1">
              Tell us about your needs *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your current workflows and what you'd like to automate..."
              className="bg-orbit-dark border-orbit-purple/20 text-orbit-text-primary placeholder:text-orbit-text-muted resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !date}
            className="w-full bg-gradient-to-r from-orbit-purple to-pink-500 hover:from-orbit-purple/90 hover:to-pink-500/90 text-white font-medium"
          >
            {isSubmitting ? 'Booking...' : 'Book Consultation'}
          </Button>

          {submitStatus === 'success' && (
            <div className="p-3 bg-green-900/30 border border-green-700 rounded-md text-green-300 text-center text-sm">
              ✅ Consultation request sent! We'll contact you within 24 hours to confirm.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded-md text-red-300 text-center text-sm">
              ❌ Failed to send request. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;