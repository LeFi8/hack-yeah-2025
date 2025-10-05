export function calculateCreditPayment(
  amount: number,
  interest: number,
  months: number,
) {
  return (
    (amount * ((interest / 12) * (1 + interest / 12) ** months)) /
    ((1 + interest / 12) ** months - 1)
  );
}
