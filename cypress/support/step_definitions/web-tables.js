const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const WebTablesPage = require("../pages/WebTablesPage");
const { randomInteger, uniqueEmail } = require("../test-data");

const webTablesPage = new WebTablesPage();

const createRecord = (person) => ({
  ...person,
  email: uniqueEmail(),
  age: randomInteger(20, 60),
  salary: randomInteger(3000, 15000),
});

Given("I open Web Tables from the Elements menu", () => {
  webTablesPage.openFromHome();
});

When("I create a test record", function () {
  this.record = createRecord({
    firstName: "Test",
    lastName: "Automation",
    department: "QA",
  });
  webTablesPage.addRecord(this.record);
});

Then("the new record should appear in the table", function () {
  webTablesPage.row(this.record.firstName).should("contain", this.record.email);
});

When("I edit the created record", function () {
  this.updatedRecord = {
    ...this.record,
    firstName: "EditedRecord",
    department: "Quality Assurance",
  };
  return webTablesPage.editRecord(this.record, this.updatedRecord);
});

Then("the updated details should appear in the table", function () {
  webTablesPage
    .row(this.updatedRecord.firstName)
    .should("contain", this.updatedRecord.firstName)
    .and("contain", this.updatedRecord.department);
});

When("I delete the created record", function () {
  this.updatedRecord.deleteId = this.record.deleteId;
  return webTablesPage.deleteRecord(this.updatedRecord);
});

Then("the record should no longer appear in the table", function () {
  webTablesPage.row(this.updatedRecord.firstName).should("not.exist");
});

When("I dynamically create these records:", function (dataTable) {
  this.records = dataTable.hashes().map(createRecord);
  this.records.forEach((record) => webTablesPage.addRecord(record));
});

Then("all twelve records should appear in the table", function () {
  expect(this.records).to.have.length(12);
  this.records.forEach((record) => {
    webTablesPage.row(record.firstName).should("contain", record.email);
  });
});

When("I delete all created records", function () {
  return webTablesPage.deleteRecords(this.records);
});

Then("none of the twelve records should remain in the table", function () {
  this.records.forEach((record) => {
    webTablesPage.row(record.firstName).should("not.exist");
  });
});