import React from 'react';
import { FormData } from '@/types/form';

interface SuccessStepProps {
  onReset: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ onReset }) => (
  <div className="text-center space-y-4">
    <h2 className="text-2xl font-bold text-green-600">Booking Confirmed!</h2>
    <p className="text-gray-600">
      Thank you for choosing our service. We'll contact you shortly to confirm your appointment.
    </p>
    <button
      onClick={onReset}
      className="bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-800"
    >
      Book Another Service
    </button>
  </div>
);