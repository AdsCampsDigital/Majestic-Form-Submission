import React from 'react';
import { FormData, FormErrors } from '@/types/form';

interface Step1FormProps {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export const Step1Form: React.FC<Step1FormProps> = ({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onSubmit,
}) => (
  <div className="space-y-4">
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={onInputChange}
      placeholder="Your Name"
      className={`w-full p-3 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500' : ''}`}
    />
    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={onInputChange}
      placeholder="Your Email"
      className={`w-full p-3 rounded-lg bg-gray-50 border ${errors.email ? 'border-red-500' : ''}`}
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={onInputChange}
      placeholder="Your Phone"
      className={`w-full p-3 rounded-lg bg-gray-50 border ${errors.phone ? 'border-red-500' : ''}`}
    />
    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={onInputChange}
      placeholder="Your Address"
      className={`w-full p-3 rounded-lg bg-gray-50 border ${errors.address ? 'border-red-500' : ''}`}
    />
    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

    <textarea
      name="message"
      value={formData.message}
      onChange={onInputChange}
      placeholder="Your Message"
      className="w-full p-3 rounded-lg bg-gray-50 border h-32"
    />

    <button
      onClick={onSubmit}
      disabled={isSubmitting}
      className="w-full bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800 transition-colors disabled:bg-purple-300"
    >
      Next
    </button>
  </div>
);