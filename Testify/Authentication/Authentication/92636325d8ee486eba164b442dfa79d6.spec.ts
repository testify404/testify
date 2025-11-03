import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import * as fs from 'fs';

test('Saucedemo Purchase Flow', async () => {
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
          "step": 1,
          "action": "goto",
          "url": "https://www.saucedemo.com/",
          "description": "Navigate to the Saucedemo website.",
          "waitStrategy": "load",
          "timeout": 10000,
          "errorHandling": "retry",
          "retries": 3
        },
        {
          "step": 2,
          "action": "fill",
          "selector": {
            "type": "id",
            "value": "user-name"
          },
          "text": "standard_user",
          "description": "Enter username.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "username"
            },
            {
              "type": "placeholder",
              "value": "Username"
            }
          ]
        },
        {
          "step": 3,
          "action": "fill",
          "selector": {
            "type": "id",
            "value": "password"
          },
          "text": "secret_sauce",
          "description": "Enter password.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "password"
            },
            {
              "type": "placeholder",
              "value": "Password"
            }
          ]
        },
        {
          "step": 4,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "login-button"
          },
          "description": "Click the login button.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "retry",
          "retries": 2,
          "altSelectors": [
            {
              "type": "data-test",
              "value": "login-button"
            },
            {
              "type": "value",
              "value": "Login"
            }
          ]
        },
        {
          "step": 5,
          "action": "click",
          "selector": {
            "type": "class",
            "value": "product_sort_container"
          },
          "description": "Click the product sort filter dropdown.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "product-sort-container"
            }
          ]
        },
        {
          "step": 6,
          "action": "click",
          "selector": {
            "type": "xpath",
            "value": "//select[@class='product_sort_container']/option[@value='za']"
          },
          "description": "Select Name (Z to A) from the product sort filter dropdown.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "value",
              "value": "za"
            }
          ]
        },
        {
          "step": 7,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "add-to-cart-sauce-labs-backpack"
          },
          "description": "Locate the product \"Sauce Labs Backpack\" and click the Add to cart button.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "retry",
          "retries": 2,
          "altSelectors": [
            {
              "type": "data-test",
              "value": "add-to-cart-sauce-labs-backpack"
            },
            {
              "type": "text",
              "value": "Add to cart"
            }
          ]
        },
        {
          "step": 8,
          "action": "click",
          "selector": {
            "type": "class",
            "value": "shopping_cart_link"
          },
          "description": "Click on the cart icon.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "shopping-cart-link"
            }
          ]
        },
        {
          "step": 9,
          "action": "isVisible",
          "selector": {
            "type": "xpath",
            "value": "//div[@class='cart_item']//div[@class='inventory_item_name' and text()='Sauce Labs Backpack']"
          },
          "description": "Ensure that the product \"Sauce Labs Backpack\" is present in the cart.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "inventory-item-name"
            },
            {
              "type": "text",
              "value": "Sauce Labs Backpack"
            }
          ]
        },
        {
          "step": 10,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "checkout"
          },
          "description": "Click on the checkout button.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "checkout"
            }
          ]
        },
        {
          "step": 11,
          "action": "fill",
          "selector": {
            "type": "id",
            "value": "first-name"
          },
          "text": "chaitanya",
          "description": "Enter the first name.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "firstName"
            },
            {
              "type": "placeholder",
              "value": "First Name"
            }
          ]
        },
        {
          "step": 12,
          "action": "fill",
          "selector": {
            "type": "id",
            "value": "last-name"
          },
          "text": "Kompella",
          "description": "Enter the last name.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "lastName"
            },
            {
              "type": "placeholder",
              "value": "Last Name"
            }
          ]
        },
        {
          "step": 13,
          "action": "fill",
          "selector": {
            "type": "id",
            "value": "postal-code"
          },
          "text": "62567352",
          "description": "Enter the postal code.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "postalCode"
            },
            {
              "type": "placeholder",
              "value": "Zip/Postal Code"
            }
          ]
        },
        {
          "step": 14,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "continue"
          },
          "description": "Click on continue button.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "continue"
            }
          ]
        },
        {
          "step": 15,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "finish"
          },
          "description": "Click on finish button.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "finish"
            }
          ]
        },
        {
          "step": 16,
          "action": "isVisible",
          "selector": {
            "type": "class",
            "value": "complete-header"
          },
          "description": "Verify the success message.",
          "waitStrategy": "visible",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "text",
              "value": "Thank you for your order!"
            }
          ]
        },
        {
          "step": 17,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "back-to-products"
          },
          "description": "Click on back to home button.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict",
          "altSelectors": [
            {
              "type": "data-test",
              "value": "back-to-products"
            }
          ]
        },
        {
          "step": 18,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "react-burger-menu-btn"
          },
          "description": "Click on the burger bar.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict"
        },
        {
          "step": 19,
          "action": "click",
          "selector": {
            "type": "id",
            "value": "logout_sidebar_link"
          },
          "description": "Click on logout.",
          "waitStrategy": "clickable",
          "timeout": 5000,
          "errorHandling": "strict"
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
                await page.goto(stepData.url);
                stepDetails = `Navigated to ${stepData.url}`;
                break;
              case "fill":
                await page.locator(stepData.selector.value).fill(stepData.text);
                stepDetails = `Filled ${stepData.selector.value} with ${stepData.text}`;
                break;
              case "click":
                await page.locator(stepData.selector.value).click();
                stepDetails = `Clicked ${stepData.selector.value}`;
                break;
              case "check":
                await page.locator(stepData.selector.value).check();
                stepDetails = `Checked ${stepData.selector.value}`;
                break;
              case "uncheck":
                await page.locator(stepData.selector.value).uncheck();
                stepDetails = `Unchecked ${stepData.selector.value}`;
                break;
              case "hover":
                await page.locator(stepData.selector.value).hover();
                stepDetails = `Hovered ${stepData.selector.value}`;
                break;
              case "waitFor":
                await page.locator(stepData.selector.value).waitFor();
                stepDetails = `Waited for ${stepData.selector.value}`;
                break;
              case "isVisible":
                const isVisible = await page.locator(stepData.selector.value).isVisible();
                stepDetails = `Element ${stepData.selector.value} is ${isVisible ? 'visible' : 'not visible'}`;
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
      fs.writeFileSync('92636325d8ee486eba164b442dfa79d6.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      console.error("Error writing to test_result.json:", writeError);
    }

    return result;
  }
});