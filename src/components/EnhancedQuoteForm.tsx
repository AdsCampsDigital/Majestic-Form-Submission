import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StepIndicator } from './form/StepIndicator';
import { Step1Form } from './form/Step1Form';
import { Step2Form } from './form/Step2Form';
import { Step3Form } from './form/Step3Form';
import { SuccessStep } from './form/SuccessStep';
import { FormData, FormErrors } from '@/types/form';
import { submitForm } from '@/services/formSubmission';

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  message: '',
  bedrooms: 1,
  bathrooms: 1,
  livingAreas: 1,
  storeys: 1,
  needsCarpetCleaning: 'no',
  bedroomCarpets: 0,
  livingAreaCarpets: 0,
  hallwayCarpets: 0,
  stairCarpets: 0,
  selectedTime: ''
};

const EnhancedQuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[\d\s()-]{8,}$/.test(phone);

  const calculatePrice = () => {
    let basePrice = 250;
    basePrice += (formData.bedrooms - 1) * 50;
    basePrice += (formData.bathrooms - 1) * 60;
    basePrice += (formData.livingAreas - 1) * 35;
    basePrice += (formData.storeys - 1) * 25;

    if (formData.needsCarpetCleaning === 'yes') {
      basePrice += 25;
      basePrice += formData.bedroomCarpets * 40;
      basePrice += formData.livingAreaCarpets * 40;
      basePrice += formData.hallwayCarpets * 30;
      basePrice += formData.stairCarpets * 35;
    }

    return basePrice;
  };

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone format';
    if (!formData.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = async () => {
    if (validateStep1()) {
      setIsSubmitting(true);
      try {
        const step1Data = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          message: formData.message
        };
        
        await submitForm(step1Data, true);
        setStep(2);
      } catch (error) {
        // Silent fail - continue to next step even if submission fails
        setStep(2);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const finalData = {
        ...formData,
        totalPrice: calculatePrice(),
        submissionTime: new Date().toISOString()
      };
      
      await submitForm(finalData);
      setStep(4);
    } catch (error) {
      // Silent fail - show success even if submission fails
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNumberChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: Math.max(0, value)
    }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, selectedTime: time }));
  };

  const handleReset = () => {
    setStep(1);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900">REQUEST A FREE QUOTE</h1>
      </div>
      {step < 4 && <StepIndicator currentStep={step} />}
      {step === 1 && (
        <Step1Form
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onSubmit={handleStep1Submit}
        />
      )}
      {step === 2 && (
        <Step2Form
          formData={formData}
          onNumberChange={handleNumberChange}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
          calculatePrice={calculatePrice}
        />
      )}
      {step === 3 && (
        <Step3Form
          formData={formData}
          isSubmitting={isSubmitting}
          onTimeSelect={handleTimeSelect}
          onBack={() => setStep(2)}
          onSubmit={handleFinalSubmit}
        />
      )}
      {step === 4 && <SuccessStep onReset={handleReset} />}
    </Card>
  );
};

export default EnhancedQuoteForm;