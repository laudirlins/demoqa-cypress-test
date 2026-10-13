const DemoQaPage = require("./DemoQaPage");

class PracticeFormPage extends DemoQaPage {
  openFromHome() {
    this.openSectionPage("Forms", "Practice Form", "#firstName");
  }

  fillForm(data) {
    cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#userEmail").type(data.email);
    cy.get(`label[for='gender-radio-${data.genderId}']`).click();
    cy.get("#userNumber").type(data.mobile);
    cy.get("#dateOfBirthInput").then(($input) => {
      const input = $input[0];
      const valueSetter = Object.getOwnPropertyDescriptor(
        input.ownerDocument.defaultView.HTMLInputElement.prototype,
        "value",
      ).set;
      valueSetter.call(input, data.dateOfBirth);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    cy.get("#dateOfBirthInput").should("have.value", data.dateOfBirth);
    cy.get("#subjectsInput").type(`${data.subject}{enter}`);
    data.hobbies.forEach((hobbyId) => {
      cy.get(`label[for='hobbies-checkbox-${hobbyId}']`).click();
    });
    cy.get("#uploadPicture").selectFile(
      "cypress/fixtures/student-document.txt",
    );
    cy.get("#currentAddress").type(data.address);
    cy.get("#react-select-3-input").type(`${data.state}{enter}`);
    cy.get("#react-select-4-input").type(`${data.city}{enter}`);
  }

  submit() {
    cy.get("#submit").click({ force: true });
  }

  verifySubmission(data) {
    cy.get(".modal-content").should("be.visible");
    cy.get("#example-modal-sizes-title-lg").should(
      "have.text",
      "Thanks for submitting the form",
    );
    cy.get(".modal-body").should("contain", data.firstName);
    cy.get(".modal-body").should("contain", data.email);
    cy.get(".modal-body").should("contain", "student-document.txt");
  }

  closeConfirmation() {
    cy.on("uncaught:exception", (error) => {
      if (error.message.includes("findDOMNode is not a function")) {
        return false;
      }
    });
    cy.get("#closeLargeModal").click({ force: true });
    cy.get(".modal-content").then(($modal) => {
      if ($modal.length) {
        cy.reload();
      }
    });
    cy.get(".modal-content").should("not.exist");
  }
}

module.exports = PracticeFormPage;