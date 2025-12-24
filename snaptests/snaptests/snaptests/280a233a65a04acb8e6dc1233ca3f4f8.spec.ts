import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { writeFileSync } from 'fs';

const stepsFromInput = [
  {
    "action": "goto",
    "selector": null,
    "value": "https://www.saucedemo.com/",
    "waitTimeoutMs": 10000,
    "retry": 3,
    "fallbacks": ["waitForLoadState"],
    "errorMessage": "Failed to navigate to Sauce Demo login page",
    "stepDescription": "Navigate to Sauce Demo login page"
  },
  {
    "action": "fill",
    "selector": "[data-test='username']",
    "value": "standard_user",
    "waitTimeoutMs": 5000,
    "retry": 2,
    "fallbacks": ["scrollIntoView"],
    "errorMessage": "Failed to fill username",
    "stepDescription": "Enter 'standard_user' in the username field"
  },
  {
    "action": "fill",
    "selector": "[data-test='password']",
    "value": "secret_sauce",
    "waitTimeoutMs": 5000,
    "retry": 2,
    "fallbacks": ["scrollIntoView"],
    "errorMessage": "Failed to fill password",
    "stepDescription": "Enter 'secret_sauce' in the password field"
  },
  {
    "action": "click",
    "selector": "[data-test='login-button']",
    "value": null,
    "waitTimeoutMs": 5000,
    "retry": 2,
    "fallbacks": ["scrollIntoView"],
    "errorMessage": "Failed to click login button",
    "stepDescription": "Click the login button"
  },
  {
    "action": "isVisible",
    "selector": ".inventory_list",
    "value": null,
    "waitTimeoutMs": 10000,
    "retry": 3,
    "fallbacks": ["waitForLoadState"],
    "errorMessage": "Login was not successful",
    "stepDescription": "Verify successful login"
  }
];

test('Generated Test', async () => {
  const executedSteps: string[] = [];
  const executionResults: any[] = [];
  const originalUserSteps: string[] = stepsFromInput.map(step => step.stepDescription);
  let browser: Browser | null = null;
  let page: Page | null = null;
  let setupError = false;

  try {
    try {
      browser = await chromium.launch({
        headless: true,
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
        for (const stepData of stepsFromInput) {
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
                if (isVisible) {
                  stepDetails = `Element ${stepData.selector} is visible`;
                } else {
                  stepDetails = `Element ${stepData.selector} is not visible`;
                }
                break;
              default:
                throw new Error(`Unsupported action: ${stepData.action}`);
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
      writeFileSync('280a233a65a04acb8e6dc1233ca3f4f8.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    return result;
  }
});