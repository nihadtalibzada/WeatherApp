const { test, expect } = require('@playwright/test');

test.describe('WeatherApp weather forecast tests - valid input', () => {
    test.beforeEach(async ({ page }) => {
        // Load the page
        await page.goto('http://localhost:8080');
        const exampleCity = 'New York';

        // Example: Test searching for a city
        const searchInput = await page.$('#search-weather-forecast-text-field');
        expect(searchInput).not.toBeNull();

        await searchInput.fill(exampleCity);
        await page.click('.search-weather-forecast-text-field .v-icon');
        await page.waitForTimeout(1500);
    });

    test('to test the content of the current weather overview', async ({ page }) => {
        // Wait for the weather data to load
        await page.waitForSelector('#weather-overview-image');

        // Expect current weather data to be visible
        await expect(page.locator('#weather-overview-city')).toBeVisible();
        await expect(page.locator('#weather-overview-description')).toBeVisible();
        await expect(page.locator('#weather-overview-image')).toBeVisible();

        const city = await page.textContent('#weather-overview-city');
        expect(city).not.toBeUndefined();

        // Test the current temperature
        const temperature = await page.textContent('#weather-overview-temperature');
        expect(temperature).not.toBeUndefined();
        expect(parseInt(temperature)).toBeGreaterThan(0); // Assuming temperature is a positive number

        // Assert the weather description
        const description = await page.textContent('#weather-overview-description');
        expect(description).not.toBeUndefined();
    });
});
