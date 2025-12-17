import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";

const originalUserSteps = [
  "Open the application at https://www.saucedemo.com/",
  "Click on the element with the attribute 'data-test' equal to 'username'",
  "Enter 'standard_user' into the element with the attribute 'data-test' equal to 'username'",
  "Click on the element with the attribute 'data-test' equal to 'password'",
  "Enter 'secret_sauce' into the element with the attribute 'data-test' equal to 'password'",
  "Click on the element with the id 'login-button'"
];

const executedSteps: string[] = [];
const executionResults: any[] = [];
let browser: Browser | null = null;
let page: Page | null = null;
let setupError = false;

test('Generated Test', async () => {
  try {
    // Browser setup with its own error handling
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

    // Only proceed with steps if setup succeeded
    if (!setupError && page) {
      // Handle empty steps case
      if (originalUserSteps.length === 0) {
        executionResults.push({
          step: "No Steps Provided",
          status: "error",
          details: "No user steps provided",
          timestamp: Date.now(),
          duration_ms: 0
        });
      } else {
        // Execute each step with individual error handling
        for (const stepData of originalUserSteps) {
          const startTime = Date.now();
          let stepStatus = "success";
          let stepDetails = "";

          try {
            // goto: await page.goto(value) → details: "Navigated to [url]"
            if (stepData.startsWith('Open the application at ')) {
              const url = stepData.replace('Open the application at ', '');
              await page.goto(url);
              stepDetails = `Navigated to ${url}`;
            }
            // click: await page.locator(selector).click() → details: "Clicked [selector]"
            else if (stepData.startsWith('Click on the element with the attribute ')) {
              const selector = stepData.replace('Click on the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              await page.locator(selector).click();
              stepDetails = `Clicked ${selector}`;
            }
            // fill: await page.locator(selector).fill(value) → details: "Filled [selector]"
            else if (stepData.startsWith('Enter ') && stepData.includes(' into the element with the attribute ')) {
              const selector = stepData.replace('Enter ', '').replace(' into the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              const value = stepData.replace(stepData.substring(0, stepData.indexOf(' into the element')), '');
              await page.locator(selector).fill(value);
              stepDetails = `Filled ${selector} with '${value}'`;
            }
            // check: await page.locator(selector).check() → details: "Checked [selector]"
            else if (stepData.startsWith('Check the element with the attribute ')) {
              const selector = stepData.replace('Check the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              await page.locator(selector).check();
              stepDetails = `Checked ${selector}`;
            }
            // uncheck: await page.locator(selector).uncheck() → details: "Unchecked [selector]"
            else if (stepData.startsWith('Uncheck the element with the attribute ')) {
              const selector = stepData.replace('Uncheck the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              await page.locator(selector).uncheck();
              stepDetails = `Unchecked ${selector}`;
            }
            // hover: await page.locator(selector).hover() → details: "Hovered [selector]"
            else if (stepData.startsWith('Hover over the element with the attribute ')) {
              const selector = stepData.replace('Hover over the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              await page.locator(selector).hover();
              stepDetails = `Hovered ${selector}`;
            }
            // waitFor: await page.locator(selector).waitFor() → details: "Waited for [selector]"
            else if (stepData.startsWith('Wait for the element with the attribute ')) {
              const selector = stepData.replace('Wait for the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              await page.locator(selector).waitFor();
              stepDetails = `Waited for ${selector}`;
            }
            // isVisible: Check visibility → details: "Element [selector] is visible" or "Element [selector] is not visible"
            else if (stepData.startsWith('Check if the element with the attribute ')) {
              const selector = stepData.replace('Check if the element with the attribute ', '').replace(' equal to ', '').replace('\'', '');
              const isVisible = await page.locator(selector).isVisible();
              stepDetails = `${selector} is ${isVisible ? 'visible' : 'not visible'}`;
            }
            // If none of the above steps, push an error
            else {
              stepStatus = "error";
              stepDetails = `Unknown step: ${stepData}`;
            }
          } catch (stepError) {
            stepStatus = "error";
            stepDetails = `Failed to execute: ${stepData}. Error: ${stepError.message}`;
          }

          const endTime = Date.now();
          executedSteps.push(stepData);
          executionResults.push({
            step: stepData,
            status: stepStatus,
            details: stepDetails,
            timestamp: startTime,
            duration_ms: endTime - startTime
          });
        }
      }
    }
  } catch (unexpectedError) {
    // Only add this if no other results exist
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
    // Guaranteed cleanup and return
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        // Log but don't fail - we still need to return results
      }
    }

    // Ensure we always have at least one result
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
      require('fs').writeFileSync('15f5a6de4b4a40e7bc8f834ee596db2b.json', JSON.stringify(result, null, 2));
    } catch (writeError) {
      // File write failed but we still return results
    }

    // GUARANTEED RETURN - This must ALWAYS execute
    return result;
  }
});