# language: en
Feature: Progress bar controls
  As a DemoQA visitor
  I want to start, stop, resume, and reset the progress bar
  So that I can verify each state

  Scenario: Stop below 25%, complete, and reset the progress bar
    Given I open the Progress Bar from the Widgets menu
    When I start the progress bar and stop below 25 percent
    Then the progress should be at most 25 percent
    When I resume the progress bar until it completes
    Then the progress should reach 100 percent
    When I reset the progress bar
    Then the progress should return to zero