const DemoQaPage = require("./DemoQaPage");

class ProgressBarPage extends DemoQaPage {
  openFromHome() {
    this.openSectionPage("Widgets", "Progress Bar", "#progressBar");
    cy.get("[role='progressbar']").should("have.attr", "aria-valuenow", "0");
    cy.window().then((browserWindow) => {
      cy.spy(browserWindow, "setInterval").as("progressInterval");
      cy.spy(browserWindow, "clearInterval").as("progressIntervalCleanup");
    });
  }

  start() {
    cy.get("@progressInterval").then((intervalSpy) => {
      const previousCalls = intervalSpy.callCount;
      cy.get("#startStopButton").should("have.text", "Start").click();
      cy.get("@progressInterval").should((updatedSpy) => {
        expect(updatedSpy.callCount).to.be.greaterThan(previousCalls);
      });
      cy.get("@progressInterval").then((updatedSpy) => {
        this.progressTimerId = updatedSpy.lastCall.returnValue;
      });
    });
  }

  waitForProgressValue(value) {
    cy.get("[role='progressbar']").should(($bar) => {
      expect(Number($bar.attr("aria-valuenow"))).to.equal(value);
    });
  }

  stop() {
    cy.get("#startStopButton").should("have.text", "Stop").click({ force: true });
  }

  progressValue() {
    return cy
      .get("[role='progressbar']")
      .invoke("attr", "aria-valuenow")
      .then(Number);
  }

  waitUntilComplete() {
    cy.get("[role='progressbar']", { timeout: 15000 }).should(
      "have.attr",
      "aria-valuenow",
      "100",
    );
    cy.contains("button", "Reset", { timeout: 15000 }).should("be.visible");
    cy.get("@progressIntervalCleanup").should((cleanupSpy) => {
      expect(cleanupSpy).to.have.been.calledWith(this.progressTimerId);
    });
  }

  reset() {
    cy.contains("button", "Reset").click();
  }
}

module.exports = ProgressBarPage;