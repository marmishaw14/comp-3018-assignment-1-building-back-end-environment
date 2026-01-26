/**
 * Represents the response structure for managing portfolio performance changes
 */
interface Portfolio {
    initialInvestment: number;
    currentValue: number;
    profitOrLoss: number;
    percentageChange: number;
    performanceSummary: string;
}

/**
 * 
 * @param initialInvestment - The user's initial investment amount
 * @param currentValue - The current value of the user's investment portfolio
 * @returns a {@link Portfolio} JSON object containing a user's portfolio summary details
 */
export function calculatePortfolioPerformance(initialInvestment: number, currentValue: number): Portfolio {
    // The calculated profit or loss difference
    const profitOrLoss: number = currentValue - initialInvestment;
    // The percentage change calculation
    const percentageChange: number = (profitOrLoss / initialInvestment) * 100;

    let performanceSummary: string = (() => {
        switch (true) {
            case percentageChange >= 30:
                return "Excellent performance! Your investments are doing great."
            case percentageChange >= 10:
                return "Solid gain. Keep monitoring your investments."
            case percentageChange > 0:
                return "Modest gain. Your portfolio is growing slowly."
            case percentageChange === 0:
                return "No change. Your portfolio is holding steady."
            case percentageChange >= -10:
                return "Minor loss. Stay calm and review your options."
            default:
                return "Significant loss. Review your portfolio strategy."
        }
    })();

    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary,
    };
}