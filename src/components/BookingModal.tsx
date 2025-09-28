import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import BookingForm from './BookingForm';

interface BookingModalProps {
  children: React.ReactNode;
  variant?: 'default' | 'orbit';
  className?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ children, variant = 'default', className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-orbit-dark border-orbit-purple/20 text-orbit-text-primary">
        <BookingForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;