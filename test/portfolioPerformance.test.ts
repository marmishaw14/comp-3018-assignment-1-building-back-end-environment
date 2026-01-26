import request, { Response } from "supertest";
import app from "../src/app";
import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("Portfolio Performance Route Tests", () => {
    describe("GET /api/v1/portfolio/performance", () => {
        it("should return valid portfolio JSON", async() => {            
            // Act
            const response: Response = await request(app)
            .get("/api/v1/portfolio/performance")
            .query({
                initialInvestment: "10000",
                currentValue: "16000"
            });
    
            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("initialInvestment");
            expect(response.body).toHaveProperty("currentValue");
            expect(response.body).toHaveProperty("profitOrLoss");
            expect(response.body).toHaveProperty("percentageChange");
            expect(response.body).toHaveProperty("performanceSummary");
        });
        
        it("should return 400 if initialInvestment isn't a valid number", async() => {            
            // Act
            const response: Response = await request(app)
            .get("/api/v1/portfolio/performance")
            .query({
                initialInvestment: "novalue",
                currentValue: "16000"
            });
    
            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "Initial investment must be a valid number."
            });
        });
        
        it("should return 400 if currentValue isn't a valid number", async() => {            
            // Act
            const response: Response = await request(app)
            .get("/api/v1/portfolio/performance")
            .query({
                initialInvestment: "10000",
                currentValue: "novalue"
            });
    
            // Assert
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "The portfolio's current value must be a valid number."
            });
        });        
    });
});

describe("Calculating Portfolio Performance Tests", () => {
    it("should return correct performance summary for percentageChange greater than or equal to 30", () => {
        // Arrange
        const initialInvestment: number = 10000;
        const currentValue: number = 16000;
        
        // Act
        const calculation = calculatePortfolioPerformance(initialInvestment, currentValue);
        
        // Assert
        expect(calculation.performanceSummary).toBe("Excellent performance! Your investments are doing great.");
    });
    
    it("should return correct performance summary for percentageChange less than 10", () => {
        // Arrange
        const initialInvestment: number = 10000;
        const currentValue: number = 10999.9;
        
        // Act
        const calculation = calculatePortfolioPerformance(initialInvestment, currentValue);
        
        // Assert
        expect(calculation.performanceSummary).toBe("Modest gain. Your portfolio is growing slowly.");
    });
    
    it("should return correct performance summary for percentageChange with no change", () => {
        // Arrange
        const initialInvestment: number = 10000;
        const currentValue: number = 10000;
        
        // Act
        const calculation = calculatePortfolioPerformance(initialInvestment, currentValue);
        
        // Assert
        expect(calculation.performanceSummary).toBe("No change. Your portfolio is holding steady.");
    });
    
    it("should return correct performance summary for percentageChange greater than or equal to -10", () => {
        // Arrange
        const initialInvestment: number = 10000;
        const currentValue: number = 9999.9;
        
        // Act
        const calculation = calculatePortfolioPerformance(initialInvestment, currentValue);
        
        // Assert
        expect(calculation.performanceSummary).toBe("Minor loss. Stay calm and review your options.");
    });
    
    it("should return correct performance summary for percentageChange resulting in a significant loss", () => {
        // Arrange
        const initialInvestment: number = 10000;
        const currentValue: number = 8999.9;
        
        // Act
        const calculation = calculatePortfolioPerformance(initialInvestment, currentValue);
        
        // Assert
        expect(calculation.performanceSummary).toBe("Significant loss. Review your portfolio strategy.");
    });    
});