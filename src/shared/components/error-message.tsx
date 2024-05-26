const errorMessages: { [key: string]: string } = {
  'Country not found': 'The specified country could not be found.',
  'Request error': 'There was an error with the request.',
  'Validation error': 'There was a validation error.',
  'User not found': 'The specified user could not be found.', // Aggiunto nuovo messaggio di errore
  // Other errors
};

export const ErrorMessage = (errorCode: string): string => {
  return errorMessages[errorCode] || 'An unknown error occurred.';
};
