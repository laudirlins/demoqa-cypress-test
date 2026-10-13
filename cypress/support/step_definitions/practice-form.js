const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const PracticeFormPage = require("../pages/PracticeFormPage");
const { pick, randomInteger, uniqueEmail } = require("../test-data");

const practiceFormPage = new PracticeFormPage();

Given("I open the Practice Form from the home page", () => {
  practiceFormPage.openFromHome();
});

When("I fill in the form with realistic random data", function () {
  const states = [
    { name: "NCR", city: "Delhi" },
    { name: "Haryana", city: "Karnal" },
    { name: "Rajasthan", city: "Jaipur" },
  ];
  const selectedState = pick(states);
  const hobbies = [1, 2, 3].filter(() => randomInteger(0, 1) === 1);

  this.formData = {
    firstName: pick(["Amelia", "Benjamin", "Charlotte", "Daniel"]),
    lastName: pick(["Smith", "Taylor", "Morgan", "Wilson"]),
    email: uniqueEmail(),
    genderId: randomInteger(1, 3),
    mobile: String(randomInteger(1000000000, 9999999999)),
    dateOfBirth: `${String(randomInteger(1, 28)).padStart(2, "0")} ${pick(["Jan", "Mar", "May", "Jul", "Sep", "Nov"])} ${randomInteger(1990, 2005)}`,
    subject: pick(["Maths", "Physics", "English", "Chemistry"]),
    hobbies: hobbies.length ? hobbies : [1],
    address: `${pick(["Main Street", "Oak Avenue", "Park Road"])}, ${randomInteger(100, 999)}, Austin`,
    state: selectedState.name,
    city: selectedState.city,
  };

  practiceFormPage.fillForm(this.formData);
});

When("I submit the form", () => {
  practiceFormPage.submit();
});

Then("the confirmation dialog should show the submitted details", function () {
  practiceFormPage.verifySubmission(this.formData);
});

Then("I close the confirmation dialog", () => {
  practiceFormPage.closeConfirmation();
});