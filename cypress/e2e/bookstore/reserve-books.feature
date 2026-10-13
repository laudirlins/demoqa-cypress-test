# language: en
Feature: Book reservations
  As a DemoQA Book Store user
  I want to create an account and reserve books
  So that I can view my reservations

  Scenario: Create a user, reserve two books, and view the account details
    Given I have unique credentials for a new user
    When I create the user and generate an access token
    Then the user should be authorized
    When I list the available books and reserve two titles
    Then the user details should include both reserved books