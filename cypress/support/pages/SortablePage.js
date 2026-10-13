const DemoQaPage = require("./DemoQaPage");

const ASCENDING_ORDER = ["One", "Two", "Three", "Four", "Five", "Six"];

class SortablePage extends DemoQaPage {
  openFromHome() {
    this.openSectionPage(
      "Interactions",
      "Sortable",
      "#demo-tabpane-list .list-group-item",
    );
    cy.get("#demo-tabpane-list .list-group-item").should("have.length", 6);
  }

  listItems() {
    return cy
      .get("#demo-tabpane-list .list-group-item")
      .then(($items) => [...$items].map((item) => item.innerText.trim()));
  }

  item(label) {
    return cy
      .get("#demo-tabpane-list .list-group-item")
      .filter((_, element) => element.innerText.trim() === label);
  }

  dragBefore(sourceLabel, targetLabel) {
    return cy.window().then((window) => {
      const dataTransfer = new window.DataTransfer();
      const source = this.item(sourceLabel);
      const target = this.item(targetLabel);

      source.trigger("dragstart", { dataTransfer });
      target.trigger("dragenter", { dataTransfer });
      target.trigger("dragover", { dataTransfer });
      target.trigger("drop", { dataTransfer });
      source.trigger("dragend", { dataTransfer });
    });
  }

  moveSixToStart() {
    return this.dragBefore("Six", "One");
  }

  sortAscending() {
    let sequence = cy.wrap(null, { log: false });

    ASCENDING_ORDER.forEach((label, position) => {
      sequence = sequence.then(() =>
        this.listItems().then((currentOrder) => {
          if (currentOrder[position] === label) {
            return;
          }
          return this.dragBefore(label, currentOrder[position]);
        }),
      );
    });

    return sequence.then(() =>
      this.listItems().should("deep.equal", ASCENDING_ORDER),
    );
  }

  assertAscendingOrder() {
    this.listItems().should("deep.equal", ASCENDING_ORDER);
  }
}

module.exports = SortablePage;