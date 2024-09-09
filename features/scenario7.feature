Feature: Test error status for non-existent resource

  Scenario: Verify 404 status code and error object
    Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest/2023-09-11"
    Then the HTTP status code of the response should be 404
    And the error object should have the properties "details" and "http_response_code"
