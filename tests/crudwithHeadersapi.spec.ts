import { test, expect } from '@playwright/test';

test.describe('CRUD Operations with Headers and Authorization', () => {

  // Common Headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sample_token_12345',
    'x-api-key': 'demo-api-key'
  };

  // ------------------ GET ------------------

  test('GET API Request', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        headers: headers
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('GET Response:', responseBody);

    expect(responseBody.id).toBe(1);
  });

  // ------------------ POST ------------------

  test('POST API Request', async ({ request }) => {

    const requestBody = {
      title: 'Playwright CRUD',
      body: 'POST Request Example',
      userId: 1
    };

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        headers: headers,
        data: requestBody
      }
    );

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    console.log('POST Response:', responseBody);

    expect(responseBody.title).toBe('Playwright CRUD');
  });

  // ------------------ PUT ------------------

  test('PUT API Request', async ({ request }) => {

    const requestBody = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1
    };

    const response = await request.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        headers: headers,
        data: requestBody
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('PUT Response:', responseBody);

    expect(responseBody.title).toBe('Updated Title');
  });

  // ------------------ PATCH ------------------

  test('PATCH API Request', async ({ request }) => {

    const requestBody = {
      title: 'Patched Title'
    };

    const response = await request.patch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        headers: headers,
        data: requestBody
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('PATCH Response:', responseBody);

    expect(responseBody.title).toBe('Patched Title');
  });

  // ------------------ DELETE ------------------

  test('DELETE API Request', async ({ request }) => {

    const response = await request.delete(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        headers: headers
      }
    );

    expect(response.status()).toBe(200);

    console.log('DELETE Status:', response.status());

    const responseBody = await response.text();

    console.log('DELETE Response:', responseBody);

    expect(responseBody).toBe('{}');
  });

});