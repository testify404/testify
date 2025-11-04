import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to https://www.saucedemo.com/.",
    "Enter \"standard_user\" in the username field with id 'user-name'.",
    "Enter \"secret_sauce\" in the password field with id 'password'.",
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

  const steps = [
    {
      "action": "goto",
      "selector": null,
      "value": "https://www.saucedemo.com/",
      "waitTimeoutMs": 10000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Navigation to https://www.saucedemo.com/ failed after multiple retries.",
      "stepDescription": "Navigate to https://www.saucedemo.com/"
    },
    {
      "action": "fill",
      "selector": "id=user-name",
      "value": "standard_user",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill username field after multiple retries.",
      "stepDescription": "Fill username field with standard_user"
    },
    {
      "action": "fill",
      "selector": "id=password",
      "value": "secret_sauce",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill password field after multiple retries.",
      "stepDescription": "Fill password field with secret_sauce"
    },
    {
      "action": "click",
      "selector": "id=login-button",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click login button after multiple retries.",
      "stepDescription": "Click login button"
    },
    {
      "action": "click",
      "selector": "class=product_sort_container",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click product sort container after multiple retries.",
      "stepDescription": "Click product sort container"
    },
    {
      "action": "click",
      "selector": "option[value='za']",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click sort option after multiple retries.",
      "stepDescription": "Click sort option"
    },
    {
      "action": "click",
      "selector": "id=add-to-cart-sauce-labs-backpack",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click add to cart button for sauce labs backpack after multiple retries.",
      "stepDescription": "Click add to cart button for sauce labs backpack"
    },
    {
      "action": "click",
      "selector": "class=shopping_cart_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click shopping cart link after multiple retries.",
      "stepDescription": "Click shopping cart link"
    },
    {
      "action": "isVisible",
      "selector": "data-test=inventory-item-name",
      "value": "Sauce Labs Backpack",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Inventory item name was not visible after multiple retries.",
      "stepDescription": "Verify inventory item name is visible"
    },
    {
      "action": "click",
      "selector": "id=checkout",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click checkout after multiple retries.",
      "stepDescription": "Click checkout"
    },
    {
      "action": "fill",
      "selector": "id=first-name",
      "value": "chaitanya",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill first name field after multiple retries.",
      "stepDescription": "Fill first name field"
    },
    {
      "action": "fill",
      "selector": "id=last-name",
      "value": "Kompella",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill last name field after multiple retries.",
      "stepDescription": "Fill last name field"
    },
    {
      "action": "fill",
      "selector": "id=postal-code",
      "value": "62567352",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to fill postal code field after multiple retries.",
      "stepDescription": "Fill postal code field"
    },
    {
      "action": "click",
      "selector": "id=continue",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click continue after multiple retries.",
      "stepDescription": "Click continue"
    },
    {
      "action": "click",
      "selector": "id=finish",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click finish after multiple retries.",
      "stepDescription": "Click finish"
    },
    {
      "action": "isVisible",
      "selector": "class=complete-header",
      "value": "Thank you for your order!",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Complete header was not visible after multiple retries.",
      "stepDescription": "Verify complete header is visible"
    },
    {
      "action": "click",
      "selector": "id=back-to-products",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click back to products after multiple retries.",
      "stepDescription": "Click back to products"
    },
    {
      "action": "click",
      "selector": "id=react-burger-menu-btn",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click react burger menu button after multiple retries.",
      "stepDescription": "Click react burger menu button"
    },
    {
      "action": "click",
      "selector": "id=logout_sidebar_link",
      "value": null,
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbacks": [],
      "errorMessage": "Failed to click logout sidebar link after multiple retries.",
      "stepDescription": "Click logout sidebar link"
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
                if (!isVisible) stepStatus = 'error';
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
        console.error(`Failed to close browser: ${closeError.message}`);
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
      fs.writeFileSync('c8dbb8dd4f594c69b4c8cf77e3e118ee.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});