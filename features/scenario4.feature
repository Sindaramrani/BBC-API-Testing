Feature: Verify only one episode has live field true

Scenario: Verify only one episode has "live" field as true
  Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
  Then only one episode should have "live" field in "episode" as "true"
