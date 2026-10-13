# language: en
Feature: Sortable list
  As a DemoQA visitor
  I want to sort the list in ascending numeric order
  So that I can verify drag-and-drop behavior

  Scenario: Reorder list items in ascending numeric order
    Given I open Sortable from the Interactions menu
    When I drag Six to the top to scramble the list
    And I drag the items into ascending numeric order
    Then the list should be in the expected ascending order