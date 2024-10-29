import React from 'react';
import { FormData } from '@/types/form';

interface Step3FormProps {
  formData: FormData;
  isSubmitting: boolean;
  onTimeSelect: (time: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const Step3Form: React.FC<Step3FormProps> = ({
  formData,
  isSubmitting,
  onTimeSelect,
  onBack,
  onSubmit,
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Book Your Service</h2>
    <div className="grid grid-cols-2 gap-4">
      {['8:00 AM', '9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'].map(time => (
        <button
          key={time}
          onClick={() => onTimeSelect(time)}
          className={`p-2 rounded ${
            formData.selectedTime === time ? 'bg-purple-900 text-white' : 'bg-gray-200'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
    <div className="flex space-x-4">
      <button 
        onClick={onBack}
        className="w-1/2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
      >
        Back
      </button>
      <button 
        onClick={onSubmit}
        disabled={isSubmitting || !formData.selectedTime}
        className="w-1/2 bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800 disabled:bg-purple-300"
      >
        Book Now
      </button>
    </div>
  </div>
);