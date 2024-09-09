Feature: Verify response header Date

  Scenario: Verify "Date" header in the response
    Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
    Then the response headers should contain the "Date" value
