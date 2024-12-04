export function calculatePercentage(currentValue: number, totalValue: number) {
  if (totalValue <= 0) {
    throw new Error('Total value must be greater than 0');
  }

  const percentage = (currentValue / totalValue) * 100;
  return Math.min(100, Math.max(0, percentage));
}
