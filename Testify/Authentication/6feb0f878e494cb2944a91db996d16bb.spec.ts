import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test.setTimeout(120000);

test('SauceDemo End-to-End Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = [
    "Navigate to the Saucedemo login page",
    "Enter username",
    "Enter password",
    "Click login button",
    "Click product sort dropdown",
    "Select 'Name (Z to A)' from the sort dropdown",
    "Add Sauce Labs Backpack to cart",
    "Click the cart icon",
    "Assert that Sauce Labs Backpack is in the cart",
    "Click checkout button",
    "Enter first name",
    "Enter last name",
    "Enter postal code",
    "Click continue button",
    "Click finish button",
    "Assert that the thank you message is displayed",
    "Click back to home button",
    "Click burger menu button",
    "Click logout button"
  ];

  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  try {
    try {
      browser = await chromium.launch({
        headless: false,
        slowMo: 50,
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
          "url": "https://www.saucedemo.com/",
          "description": "Navigate to the Saucedemo login page",
          "wait_options": {
            "wait_until": "domcontentloaded",
            "timeout": 10000
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "fill",
          "selector": "#user-name",
          "value": "standard_user",
          "description": "Enter username",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "attached"
          },
          "error_handling": {
            "retry": 2,
            "on_error": "continue"
          }
        },
        {
          "action": "fill",
          "selector": "#password",
          "value": "secret_sauce",
          "description": "Enter password",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "attached"
          },
          "error_handling": {
            "retry": 2,
            "on_error": "continue"
          }
        },
        {
          "action": "click",
          "selector": "#login-button",
          "description": "Click login button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": ".product_sort_container",
          "description": "Click product sort dropdown",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "//select[@class='product_sort_container']/option[text()='Name (Z to A)']",
          "description": "Select 'Name (Z to A)' from the sort dropdown",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "#add-to-cart-sauce-labs-backpack",
          "description": "Add Sauce Labs Backpack to cart",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": ".shopping_cart_link",
          "description": "Click the cart icon",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "isVisible",
          "selector": "//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']",
          "description": "Assert that Sauce Labs Backpack is in the cart",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "#checkout",
          "description": "Click checkout button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "fill",
          "selector": "#first-name",
          "value": "chaitanya",
          "description": "Enter first name",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "attached"
          },
          "error_handling": {
            "retry": 2,
            "on_error": "continue"
          }
        },
        {
          "action": "fill",
          "selector": "#last-name",
          "value": "Kompella",
          "description": "Enter last name",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "attached"
          },
          "error_handling": {
            "retry": 2,
            "on_error": "continue"
          }
        },
        {
          "action": "fill",
          "selector": "#postal-code",
          "value": "62567352",
          "description": "Enter postal code",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "attached"
          },
          "error_handling": {
            "retry": 2,
            "on_error": "continue"
          }
        },
        {
          "action": "click",
          "selector": "#continue",
          "description": "Click continue button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "#finish",
          "description": "Click finish button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "isVisible",
          "selector": "//h2[text()='Thank you for your order!']",
          "description": "Assert that the thank you message is displayed",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "#back-to-products",
          "description": "Click back to home button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "#react-burger-menu-btn",
          "description": "Click burger menu button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
        },
        {
          "action": "click",
          "selector": "#logout_sidebar_link",
          "description": "Click logout button",
          "wait_options": {
            "wait_for": "selector",
            "timeout": 5000,
            "state": "visible"
          },
          "error_handling": {
            "retry": 3,
            "on_error": "fail"
          }
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
                await page.goto(stepData.url, { waitUntil: stepData.wait_options?.wait_until, timeout: stepData.wait_options?.timeout });
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
      fs.writeFileSync('6feb0f878e494cb2944a91db996d16bb.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});