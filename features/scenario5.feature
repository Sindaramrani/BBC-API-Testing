Feature: Verify transmission dates

Scenario: Verify "transmission_start" date is before "transmission_end" date
  Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
  Then the "transmission_start" date value should be before the "transmission_end" date
