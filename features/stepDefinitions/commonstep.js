// Import the necessary modules for testing and HTTP requests
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert'); 

// Variables to hold the response and measure request time
let response;
let startTime;
let endTime;

// Step to send a GET request and measure time taken
Given('I make a GET request to {string}', async (url) => {
    startTime = Date.now(); // Record start time
    try {
        response = await axios.get(url); // Send GET request
    } catch (err) {
        response = err.response; // Store error response if any
    } finally {
        endTime = Date.now(); // Record end time
    }
});

// Check if the response has the expected status code
Then('the HTTP status code of the response should be {int}', (statusCode) => {
    assert.strictEqual(response.status, statusCode); // Assert status code matches
});

// Ensure response time is under a certain limit
Then('the response time should be below {int} milliseconds', (timeLimit) => {
    const responseTime = endTime - startTime; // Calculate time taken
    assert.ok(responseTime <= timeLimit, `Response took ${responseTime}ms, should be less than ${timeLimit}ms`);
});

// Ensure a specific field is never null or empty in the response data array
Then('the {string} field should never be null or empty for all items in the data array', (field) => {
    const items = response.data; // Access data array
    items.forEach(item => {
        assert.ok(item[field] !== null && item[field] !== '', `Field ${field} is null or empty`);
    });
});

// Check that every item has a specific field in a subfield with a given value
Then('the {string} in {string} for every item should always be {string}', (field, subField, value) => {
    const items = response.data;
    items.forEach(item => {
        assert.strictEqual(item[subField][field], value, `Expected ${subField}.${field} to be ${value}`);
    });
});

// Ensure a specific field in a subfield is not null or empty for all items
Then('the {string} field in {string} should never be null or empty for any schedule item', (field, subField) => {
    const items = response.data;
    items.forEach(item => {
        assert.ok(item[subField][field] !== null && item[subField][field] !== '', `Field ${subField}.${field} is null or empty`);
    });
});

// Ensure only one episode has a specific field in a subfield with a certain value
Then('only one episode should have {string} field in {string} as {string}', (field, subField, value) => {
    const items = response.data;
    const filteredEpisodes = items.filter(item => item[subField][field] === (value === 'true'));
    assert.strictEqual(filteredEpisodes.length, 1, `Expected 1 episode with ${subField}.${field} as ${value}, but found ${filteredEpisodes.length}`);
});

// Check that a start date is always before an end date for each item
Then('the {string} date value should be before the {string} date', (startField, endField) => {
    const items = response.data;
    items.forEach(item => {
        const startDate = new Date(item[startField]);
        const endDate = new Date(item[endField]);
        assert.ok(startDate < endDate, `Expected ${startField} (${startDate}) to be before ${endField} (${endDate})`);
    });
});

// Ensure the response headers contain a specific value
Then('the response headers should contain the {string} value', (headerName) => {
    assert.ok(response.headers[headerName.toLowerCase()] !== undefined, `Header ${headerName} was not found`);
});

// Validate that an error object contains specific properties
Then('the error object should have the properties {string} and {string}', (field1, field2) => {
    const errorObject = response.data.error;
    assert.ok(errorObject[field1] !== undefined, `Error object missing field ${field1}`);
    assert.ok(errorObject[field2] !== undefined, `Error object missing field ${field2}`);
});


