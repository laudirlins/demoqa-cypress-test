class BookStoreApi {
  listBooks() {
    return cy.request("GET", "/BookStore/v1/Books");
  }

  reserveBooks(userId, token, isbns) {
    return cy.request({
      method: "POST",
      url: "/BookStore/v1/Books",
      body: {
        userId,
        collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

module.exports = BookStoreApi;