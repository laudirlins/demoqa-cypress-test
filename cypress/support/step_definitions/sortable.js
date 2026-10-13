const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const SortablePage = require("../pages/SortablePage");

const sortablePage = new SortablePage();

Given("I open Sortable from the Interactions menu", () => {
  sortablePage.openFromHome();
});

When("I drag Six to the top to scramble the list", () => {
  return sortablePage.moveSixToStart();
});

When("I drag the items into ascending numeric order", () => {
  return sortablePage.sortAscending();
});

Then("the list should be in the expected ascending order", () => {
  sortablePage.assertAscendingOrder();
});