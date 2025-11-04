import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the Saucedemo website",
    "Enter username",
    "Enter password",
    "Click Login button",
    "Click product sort dropdown",
    "Select Name (Z to A)",
    "Add Sauce Labs Backpack to cart",
    "Click cart icon",
    "Verify Sauce Labs Backpack is in cart",
    "Click Checkout button",
    "Enter first name",
    "Enter last name",
    "Enter postal code",
    "Click Continue button",
    "Click Finish button",
    "Verify order confirmation message",
    "Click Back to Home button",
    "Click burger bar",
    "Click Logout"
  ];

  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  try {
    try {
      browser = await chromium.launch({
        headless: false,
        slowMo: 1000,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      });
      const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
      page = await context.newPage();
      page.setDefaultTimeout(30000);
    } catch (setupErr) {
      setupError = true;
      executionResults.push({
        step: "Browser Setup",
        status: "error",
        details: `Failed to setup browser: ${setupErr.message}`,
        timestamp: Date.now(),
        duration_ms: 0
      });
    }

    if (!setupError && page) {
      const steps = [
        {
          "action": "goto",
          "selector": null,
          "value": "https://www.saucedemo.com/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["waitForLoadState"],
          "errorMessage": "Failed to navigate to saucedemo.com",
          "stepDescription": "Navigate to the Saucedemo website"
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter username"
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter password"
        },
        {
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click login button",
          "stepDescription": "Click Login button"
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click product sort dropdown",
          "stepDescription": "Click product sort dropdown"
        },
        {
          "action": "click",
          "selector": ".product_sort_container > option[value='za']",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to select Name (Z to A)",
          "stepDescription": "Select Name (Z to A)"
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click Add to Cart for Sauce Labs Backpack",
          "stepDescription": "Add Sauce Labs Backpack to cart"
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click cart icon",
          "stepDescription": "Click cart icon"
        },
        {
          "action": "isVisible",
          "selector": ".inventory_item_name[data-test='inventory-item-name']:has-text('Sauce Labs Backpack')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Sauce Labs Backpack not found in cart",
          "stepDescription": "Verify Sauce Labs Backpack is in cart"
        },
        {
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click checkout button",
          "stepDescription": "Click Checkout button"
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter first name",
          "stepDescription": "Enter first name"
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter last name",
          "stepDescription": "Enter last name"
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Failed to enter postal code",
          "stepDescription": "Enter postal code"
        },
        {
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click continue button",
          "stepDescription": "Click Continue button"
        },
        {
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click finish button",
          "stepDescription": "Click Finish button"
        },
        {
          "action": "isVisible",
          "selector": ".complete-header:has-text('Thank you for your order!')",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView"],
          "errorMessage": "Order confirmation message not visible",
          "stepDescription": "Verify order confirmation message"
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click back to home button",
          "stepDescription": "Click Back to Home button"
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click burger bar",
          "stepDescription": "Click burger bar"
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": ["scrollIntoView", "waitForLoadState"],
          "errorMessage": "Failed to click logout",
          "stepDescription": "Click Logout"
        }
      ];

      for (const stepData of steps) {
        const startTime = Date.now();
        let stepStatus = "success";
        let stepDetails = "";

        try {
          switch (stepData.action) {
            case "goto":
              await page.goto(stepData.value);
              stepDetails = `Navigated to ${stepData.value}`;
              break;
            case "click":
              await page.locator(stepData.selector).click();
              stepDetails = `Clicked ${stepData.selector}`;
              break;
            case "fill":
              await page.locator(stepData.selector).fill(stepData.value);
              stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
              break;
            case "check":
              await page.locator(stepData.selector).check();
              stepDetails = `Checked ${stepData.selector}`;
              break;
            case "uncheck":
              await page.locator(stepData.selector).uncheck();
              stepDetails = `Unchecked ${stepData.selector}`;
              break;
            case "hover":
              await page.locator(stepData.selector).hover();
              stepDetails = `Hovered ${stepData.selector}`;
              break;
            case "waitFor":
              await page.locator(stepData.selector).waitFor();
              stepDetails = `Waited for ${stepData.selector}`;
              break;
            case "isVisible":
              const isVisible = await page.locator(stepData.selector).isVisible();
              stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
              if (!isVisible) {
                stepStatus = "error";
              }
              break;
            default:
              stepStatus = "error";
              stepDetails = `Unknown action: ${stepData.action}`;
          }
        } catch (stepError) {
          stepStatus = "error";
          stepDetails = `Failed to execute: ${stepData.stepDescription}. Error: ${stepError.message}`;
        }

        const endTime = Date.now();
        executedSteps.push(stepData.stepDescription);
        executionResults.push({
          step: stepData.stepDescription,
          status: stepStatus,
          details: stepDetails,
          timestamp: startTime,
          duration_ms: endTime - startTime
        });
      }
    }
  } catch (unexpectedError) {
    if (executionResults.length === 0) {
      executionResults.push({
        step: "Unexpected Error",
        status: "error",
        details: `Unexpected error occurred: ${unexpectedError.message}`,
        timestamp: Date.now(),
        duration_ms: 0
      });
    }
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }

    if (executionResults.length === 0) {
      executionResults.push({
        step: "No Execution",
        status: "error",
        details: "Test failed to execute any steps",
        timestamp: Date.now(),
        duration_ms: 0
      });
    }

    const totalDuration = executionResults.reduce((sum, r) => sum + r.duration_ms, 0);
    const result = {
      user_test_steps: originalUserSteps,
      executed_test_steps: executedSteps,
      execution_results: executionResults,
      summary: {
        total_steps: executionResults.length,
        passed: executionResults.filter(r => r.status === 'success').length,
        failed: executionResults.filter(r => r.status === 'error').length,
        duration_ms: totalDuration
      }
    };

    try {
      fs.writeFileSync('4db509146e034109901e50027a789091.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});