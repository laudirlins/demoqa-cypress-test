const DemoQaPage = require("./DemoQaPage");

class WebTablesPage extends DemoQaPage {
  openFromHome() {
    this.openSectionPage("Elements", "Web Tables", "#addNewRecordButton");
    cy.get("select").select("20");
  }

  addRecord(record) {
    cy.get("#addNewRecordButton").click({ force: true });
    this.fillRecordForm(record);
    return this.row(record.firstName)
      .should("be.visible")
      .find('[title="Delete"]')
      .invoke("attr", "id")
      .then((deleteId) => {
        record.deleteId = deleteId;
      });
  }

  editRecord(record, updatedRecord) {
    this.row(record.firstName).find('[title="Edit"]').click({ force: true });
    this.fillRecordForm(updatedRecord);
    return this.row(updatedRecord.firstName).should("be.visible");
  }

  fillRecordForm(record) {
    [
      ["#firstName", record.firstName],
      ["#lastName", record.lastName],
      ["#userEmail", record.email],
      ["#age", record.age],
      ["#salary", record.salary],
      ["#department", record.department],
    ].forEach(([selector, value]) => {
      cy.get(selector).clear().type(String(value));
    });
    cy.get("#submit").click();
    cy.get(".modal.show").should("not.exist");
  }

  deleteRecord(record) {
    return cy
      .get(`#${record.deleteId}`)
      .click({ force: true })
      .then(() => this.row(record.firstName).should("not.exist"));
  }

  deleteRecords(records) {
    if (!records.length) {
      return cy.wrap(null, { log: false });
    }

    return this.deleteRecord(records[0]).then(() => {
      records.slice(1).forEach((record) => {
        this.row(record.firstName).should("not.exist");
      });
    });
  }

  row(firstName) {
    return cy.contains("table tbody tr", firstName);
  }
}

module.exports = WebTablesPage;