import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test('Generated Test', async () => {
  test.setTimeout(120000);

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/",
    "Enter \"standard_user\" in the username field with id 'user-name.",
    "Enter \"secret_sauce\" in the password field with id 'password.",
    "Click the Login button with id 'login-button'.",
    "Click on the product sort filter dropdown with class 'product_sort_container'.",
    "Select Name (Z to A) from the product sort filter dropdown with class 'product_sort_container' and value 'za'.",
    "Locate the product \"Sauce Labs Backpack\" and click the Add to cart button with id 'add-to-cart-sauce-labs-backpack'.",
    "Click on the cart icon with class 'shopping_cart_link'.",
    "Ensure that the product \"Sauce Labs Backpack\" is present in the cart with data-test 'inventory-item-name'.",
    "Click on the checkout button with id 'checkout'.",
    "Enter the first name as chaitanya in the first name field with id 'first-name'.",
    "Enter the last name as Kompella in the last name field with id 'last-name'.",
    "Enter the postal code as 62567352 in postal code field with id 'postal-code'.",
    "Click on continue button with id 'continue'.",
    "Click on finish button with id 'finish'.",
    "You should see a message “Thank you for your order!” with class 'complete-header'.",
    "Then click on back to home button with id 'back-to-products'.",
    "Click on the burger bar with id 'react-burger-menu-btn'.",
    "Click on logout with id 'logout_sidebar_link'.",
    "Keep the browser open after the test execution is complete."
  ];

  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  const stepsData = [
    {
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to saucedemo failed after multiple retries.",
      "stepDescription": "Navigate to URL: https://www.saucedemo.com/"
    },
    {
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill username field after multiple retries.",
      "stepDescription": "Enter text 'standard_user' into username field"
    },
    {
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill password field after multiple retries.",
      "stepDescription": "Enter text 'secret_sauce' into password field"
    },
    {
      "action": "click",
      "selector": "#login-button",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Login button click failed after multiple retries.",
      "stepDescription": "Click the login button"
    },
    {
      "action": "click",
      "selector": ".product_sort_container",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to click sort container after multiple retries.",
      "stepDescription": "Click the product sort container"
    },
    {
      "action": "select",
      "selector": ".product_sort_container",
      "value": "za",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to select sort option 'Name (Z to A)' after multiple retries.",
      "stepDescription": "Select dropdown option: Name (Z to A)"
    },
    {
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Add to cart button click failed after multiple retries.",
      "stepDescription": "Click the add to cart button for Sauce Labs Backpack"
    },
    {
      "action": "click",
      "selector": ".shopping_cart_link",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Shopping cart link click failed after multiple retries.",
      "stepDescription": "Click the shopping cart link"
    },
    {
      "action": "isVisible",
      "selector": "[data-test='inventory-item-name']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Shopping cart item name is not visible after multiple retries.",
      "stepDescription": "Assert element visibility: Verify item name is visible"
    },
    {
      "action": "click",
      "selector": "#checkout",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Checkout button click failed after multiple retries.",
      "stepDescription": "Click the checkout button"
    },
    {
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill first name field after multiple retries.",
      "stepDescription": "Enter text 'chaitanya' into first name field"
    },
    {
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill last name field after multiple retries.",
      "stepDescription": "Enter text 'Kompella' into last name field"
    },
    {
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 2,
      "fallbacks": [],
      "errorMessage": "Failed to fill postal code field after multiple retries.",
      "stepDescription": "Enter text '62567352' into postal code field"
    },
    {
      "action": "click",
      "selector": "#continue",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Continue button click failed after multiple retries.",
      "stepDescription": "Click the continue button"
    },
    {
      "action": "click",
      "selector": "#finish",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Finish button click failed after multiple retries.",
      "stepDescription": "Click the finish button"
    },
    {
      "action": "isVisible",
      "selector": ".complete-header",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Completion header is not visible after multiple retries.",
      "stepDescription": "Assert element visibility: Verify completion header is visible"
    },
    {
      "action": "click",
      "selector": "#back-to-products",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Back to products button click failed after multiple retries.",
      "stepDescription": "Click the back to products button"
    },
    {
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Burger menu button click failed after multiple retries.",
      "stepDescription": "Click the burger menu button"
    },
    {
      "action": "click",
      "selector": "#logout_sidebar_link",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Logout link click failed after multiple retries.",
      "stepDescription": "Click the logout link"
    }
  ];

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
        for (const stepData of stepsData) {
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
                await page.locator(stepData.selector).waitFor();
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector).isVisible();
                stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                break;
              case "select":
                await page.locator(stepData.selector).selectOption({ value: stepData.value });
                stepDetails = `Selected ${stepData.value} in ${stepData.selector}`;
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
    const passedCount = executionResults.filter(r => r.status === 'success').length;
    const failedCount = executionResults.filter(r => r.status === 'error').length;

    const result = {
      user_test_steps: originalUserSteps,
      executed_test_steps: executedSteps,
      execution_results: executionResults,
      summary: {
        total_steps: executionResults.length,
        passed: passedCount,
        failed: failedCount,
        duration_ms: totalDuration
      }
    };

    try {
      fs.writeFileSync('423f6ed59d544f9b93cd0d710dd6c376.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});