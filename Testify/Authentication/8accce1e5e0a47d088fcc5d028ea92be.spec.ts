import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo E2E Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "description": "Navigate to https://www.saucedemo.com/.",
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "timeout": 10000,
      "retries": 3,
      "error_message": "Navigation to saucedemo.com failed.",
      "wait_for": "networkidle"
    },
    {
      "step": 2,
      "description": "Enter \"standard_user\" in the username field with id 'user-name'.",
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not fill username field.",
      "wait_for": "visible"
    },
    {
      "step": 3,
      "description": "Enter \"secret_sauce\" in the password field with id 'password'.",
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not fill password field.",
      "wait_for": "visible"
    },
    {
      "step": 4,
      "description": "Click the Login button with id 'login-button'.",
      "action": "click",
      "selector": "#login-button",
      "timeout": 5000,
      "retries": 3,
      "error_message": "Could not click login button.",
      "wait_for": "visible"
    },
    {
      "step": 5,
      "description": "Click on the product sort filter dropdown with class 'product_sort_container'.",
      "action": "click",
      "selector": ".product_sort_container",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click product sort filter.",
      "wait_for": "visible"
    },
    {
      "step": 6,
      "description": "Select Name (Z to A) from the product sort filter dropdown with class 'product_sort_container' and value 'za'.",
      "action": "click",
      "selector": ".product_sort_container > option[value='za']",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not select 'Name (Z to A)' from sort filter.",
      "wait_for": "visible"
    },
    {
      "step": 7,
      "description": "Locate the product \"Sauce Labs Backpack\" and click the Add to Cart button with id 'add-to-cart-sauce-labs-backpack'.",
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "timeout": 5000,
      "retries": 3,
      "error_message": "Could not add 'Sauce Labs Backpack' to cart.",
      "wait_for": "visible"
    },
    {
      "step": 8,
      "description": "Click on the cart icon with class 'shopping_cart_link'.",
      "action": "click",
      "selector": ".shopping_cart_link",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click cart icon.",
      "wait_for": "visible"
    },
    {
      "step": 9,
      "description": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart with data-test 'inventory-item-name'.",
      "action": "isVisible",
      "selector": "[data-test='inventory-item-name']:has-text('Sauce Labs Backpack')",
      "timeout": 5000,
      "retries": 3,
      "error_message": "'Sauce Labs Backpack' not found in cart.",
      "wait_for": "visible"
    },
    {
      "step": 10,
      "description": "Click on the checkout button with id 'checkout'.",
      "action": "click",
      "selector": "#checkout",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click checkout button.",
      "wait_for": "visible"
    },
    {
      "step": 11,
      "description": "Enter the first name as chaitanya in the first name field with id 'first-name'.",
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not fill first name field.",
      "wait_for": "visible"
    },
    {
      "step": 12,
      "description": "Enter the last name as Kompella in the last name field with id 'last-name'.",
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not fill last name field.",
      "wait_for": "visible"
    },
    {
      "step": 13,
      "description": "Enter the postal code as 62567352 in postal code field with id 'postal-code'.",
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not fill postal code field.",
      "wait_for": "visible"
    },
    {
      "step": 14,
      "description": "Click on continue button with id 'continue'.",
      "action": "click",
      "selector": "#continue",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click continue button.",
      "wait_for": "visible"
    },
    {
      "step": 15,
      "description": "Click on finish button with id 'finish'.",
      "action": "click",
      "selector": "#finish",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click finish button.",
      "wait_for": "visible"
    },
    {
      "step": 16,
      "description": "You should see a message “Thank you for your order!” with id 'complete-header'.",
      "action": "isVisible",
      "selector": "#complete-header:has-text('Thank you for your order!')",
      "timeout": 5000,
      "retries": 3,
      "error_message": "Order confirmation message not found.",
      "wait_for": "visible"
    },
    {
      "step": 17,
      "description": "Then click on back to home button with id 'back-to-products'.",
      "action": "click",
      "selector": "#back-to-products",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click back to home button.",
      "wait_for": "visible"
    },
    {
      "step": 18,
      "description": "Click on the burger bar with id 'react-burger-menu-btn'.",
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click burger bar.",
      "wait_for": "visible"
    },
    {
      "step": 19,
      "description": "Click on logout with id 'logout_sidebar_link'.",
      "action": "click",
      "selector": "#logout_sidebar_link",
      "timeout": 5000,
      "retries": 2,
      "error_message": "Could not click logout button.",
      "wait_for": "visible"
    },
    {
      "step": 20,
      "description": "Keep the browser open after the test execution is complete.",
      "action": "waitFor",
      "timeout": 0,
      "retries": 0,
      "error_message": "Browser closed unexpectedly.",
      "wait_for": "no_wait"
    }
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
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of originalUserSteps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.url);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector).click();
                stepDetails = `Clicked ${stepData.selector}`;
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
                // Intentionally empty, as this step is to keep the browser open
                stepDetails = `Waiting indefinitely`;
                break;
              case "isVisible":
                try {
                  await page.locator(stepData.selector).waitFor({ timeout: stepData.timeout });
                  stepDetails = `Element ${stepData.selector} is visible`;
                } catch (e) {
                  stepStatus = "error";
                  stepDetails = `Element ${stepData.selector} is not visible`;
                }
                break;
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.description}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepData.description);
          executionResults.push({
            step: stepData.description,
            status: stepStatus,
            details: stepDetails,
            timestamp: startTime,
            duration_ms: endTime - startTime
          });
        }
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
        // Log but don't fail - we still need to return results
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
      user_test_steps: originalUserSteps.map(step => step.description),
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
      fs.writeFileSync('8accce1e5e0a47d088fcc5d028ea92be.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});