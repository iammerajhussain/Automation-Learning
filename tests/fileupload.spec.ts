import { test, expect } from '@playwright/test';
//import path from 'path';

const URL = 'https://www.qaplayground.com/practice/file-upload';

// Sample file paths
//const validFile = path.join(__dirname, 'test-data/sample.txt');
const validFile = 'file:///C:/Users/meraj.hussain/Downloads/dummy-pdf_2---%20__.pdf';
const invalidFile = 'file:///C:/Users/meraj.hussain/Downloads/Leads_10012782_1774969964.exe';

test('TC01: Verify a file can be selected for upload', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Locate file input
  const fileInput = page.getByTestId('file-upload-input');

  // 3. Select file
  await fileInput.setInputFiles(validFile);

  // 4. Assert filename displayed
  const uploadedFileName = page.getByTestId('selected-file-name');

  await expect(uploadedFileName).toContainText('sample.txt');

});

// --------------------------------------------------
// ✅ TC02: Verify selected filename is displayed
// --------------------------------------------------
test('TC02: Verify selected file name is displayed after selection', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Select file
  await page
    .getByTestId('file-upload-input')
    .setInputFiles(validFile);

  // 3. Verify displayed filename
  await expect(
    page.getByTestId('selected-file-name')
  ).toHaveText(/sample\.txt/i);

});

// --------------------------------------------------
// ✅ TC03: Verify upload button enabled after file selection
// --------------------------------------------------
test('TC03: Verify upload button is enabled after file selection', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  const uploadButton = page.getByTestId('btn-upload');

  // 2. Verify initially disabled
  await expect(uploadButton).toBeDisabled();

  // 3. Select file
  await page
    .getByTestId('file-upload-input')
    .setInputFiles(validFile);

  // 4. Verify button enabled
  await expect(uploadButton).toBeEnabled();

});

// --------------------------------------------------
// ✅ TC04: Verify upload starts after clicking upload
// --------------------------------------------------
test('TC04: Verify file upload starts on clicking upload button', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Select valid file
  await page
    .getByTestId('file-upload-input')
    .setInputFiles(validFile);

  // 3. Click upload
  await page.getByTestId('btn-upload').click();

  // 4. Assert upload indicator/success visible
  const uploadStatus = page.getByTestId('upload-progress');

  await expect(uploadStatus).toBeVisible();

});

// --------------------------------------------------
// ✅ TC05: Verify success message after upload
// --------------------------------------------------
test('TC05: Verify success message appears after upload', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Select file and upload
  await page
    .getByTestId('file-upload-input')
    .setInputFiles(validFile);

  await page.getByTestId('btn-upload').click();

  // 3. Wait for upload completion
  const successMessage = page.getByTestId('upload-success-msg');

  // 4. Assert success message
  await expect(successMessage).toBeVisible();

  await expect(successMessage).toContainText(/upload successful/i);

});

// --------------------------------------------------
// ✅ TC06: Verify error for unsupported file type
// --------------------------------------------------
test('TC06: Verify error message for unsupported file type', async ({ page }) => {

  // 1. Navigate
  await page.goto(URL);

  // 2. Select unsupported file
  await page
    .getByTestId('file-upload-input')
    .setInputFiles(invalidFile);

  // 3. Attempt upload
  await page.getByTestId('btn-upload').click();

  // 4. Verify error message
  const errorMessage = page.getByTestId('upload-error-msg');

  await expect(errorMessage).toBeVisible();

  await expect(errorMessage).toContainText(
    /unsupported file type/i
  );

});