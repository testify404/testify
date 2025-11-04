import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('Saucedemo Test Suite', async () => {
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
      const stepsFromInput = [
        {
          "stepDescription": "Navigate to https://www.saucedemo.com/",
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "options": {
            "timeout": 30000,
            "waitUntil": "load"
          },
          "retry": 3,
          "delayBefore": 0,
          "delayAfter": 0,
          "errorMessage": "Failed to navigate to https://www.saucedemo.com/"
        },
        {
          "stepDescription": "Enter \"standard_user\" in the username field with id 'user-name'",
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "options": {
            "timeout": 10000
          },
          "retry": 2,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='username']",
            "input[name='user-name']"
          ],
          "errorMessage": "Failed to enter username"
        },
        {
          "stepDescription": "Enter \"secret_sauce\" in the password field with id 'password'",
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "options": {
            "timeout": 10000
          },
          "retry": 2,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='password']",
            "input[name='password']"
          ],
          "errorMessage": "Failed to enter password"
        },
        {
          "stepDescription": "Click the Login button with id 'login-button'",
          "action": "click",
          "selector": "#login-button",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='login-button']",
            "input[name='login-button']"
          ],
          "errorMessage": "Failed to click login button"
        },
        {
          "stepDescription": "Click on the product sort filter dropdown with class 'product_sort_container'",
          "action": "click",
          "selector": ".product_sort_container",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='product-sort-container']"
          ],
          "errorMessage": "Failed to click product sort filter"
        },
        {
          "stepDescription": "Select Name (Z to A) from the product sort filter dropdown with class 'product_sort_container' and value 'za'",
          "action": "click",
          "selector": ".product_sort_container > option[value='za']",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "option[value='za']"
          ],
          "errorMessage": "Failed to select Name (Z to A)"
        },
        {
          "stepDescription": "Locate the product \"Sauce Labs Backpack\" and click the Add to cart button with id 'add-to-cart-sauce-labs-backpack'",
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='add-to-cart-sauce-labs-backpack']",
            "button[name='add-to-cart-sauce-labs-backpack']"
          ],
          "errorMessage": "Failed to click Add to cart button for Sauce Labs Backpack"
        },
        {
          "stepDescription": "Click on the cart icon with class 'shopping_cart_link'",
          "action": "click",
          "selector": ".shopping_cart_link",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='shopping-cart-link']"
          ],
          "errorMessage": "Failed to click cart icon"
        },
        {
          "stepDescription": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart with data-test 'inventory-item-name'",
          "action": "isVisible",
          "selector": "[data-test='inventory-item-name']:has-text('Sauce Labs Backpack')",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "errorMessage": "Sauce Labs Backpack not visible in cart"
        },
        {
          "stepDescription": "Click on the checkout button with id 'checkout'",
          "action": "click",
          "selector": "#checkout",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='checkout']",
            "button[name='checkout']"
          ],
          "errorMessage": "Failed to click checkout button"
        },
        {
          "stepDescription": "Enter the first name as chaitanya in the first name field with id 'first-name'",
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "options": {
            "timeout": 10000
          },
          "retry": 2,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='firstName']",
            "input[name='firstName']"
          ],
          "errorMessage": "Failed to enter first name"
        },
        {
          "stepDescription": "Enter the last name as Kompella in the last name field with id 'last-name'",
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "options": {
            "timeout": 10000
          },
          "retry": 2,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='lastName']",
            "input[name='lastName']"
          ],
          "errorMessage": "Failed to enter last name"
        },
        {
          "stepDescription": "Enter the postal code as 62567352 in postal code field with id 'postal-code'",
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "options": {
            "timeout": 10000
          },
          "retry": 2,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='postalCode']",
            "input[name='postalCode']"
          ],
          "errorMessage": "Failed to enter postal code"
        },
        {
          "stepDescription": "Click on continue button with id 'continue'",
          "action": "click",
          "selector": "#continue",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='continue']",
            "input[name='continue']"
          ],
          "errorMessage": "Failed to click continue button"
        },
        {
          "stepDescription": "Click on finish button with id 'finish'",
          "action": "click",
          "selector": "#finish",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='finish']",
            "input[name='finish']"
          ],
          "errorMessage": "Failed to click finish button"
        },
        {
          "stepDescription": "You should see a message “Thank you for your order!” with class 'complete-header'",
          "action": "isVisible",
          "selector": ".complete-header:has-text('Thank you for your order!')",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "errorMessage": "Confirmation message not visible"
        },
        {
          "stepDescription": "Then click on back to home button with id 'back-to-products'",
          "action": "click",
          "selector": "#back-to-products",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='back-to-products']",
            "a[name='back-to-products']"
          ],
          "errorMessage": "Failed to click back to home button"
        },
        {
          "stepDescription": "Click on the burger bar with id 'react-burger-menu-btn'",
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='react-burger-menu-btn']"
          ],
          "errorMessage": "Failed to click burger bar"
        },
        {
          "stepDescription": "Click on logout with id 'logout_sidebar_link'",
          "action": "click",
          "selector": "#logout_sidebar_link",
          "options": {
            "timeout": 10000
          },
          "retry": 3,
          "delayBefore": 500,
          "delayAfter": 500,
          "alternativeSelectors": [
            "[data-test='logout_sidebar_link']"
          ],
          "errorMessage": "Failed to click logout"
        }
      ];

      if (stepsFromInput.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        for (const stepData of stepsFromInput) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            switch (stepData.action) {
              case "goto":
                await page.goto(stepData.url, stepData.options);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value, stepData.options);
                stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                break;
              case "click":
                await page.locator(stepData.selector).click(stepData.options);
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "check":
                await page.locator(stepData.selector).check(stepData.options);
                stepDetails = `Checked ${stepData.selector}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector).uncheck(stepData.options);
                stepDetails = `Unchecked ${stepData.selector}`;
                break;
              case "hover":
                await page.locator(stepData.selector).hover(stepData.options);
                stepDetails = `Hovered ${stepData.selector}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector).waitFor(stepData.options);
                stepDetails = `Waited for ${stepData.selector}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector).isVisible(stepData.options);
                stepDetails = `Element ${stepData.selector} is ${isVisible ? 'visible' : 'not visible'}`;
                if (!isVisible) {
                  stepStatus = 'error';
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
      fs.writeFileSync('fff7a70653c64deaa6cb9736a9691262.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error(`Failed to write test_result.json: ${writeError.message}`);
    }

    return result;
  }
});