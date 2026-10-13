class AccountApi {
  createUser(user) {
    return cy.request("POST", "/Account/v1/User", user);
  }

  generateToken(user) {
    return cy.request("POST", "/Account/v1/GenerateToken", user);
  }

  isAuthorized(user, token) {
    return cy.request({
      method: "POST",
      url: "/Account/v1/Authorized",
      body: user,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUser(userId, token) {
    return cy.request({
      method: "GET",
      url: `/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

module.exports = AccountApi;