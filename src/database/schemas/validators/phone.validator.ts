export const isPhoneValid = (phone: string): boolean => /^\+?[0-9]{9,15}$/.test(phone);
