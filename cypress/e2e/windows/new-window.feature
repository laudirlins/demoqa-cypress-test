# language: en
Feature: Browser windows
  As a DemoQA visitor
  I want to open a new browser window
  So that I can verify its content

  Scenario: Open, verify, and close the sample window
    Given I open Browser Windows from the home page
    When I request a new browser window
    Then the new window should show "This is a sample page"
    And I close the sample window and return to Browser Windows