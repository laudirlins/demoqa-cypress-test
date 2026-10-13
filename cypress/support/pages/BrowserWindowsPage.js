const DemoQaPage = require("./DemoQaPage");

class BrowserWindowsPage extends DemoQaPage {
  openFromHome() {
    this.openSectionPage(
      "Alerts, Frame & Windows",
      "Browser Windows",
      "#windowButton",
    );
  }

  captureWindowOpen() {
    cy.window().then((browserWindow) => {
      cy.stub(browserWindow, "open").as("newWindow");
    });
  }

  clickNewWindow() {
    cy.get("#windowButton").click();
  }

  getNewWindowUrl() {
    return cy
      .get("@newWindow")
      .should("have.been.calledOnce")
      .then((openStub) => {
        const [url, target] = openStub.firstCall.args;
        expect(target).to.equal("_blank");
        return new URL(url, Cypress.config("baseUrl")).toString();
      });
  }

  visitSamplePage(url) {
    cy.visit(url);
    cy.get("#sampleHeading").should("have.text", "This is a sample page");
  }

  closeNewWindowAndReturn() {
    cy.go("back");
    cy.location("pathname").should("equal", "/browser-windows");
    cy.get("#windowButton").should("be.visible");
  }
}

module.exports = BrowserWindowsPage;