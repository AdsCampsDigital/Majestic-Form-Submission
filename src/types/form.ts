export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  bedrooms: number;
  bathrooms: number;
  livingAreas: number;
  storeys: number;
  needsCarpetCleaning: string;
  bedroomCarpets: number;
  livingAreaCarpets: number;
  hallwayCarpets: number;
  stairCarpets: number;
  selectedTime: string;
  [key: string]: string | number;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: string | undefined;
}