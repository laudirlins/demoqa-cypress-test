const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const ProgressBarPage = require("../pages/ProgressBarPage");

const progressBarPage = new ProgressBarPage();

Given("I open the Progress Bar from the Widgets menu", () => {
  progressBarPage.openFromHome();
});

When("I start the progress bar and stop below 25 percent", () => {
  progressBarPage.start();
  progressBarPage.waitForProgressValue(22);
  progressBarPage.stop();
});

Then("the progress should be at most 25 percent", () => {
  progressBarPage.progressValue().should((value) => {
    expect(value).to.be.at.most(25);
  });
});

When("I resume the progress bar until it completes", () => {
  progressBarPage.start();
  progressBarPage.waitUntilComplete();
});

Then("the progress should reach 100 percent", () => {
  progressBarPage.progressValue().should("equal", 100);
});

When("I reset the progress bar", () => {
  progressBarPage.reset();
});

Then("the progress should return to zero", () => {
  cy.get("[role='progressbar']").should("have.attr", "aria-valuenow", "0");
  cy.contains("button", "Start").should("be.visible");
});