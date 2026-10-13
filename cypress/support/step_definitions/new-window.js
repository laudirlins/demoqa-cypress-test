const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const BrowserWindowsPage = require("../pages/BrowserWindowsPage");

const browserWindowsPage = new BrowserWindowsPage();

Given("I open Browser Windows from the home page", () => {
  browserWindowsPage.openFromHome();
});

When("I request a new browser window", function () {
  browserWindowsPage.captureWindowOpen();
  browserWindowsPage.clickNewWindow();
  return browserWindowsPage.getNewWindowUrl().then((url) => {
    this.newWindowUrl = url;
  });
});

Then('the new window should show {string}', function (message) {
  browserWindowsPage.visitSamplePage(this.newWindowUrl);
  cy.get("#sampleHeading").should("have.text", message);
});

Then("I close the sample window and return to Browser Windows", () => {
  browserWindowsPage.closeNewWindowAndReturn();
});