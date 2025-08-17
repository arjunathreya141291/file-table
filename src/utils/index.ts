export const capitalizeFirstLetter = (status: string): string => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1);
};
