import { test, expect, request } from '@playwright/test';

// Base API URL
const BASE_URL = 'https://reqres.in/api';

test.describe('API Testing with Playwright', () => {

  /**
   * TC01:
   * Verify GET API response status and body data
   */
  test('TC01 - Get user details and validate response', async () => {

    // Create API request context
    const apiContext = await request.newContext();

    // Send GET request
    const response = await apiContext.get(`${BASE_URL}/users/2`);

    // Validate status code
    expect(response.status()).toBe(200);

    // Convert response to JSON
    const responseBody = await response.json();

    console.log('GET Response:', responseBody);

    // Validate response body
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.first_name).toBe('Janet');
    expect(responseBody.data.last_name).toBe('Weaver');
    expect(responseBody.data.email).toContain('@reqres.in');
  });

  /**
   * TC02:
   * Verify POST API request and response
   */
  test('TC02 - Create new user and validate response', async () => {

    const apiContext = await request.newContext();

    // Request payload
    const requestBody = {
      name: 'Meraj',
      job: 'QA Engineer'
    };

    // Send POST request
    const response = await apiContext.post(`${BASE_URL}/users`, {
      data: requestBody
    });

    // Validate status code
    expect(response.status()).toBe(201);

    // Convert response to JSON
    const responseData = await response.json();

    console.log('POST Response:', responseData);

    // Validate response data
    expect(responseData.name).toBe('Meraj');
    expect(responseData.job).toBe('QA Engineer');

    // Validate dynamic fields
    expect(responseData.id).toBeTruthy();
    expect(responseData.createdAt).toBeTruthy();
  });

  /**
   * TC03:
   * Verify PUT API request and response
   */
  test('TC03 - Update user details and validate response', async () => {

    const apiContext = await request.newContext();

    const updatedData = {
      name: 'Meraj Hussain',
      job: 'Senior QA Engineer'
    };

    // Send PUT request
    const response = await apiContext.put(`${BASE_URL}/users/2`, {
      data: updatedData
    });

    // Validate status code
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('PUT Response:', responseBody);

    // Validate updated values
    expect(responseBody.name).toBe(updatedData.name);
    expect(responseBody.job).toBe(updatedData.job);

    // Validate updated timestamp
    expect(responseBody.updatedAt).toBeTruthy();
  });

  /**
   * TC04:
   * Verify DELETE API request
   */
  test('TC04 - Delete user and validate response', async () => {

    const apiContext = await request.newContext();

    // Send DELETE request
    const response = await apiContext.delete(`${BASE_URL}/users/2`);

    // Validate status code
    expect(response.status()).toBe(204);
  });

});