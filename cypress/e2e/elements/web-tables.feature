# language: en
Feature: Web table records
  As a DemoQA user
  I want to create, edit, and delete records
  So that I can keep the table data up to date

  Scenario: Create, edit, and delete a record
    Given I open Web Tables from the Elements menu
    When I create a test record
    Then the new record should appear in the table
    When I edit the created record
    Then the updated details should appear in the table
    When I delete the created record
    Then the record should no longer appear in the table

  Scenario: Dynamically create and delete twelve records
    Given I open Web Tables from the Elements menu
    When I dynamically create these records:
      | firstName | lastName | department |
      | Amelia    | Smith    | Quality Assurance |
      | Benjamin  | Jones    | Engineering       |
      | Charlotte | Brown    | Product           |
      | Daniel    | Davis    | Support           |
      | Evelyn    | Wilson   | Finance           |
      | Felix     | Moore    | Operations        |
      | Grace     | Taylor   | Quality Assurance |
      | Henry     | Anderson | Engineering       |
      | Isabella  | Thomas   | Product           |
      | Jacob     | Jackson  | Support           |
      | Katherine | White    | Finance           |
      | Liam      | Harris   | Operations        |
    Then all twelve records should appear in the table
    When I delete all created records
    Then none of the twelve records should remain in the table