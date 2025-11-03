import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

test('SauceDemo End-to-End Test', async () => {
  test.setTimeout(120000);

  const originalUserSteps = [
    {
      "stepNumber": 1,
      "description": "Navigate to the Saucedemo login page",
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Navigation to Saucedemo login page failed."
    },
    {
      "stepNumber": 2,
      "description": "Enter username",
      "action": "fill",
      "selector": "[data-test='username']",
      "value": "standard_user",
      "waitTimeoutMs": 3000,
      "retry": 2,
      "fallbackSelectors": [
        "#user-name",
        "input[placeholder='Username']"
      ],
      "error_message": "Failed to enter username."
    },
    {
      "stepNumber": 3,
      "description": "Enter password",
      "action": "fill",
      "selector": "[data-test='password']",
      "value": "secret_sauce",
      "waitTimeoutMs": 3000,
      "retry": 2,
      "fallbackSelectors": [
        "#password",
        "input[placeholder='Password']"
      ],
      "error_message": "Failed to enter password."
    },
    {
      "stepNumber": 4,
      "description": "Click login button",
      "action": "click",
      "selector": "[data-test='login-button']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        "#login-button",
        "input[value='Login']"
      ],
      "error_message": "Failed to click login button."
    },
    {
      "stepNumber": 5,
      "description": "Click product sort dropdown",
      "action": "click",
      "selector": "[data-test='product-sort-container']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Failed to click product sort dropdown."
    },
    {
      "stepNumber": 6,
      "description": "Select sort option 'Name (Z to A)'",
      "action": "click",
      "selector": "[data-test='product-sort-container'] option[value='za']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Failed to select sort option."
    },
    {
      "stepNumber": 7,
      "description": "Add Sauce Labs Backpack to cart",
      "action": "click",
      "selector": "[data-test='add-to-cart-sauce-labs-backpack']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        "#add-to-cart-sauce-labs-backpack",
        "button:has-text('Add to cart')"
      ],
      "error_message": "Failed to add item to cart."
    },
    {
      "stepNumber": 8,
      "description": "Click shopping cart link",
      "action": "click",
      "selector": "[data-test='shopping-cart-link']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        ".shopping_cart_link",
        "a.shopping_cart_link"
      ],
      "error_message": "Failed to click shopping cart link."
    },
    {
      "stepNumber": 9,
      "description": "Verify item is in the cart",
      "action": "waitFor",
      "selector": "[data-test='inventory-item']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Item not found in cart."
    },
    {
      "stepNumber": 10,
      "description": "Click checkout button",
      "action": "click",
      "selector": "[data-test='checkout']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        "#checkout",
        "button:has-text('Checkout')"
      ],
      "error_message": "Failed to click checkout button."
    },
    {
      "stepNumber": 11,
      "description": "Enter first name",
      "action": "fill",
      "selector": "[data-test='firstName']",
      "value": "chaitanya",
      "waitTimeoutMs": 3000,
      "retry": 2,
      "fallbackSelectors": [
        "#first-name",
        "input[placeholder='First Name']"
      ],
      "error_message": "Failed to enter first name."
    },
    {
      "stepNumber": 12,
      "description": "Enter last name",
      "action": "fill",
      "selector": "[data-test='lastName']",
      "value": "Kompella",
      "waitTimeoutMs": 3000,
      "retry": 2,
      "fallbackSelectors": [
        "#last-name",
        "input[placeholder='Last Name']"
      ],
      "error_message": "Failed to enter last name."
    },
    {
      "stepNumber": 13,
      "description": "Enter postal code",
      "action": "fill",
      "selector": "[data-test='postalCode']",
      "value": "62567352",
      "waitTimeoutMs": 3000,
      "retry": 2,
      "fallbackSelectors": [
        "#postal-code",
        "input[placeholder='Zip/Postal Code']"
      ],
      "error_message": "Failed to enter postal code."
    },
    {
      "stepNumber": 14,
      "description": "Click continue button",
      "action": "click",
      "selector": "[data-test='continue']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        "#continue",
        "input[value='Continue']"
      ],
      "error_message": "Failed to click continue button."
    },
    {
      "stepNumber": 15,
      "description": "Click finish button",
      "action": "click",
      "selector": "[data-test='finish']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        "#finish",
        "button:has-text('Finish')"
      ],
      "error_message": "Failed to click finish button."
    },
    {
      "stepNumber": 16,
      "description": "Verify order confirmation message",
      "action": "waitFor",
      "selector": "[data-test='complete-header']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Order confirmation message not found."
    },
    {
      "stepNumber": 17,
      "description": "Click back to products button",
      "action": "click",
      "selector": "[data-test='back-to-products']",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "fallbackSelectors": [
        "#back-to-products",
        "button:has-text('Back to products')"
      ],
      "error_message": "Failed to click back to products button."
    },
    {
      "stepNumber": 18,
      "description": "Open the burger menu",
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Failed to open burger menu."
    },
    {
      "stepNumber": 19,
      "description": "Click logout link",
      "action": "click",
      "selector": "#logout_sidebar_link",
      "waitTimeoutMs": 5000,
      "retry": 3,
      "error_message": "Failed to click logout link."
    }
  ];

  const executedSteps: string[] = [];
  const executionResults: any[] = [];
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
                try {
                  await page.locator(stepData.selector).fill(stepData.value);
                  stepDetails = `Filled ${stepData.selector} with ${stepData.value}`;
                } catch (fillError) {
                  let filled = false;
                  if (stepData.fallbackSelectors) {
                    for (const fallbackSelector of stepData.fallbackSelectors) {
                      try {
                        await page.locator(fallbackSelector).fill(stepData.value);
                        stepDetails = `Filled ${fallbackSelector} with ${stepData.value} (fallback)`;
                        filled = true;
                        break;
                      } catch (fallbackError) {
                        // Ignore fallback error, try next
                      }
                    }
                  }
                  if (!filled) {
                    throw fillError; // Re-throw original error if no fallback worked
                  }
                }
                break;
              case "click":
                try {
                  await page.locator(stepData.selector).click();
                  stepDetails = `Clicked ${stepData.selector}`;
                } catch (clickError) {
                  let clicked = false;
                  if (stepData.fallbackSelectors) {
                    for (const fallbackSelector of stepData.fallbackSelectors) {
                      try {
                        await page.locator(fallbackSelector).click();
                        stepDetails = `Clicked ${fallbackSelector} (fallback)`;
                        clicked = true;
                        break;
                      } catch (fallbackError) {
                        // Ignore fallback error, try next
                      }
                    }
                  }
                  if (!clicked) {
                    throw clickError; // Re-throw original error if no fallback worked
                  }
                }
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
      require('fs').writeFileSync('fb93b59e44bd4ff29bc3827bfe84556f.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});