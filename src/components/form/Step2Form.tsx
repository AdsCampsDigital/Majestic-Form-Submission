import React from 'react';
import { FormData } from '@/types/form';

interface Step2FormProps {
  formData: FormData;
  onNumberChange: (name: string, value: number) => void;
  onBack: () => void;
  onNext: () => void;
  calculatePrice: () => number;
}

export const Step2Form: React.FC<Step2FormProps> = ({
  formData,
  onNumberChange,
  onBack,
  onNext,
  calculatePrice,
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      {['bedrooms', 'bathrooms', 'livingAreas', 'storeys'].map(item => (
        <div key={item} className="space-y-2">
          <label className="block text-sm font-medium">{item.charAt(0).toUpperCase() + item.slice(1)}</label>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onNumberChange(item, formData[item] - 1)}
              className="px-3 py-1 bg-purple-900 text-white rounded"
            >
              -
            </button>
            <span className="w-12 text-center">{formData[item]}</span>
            <button 
              onClick={() => onNumberChange(item, formData[item] + 1)}
              className="px-3 py-1 bg-purple-900 text-white rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6">
      <h3 className="text-xl font-bold">Total Price: ${calculatePrice()}</h3>
    </div>

    <div className="flex space-x-4">
      <button 
        onClick={onBack}
        className="w-1/2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
      >
        Back
      </button>
      <button 
        onClick={onNext}
        className="w-1/2 bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800"
      >
        Next
      </button>
    </div>
  </div>
);