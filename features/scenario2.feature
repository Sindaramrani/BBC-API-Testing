Feature: Verify ID and Type fields

  Scenario: Verify "id" field is not null or empty and "type" is always "episode"
    Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
    Then the "id" field should never be null or empty for all items in the data array
    And the "type" in "episode" for every item should always be "episode"

   

