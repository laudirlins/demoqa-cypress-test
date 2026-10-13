const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const AccountApi = require("../api/AccountApi");
const BookStoreApi = require("../api/BookStoreApi");
const { uniqueId, uniquePassword } = require("../test-data");

const accountApi = new AccountApi();
const bookStoreApi = new BookStoreApi();

Given("I have unique credentials for a new user", function () {
  this.user = {
    userName: `qa-${uniqueId()}`,
    password: uniquePassword(),
  };
});

When("I create the user and generate an access token", function () {
  return accountApi.createUser(this.user).then((userResponse) => {
    expect(userResponse.status).to.equal(201);
    this.userId = userResponse.body.userID;
    return accountApi.generateToken(this.user);
  }).then((tokenResponse) => {
    expect(tokenResponse.status).to.equal(200);
    expect(tokenResponse.body.status).to.equal("Success");
    this.token = tokenResponse.body.token;
  });
});

Then("the user should be authorized", function () {
  return accountApi.isAuthorized(this.user, this.token).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });
});

When("I list the available books and reserve two titles", function () {
  return bookStoreApi.listBooks().then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.books.length).to.be.at.least(2);
    this.reservedIsbns = response.body.books
      .slice(0, 2)
      .map((book) => book.isbn);
    return bookStoreApi.reserveBooks(
      this.userId,
      this.token,
      this.reservedIsbns,
    );
  }).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.books).to.have.length(2);
  });
});

Then("the user details should include both reserved books", function () {
  return accountApi.getUser(this.userId, this.token).then((response) => {
    expect(response.status).to.equal(200);
    const actualIsbns = response.body.books.map((book) => book.isbn);
    expect(actualIsbns).to.have.length(2);
    expect(actualIsbns).to.include.members(this.reservedIsbns);
  });
});