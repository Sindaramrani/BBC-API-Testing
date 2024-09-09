Feature: Verify Title field in Episode

  Scenario: Verify "title" field in "episode" is not null or empty
    Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
    Then the "title" field in "episode" should never be null or empty for any schedule item

