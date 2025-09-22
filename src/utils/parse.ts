export const parseAmount = (amount: number): string =>
	new Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(amount as number);
