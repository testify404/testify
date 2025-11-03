import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import fs from 'fs';

test.setTimeout(120000);

test('SauceDemo E2E Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: any[] = [
    {
      "step": 1,
      "action": "goto",
      "url": "https://www.saucedemo.com/",
      "timeout": 30000,
      "retries": 3,
      "waitFor": "networkidle",
      "onError": "fail",
      "description": "Navigate to the Saucedemo login page.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/",
        "match": "exact",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 2,
      "action": "fill",
      "selector": "#user-name",
      "value": "standard_user",
      "timeout": 10000,
      "retries": 2,
      "waitFor": "visible",
      "onError": "continue",
      "description": "Enter username.",
      "assert": {
        "type": "value",
        "selector": "#user-name",
        "value": "standard_user",
        "match": "exact",
        "timeout": 3000,
        "retries": 1
      }
    },
    {
      "step": 3,
      "action": "fill",
      "selector": "#password",
      "value": "secret_sauce",
      "timeout": 10000,
      "retries": 2,
      "waitFor": "visible",
      "onError": "continue",
      "description": "Enter password.",
      "assert": {
        "type": "value",
        "selector": "#password",
        "value": "secret_sauce",
        "match": "exact",
        "timeout": 3000,
        "retries": 1
      }
    },
    {
      "step": 4,
      "action": "click",
      "selector": "#login-button",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click login button.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/inventory.html",
        "match": "contains",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 5,
      "action": "click",
      "selector": ".product_sort_container",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "visible",
      "onError": "fail",
      "description": "Click the product sort filter dropdown.",
      "assert": {
        "type": "isVisible",
        "selector": ".product_sort_container",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 6,
      "action": "click",
      "selector": ".product_sort_container > option[value='za']",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "visible",
      "onError": "fail",
      "description": "Select Name (Z to A) from the product sort filter dropdown.",
      "assert": {
        "type": "value",
        "selector": ".product_sort_container",
        "value": "za",
        "match": "exact",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 7,
      "action": "click",
      "selector": "#add-to-cart-sauce-labs-backpack",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "visible",
      "onError": "fail",
      "description": "Locate the product 'Sauce Labs Backpack' and click the Add to Cart button.",
      "assert": {
        "type": "isVisible",
        "selector": ".shopping_cart_badge",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 8,
      "action": "click",
      "selector": ".shopping_cart_link",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click on the cart icon.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/cart.html",
        "match": "contains",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 9,
      "action": "isVisible",
      "selector": ".inventory_item_name:has-text('Sauce Labs Backpack')",
      "timeout": 10000,
      "retries": 3,
      "onError": "fail",
      "description": "Ensure that the product 'Sauce Labs Backpack' is present in the cart.",
      "assert": {
        "type": "isVisible",
        "selector": ".inventory_item_name:has-text('Sauce Labs Backpack')",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 10,
      "action": "click",
      "selector": "#checkout",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click on the checkout button.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/checkout-step-one.html",
        "match": "contains",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 11,
      "action": "fill",
      "selector": "#first-name",
      "value": "chaitanya",
      "timeout": 10000,
      "retries": 2,
      "waitFor": "visible",
      "onError": "continue",
      "description": "Enter the first name.",
      "assert": {
        "type": "value",
        "selector": "#first-name",
        "value": "chaitanya",
        "match": "exact",
        "timeout": 3000,
        "retries": 1
      }
    },
    {
      "step": 12,
      "action": "fill",
      "selector": "#last-name",
      "value": "Kompella",
      "timeout": 10000,
      "retries": 2,
      "waitFor": "visible",
      "onError": "continue",
      "description": "Enter the last name.",
      "assert": {
        "type": "value",
        "selector": "#last-name",
        "value": "Kompella",
        "match": "exact",
        "timeout": 3000,
        "retries": 1
      }
    },
    {
      "step": 13,
      "action": "fill",
      "selector": "#postal-code",
      "value": "62567352",
      "timeout": 10000,
      "retries": 2,
      "waitFor": "visible",
      "onError": "continue",
      "description": "Enter the postal code.",
      "assert": {
        "type": "value",
        "selector": "#postal-code",
        "value": "62567352",
        "match": "exact",
        "timeout": 3000,
        "retries": 1
      }
    },
    {
      "step": 14,
      "action": "click",
      "selector": "#continue",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click on continue button.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/checkout-step-two.html",
        "match": "contains",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 15,
      "action": "click",
      "selector": "#finish",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click on finish button.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/checkout-complete.html",
        "match": "contains",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 16,
      "action": "isVisible",
      "selector": ".complete-header:has-text('Thank you for your order!')",
      "timeout": 10000,
      "retries": 3,
      "onError": "fail",
      "description": "Verify the success message.",
      "assert": {
        "type": "isVisible",
        "selector": ".complete-header:has-text('Thank you for your order!')",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 17,
      "action": "click",
      "selector": "#back-to-products",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click on back to home button.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/inventory.html",
        "match": "contains",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 18,
      "action": "click",
      "selector": "#react-burger-menu-btn",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "visible",
      "onError": "fail",
      "description": "Click on the burger bar.",
      "assert": {
        "type": "isVisible",
        "selector": "#logout_sidebar_link",
        "timeout": 5000,
        "retries": 1
      }
    },
    {
      "step": 19,
      "action": "click",
      "selector": "#logout_sidebar_link",
      "timeout": 10000,
      "retries": 3,
      "waitFor": "navigation",
      "onError": "fail",
      "description": "Click on logout.",
      "assert": {
        "type": "url",
        "value": "https://www.saucedemo.com/",
        "match": "exact",
        "timeout": 5000,
        "retries": 1
      }
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
        if (!process.env.KEEP_BROWSER_OPEN) {
          await browser.close();
        }
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }

    if (executionResults.length === 0) {
      executionResults.push({
        step: "No Execution",
        status: "error",
        details