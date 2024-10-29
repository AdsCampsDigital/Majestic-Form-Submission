import { FormData } from '@/types/form';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbjnkzrw'; // Replace with your Formspree endpoint

export async function submitForm(data: Partial<FormData>, isFirstStep = false) {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        _subject: isFirstStep ? 'Initial Quote Request' : 'Final Booking Request',
        submissionStep: isFirstStep ? 'Step 1' : 'Final Step',
        toEmail: 'sujan@majesticcleaningpros.com.au'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Submission failed');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Form submission failed: ${error.message}`);
    }
    throw new Error('Form submission failed');
  }
}