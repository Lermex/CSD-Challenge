const formatPhoneNumber = number => number.replace(/.*(\d{3}).*(\d{3}).*(\d{4}).*/, '$1-$2-$3');

const notEmpty = value => value && !['', 'NULL'].includes(value.trim().toUpperCase());

export const processPhones = apiResponse => apiResponse
  .map(value => value.phoneNumber)
  .filter(notEmpty)
  .map(formatPhoneNumber);

export const processAdditional = apiResponse => apiResponse
  .map(({depositAmount, date}) => ({depositAmount, date}))
  .filter(({depositAmount, date}) => notEmpty(depositAmount) && notEmpty(date))
  .map(value => ({date: value.date, depositAmount: parseFloat(value.depositAmount).toFixed(2)}));
