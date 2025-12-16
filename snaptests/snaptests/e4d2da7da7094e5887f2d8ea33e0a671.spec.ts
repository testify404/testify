import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('Generated Test', async () => {
  test.setTimeout(120000);

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
      const steps = [
        {
          "action": "goto",
          "selector": null,
          "value": "https://www.saucedemo.com/",
          "waitTimeoutMs": 10000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to navigate to saucedemo.com",
          "stepDescription": "Navigate to https://www.saucedemo.com/."
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "[data-test='username']",
            "input[name='user-name']"
          ],
          "errorMessage": "Failed to enter username",
          "stepDescription": "Enter \"standard_user\" in the username field with id 'user-name'."
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "[data-test='password']",
            "input[name='password']"
          ],
          "errorMessage": "Failed to enter password",
          "stepDescription": "Enter \"secret_sauce\" in the password field with id 'password'."
        },
        {
          "action": "click",
          "selector": "#login-button",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [
            "[data-test='login-button']",
            "input[name='login-button']"
          ],
          "errorMessage": "Failed to click login button",
          "stepDescription": "Click the Login button with id 'login-button'."
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to click product sort filter dropdown",
          "stepDescription": "Click on the product sort filter dropdown with class 'product_sort_container'."
        },
        {
          "action": "click",
          "selector": ".product_sort_container [value='za']",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [],
          "errorMessage": "Failed to select Name (Z to A)",
          "stepDescription": "Select Name (Z to A) from the product sort filter dropdown with class 'product_sort_container' and value 'za'."
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [
            "[data-test='add-to-cart-sauce-labs-backpack']",
            "button:has-text('Add to cart')"
          ],
          "errorMessage": "Failed to click Add to Cart for Sauce Labs Backpack",
          "stepDescription": "Locate the product \"Sauce Labs Backpack\" and click the Add to cart button with id 'add-to-cart-sauce-labs-backpack'."
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "value": null,
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "[data-test='shopping-cart-link']"
          ],
          "errorMessage": "Failed to click cart icon",
          "stepDescription": "Click on the cart icon with class 'shopping_cart_link'."
        },
        {
          "action": "isVisible",
          "selector": "[data-test='inventory-item-name']:has-text('Sauce Labs Backpack')",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Sauce Labs Backpack not found in cart",
          "stepDescription": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart with data-test 'inventory-item-name'."
        },
        {
          "action": "click",
          "selector": "#checkout",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [
            "[data-test='checkout']",
            "button[name='checkout']"
          ],
          "errorMessage": "Failed to click checkout button",
          "stepDescription": "Click on the checkout button with id 'checkout'."
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "[data-test='firstName']",
            "input[name='firstName']"
          ],
          "errorMessage": "Failed to enter first name",
          "stepDescription": "Enter the first name as chaitanya in the first name field with id 'first-name'."
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "[data-test='lastName']",
            "input[name='lastName']"
          ],
          "errorMessage": "Failed to enter last name",
          "stepDescription": "Enter the last name as Kompella in the last name field with id 'last-name'."
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "waitTimeoutMs": 5000,
          "retry": 2,
          "fallbacks": [
            "[data-test='postalCode']",
            "input[name='postalCode']"
          ],
          "errorMessage": "Failed to enter postal code",
          "stepDescription": "Enter the postal code as 62567352 in postal code field with id 'postal-code'."
        },
        {
          "action": "click",
          "selector": "#continue",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [
            "[data-test='continue']",
            "input[name='continue']"
          ],
          "errorMessage": "Failed to click continue button",
          "stepDescription": "Click on continue button with id 'continue'."
        },
        {
          "action": "click",
          "selector": "#finish",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [
            "[data-test='finish']",
            "button[name='finish']"
          ],
          "errorMessage": "Failed to click finish button",
          "stepDescription": "Click on finish button with id 'finish'."
        },
        {
          "action": "isVisible",
          "selector": ".complete-header:has-text('Thank you for your order!')",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Order confirmation message not found",
          "stepDescription": "You should see a message “Thank you for your order!” with class 'complete-header'."
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [
            "[data-test='back-to-products']",
            "a:has-text('Back to products')"
          ],
          "errorMessage": "Failed to click back to home button",
          "stepDescription": "Then click on back to home button with id 'back-to-products'."
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click burger bar",
          "stepDescription": "Click on the burger bar with id 'react-burger-menu-btn'."
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "value": null,
          "waitTimeoutMs": 7000,
          "retry": 3,
          "fallbacks": [],
          "errorMessage": "Failed to click logout",
          "stepDescription": "Click on logout with id 'logout_sidebar_link'."
        }
      ];

      if (steps.length === 0) {
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
              case "click":
                await page.locator(stepData.selector).click();
                stepDetails = `Clicked ${stepData.selector}`;
                break;
              case "fill":
                await page.locator(stepData.selector).fill(stepData.value);
                stepDetails = `Filled ${stepData.selector}`;
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
              default:
                stepStatus = "error";
                stepDetails = `Unknown action: ${stepData.action}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData.stepDescription}. Error: ${stepError.message}`;

            // Attempt fallbacks
            if (stepData.fallbacks && stepData.fallbacks.length > 0) {
              for (const fallbackSelector of stepData.fallbacks) {
                try {
                  if (stepData.action === 'click') {
                    await page.locator(fallbackSelector).click();
                    stepStatus = "success";
                    stepDetails = `Clicked fallback selector ${fallbackSelector} after initial failure`;
                    break; // Exit fallback loop on success
                  } else if (stepData.action === 'fill') {
                    await page.locator(fallbackSelector).fill(stepData.value);
                    stepStatus = "success";
                    stepDetails = `Filled fallback selector ${fallbackSelector} after initial failure`;
                    break;
                  }
                } catch (fallbackError) {
                  // Log fallback error but continue to next fallback
                  console.error(`Fallback failed: ${fallbackSelector}. Error: ${fallbackError.message}`);
                }
              }
            }
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
      require('fs').writeFileSync('e4d2da7da7094e5887f2d8ea33e0a671.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

  
  }
});