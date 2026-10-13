class DemoQaPage {
  openSectionPage(section, page, readySelector) {
    cy.visit("/");
    cy.contains("a", section).click();
    cy.contains("a", page).click();
    cy.get(readySelector).should("be.visible");
  }
}

module.exports = DemoQaPage;