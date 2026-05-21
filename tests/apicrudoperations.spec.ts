import { test, expect } from '@playwright/test';

//GET Method API Test

test('Simple GET API Test', async ({ request }) => {

  // Send GET request
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  // Validate status code
  expect(response.status()).toBe(200);

  // Convert response to JSON
  const responseBody = await response.json();

  // Print response
  console.log(responseBody);

  // Validate response data
  expect(responseBody.id).toBe(1);
  expect(responseBody.name).toBe('Leanne Graham');
  expect(responseBody.email).toContain('@');
});

//POST Method API Test

test('Simple POST API Test', async ({ request }) => {

  // Request Payload
  const requestBody = {
    title: 'Playwright API Testing',
    body: 'Learning POST API in Playwright',
    userId: 1
  };

  // Send POST Request
  const response = await request.post('https://jsonplaceholder.typicode.com/posts',
    {
      data: requestBody
    }
  );

  // Validate Status Code
  expect(response.status()).toBe(201);

  // Convert response into JSON
  const responseBody = await response.json();

  // Print response
  console.log(responseBody);

  // Validate response data
  expect(responseBody.title).toBe('Playwright API Testing');
  expect(responseBody.body).toContain('POST API');
  expect(responseBody.userId).toBe(1);

  // Validate auto-generated ID
  expect(responseBody.id).toBeTruthy();
});

//PUT/UPDATE Method API Test

test('Simple PUT API Test', async ({ request }) => {

  // Updated Request Payload
  const requestBody = {
    id: 1,
    title: 'Playwright API Testing -> Updated',
    body: 'Learning POST API in Playwright -> Updated',
    userId: 1
  };

  // Send PUT Request
  const response = await request.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    {
      data: requestBody
    }
  );

  // Validate Status Code
  expect(response.status()).toBe(200);

  // Convert response to JSON
  const responseBody = await response.json();

  // Print response
  console.log(responseBody);

  // Validate updated response data
  expect(responseBody.id).toBe(1);
  expect(responseBody.title).toBe('Playwright API Testing -> Updated');
  expect(responseBody.body).toContain('Updated');
  expect(responseBody.userId).toBe(1);
});

// PATCH Method API Test

test('Simple PATCH API Test', async ({ request }) => {

  // Partial Update Payload
  const requestBody = {
    title: 'Partially Updated Title'
  };

  // Send PATCH Request
  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1',
    {
      data: requestBody
    }
  );

  // Validate Status Code
  expect(response.status()).toBe(200);

  // Convert response to JSON
  const responseBody = await response.json();

  // Print response
  console.log(responseBody);

  // Validate updated field
  expect(responseBody.title).toBe('Partially Updated Title');

  // Validate existing data still present
  expect(responseBody.id).toBe(1);
});

// DELETE Method API Test

test('Simple DELETE API Test', async ({ request }) => {

  // Send DELETE Request
  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

  // Validate Status Code
  expect(response.status()).toBe(200);

  // Print response status
  console.log('Delete Status Code:', response.status());

  // Convert response to text
  const responseBody = await response.text();

  // Print response body
  console.log('DELETE Response:', responseBody);

  // Validate response body is empty
  expect(responseBody).toBe('{}');
});