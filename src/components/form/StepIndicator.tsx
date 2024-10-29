import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => (
  <div className="flex justify-between items-center mb-8">
    {[1, 2, 3].map(num => (
      <div key={num} className="flex items-center">
        <div className={`rounded-full w-8 h-8 flex items-center justify-center 
          ${currentStep === num ? 'bg-purple-900 text-white' : 'bg-white border-2 border-purple-900'}`}>
          {num}
        </div>
        <div className="ml-2">STEP {num}</div>
        {num < 3 && <div className="h-1 w-24 bg-purple-900 mx-4" />}
      </div>
    ))}
  </div>
);