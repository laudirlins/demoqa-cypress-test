# language: en
Feature: Student registration
  As a DemoQA visitor
  I want to complete the practice form
  So that I can verify the submitted details

  Scenario: Complete and submit the student registration form
    Given I open the Practice Form from the home page
    When I fill in the form with realistic random data
    And I submit the form
    Then the confirmation dialog should show the submitted details
    And I close the confirmation dialog