Feature: Test GET request for status code and response time

  Scenario: Verify HTTP status code and response time
    Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
    Then the HTTP status code of the response should be 200
    And the response time should be below 1000 milliseconds
