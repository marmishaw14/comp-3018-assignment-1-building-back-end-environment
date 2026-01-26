import express, { Express } from "express";
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Define health check route
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Define portfolio performance route
app.get("/api/v1/portfolio/performance", (req, res) => {
    const initialInvestment = Number(req.query.initialInvestment);
    const currentValue = Number(req.query.currentValue);

    if (!Number.isFinite(initialInvestment)) {
        return res.status(400).json({
            error: "Initial investment must be a valid number."
        });
    }

    if (!Number.isFinite(currentValue)) {
        return res.status(400).json({
            error: "The portfolio's current value must be a valid number."
        });
    }

    const performance = calculatePortfolioPerformance(initialInvestment, currentValue);
    res.json(performance);
});

export default app;
