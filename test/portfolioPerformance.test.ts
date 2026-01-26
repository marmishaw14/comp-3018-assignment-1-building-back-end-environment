import request, { Response } from "supertest";
import app from "../src/app";
// import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

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
        
        it("should return 400 if initial investment isn't a valid number", async() => {            
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
    });
});