# DemoQA Cypress Tests

Automated API and UI tests for [DemoQA](https://demoqa.com/) using JavaScript, Cypress, and Cucumber.

## Requirements

- Node.js 20.19 or newer, or a currently supported LTS release
- npm
- Internet access to install Cypress and reach DemoQA

## Setup

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/laudirlins/demoqa-cypress-test.git
cd demoqa-cypress-test
npm ci
```

## Run Tests

Run the complete suite:

```bash
npm run test:e2e
```

Run only API tests or browser UI tests:

```bash
npm run test:backend
npm run test:frontend
```

Open Cypress interactively:

```bash
npm run test:e2e:open
```

On PowerShell, use `npm.cmd` if `npm` is not recognized, for example `npm.cmd ci`.

## Scenarios

- **Book Store API:** creates a user, generates an access token, checks authorization, reserves two books, and verifies the user's reservations.
- **Web Tables:** creates, edits, and deletes a record; also creates 12 records from a Cucumber data table and verifies their removal.
- **Practice Form:** fills and submits the student registration form, uploads a fixture, and checks the confirmation dialog.
- **Sortable:** uses drag and drop to order the list as `One, Two, Three, Four, Five, Six`.
- **Progress Bar:** stops below 25%, resumes to 100%, and resets the progress bar.
- **Browser Windows:** checks the new-window request and validates the sample page content.

## Project Layout

- `cypress/e2e/`: Gherkin feature files grouped by application area.
- `cypress/support/step_definitions/`: JavaScript implementations for Gherkin steps.
- `cypress/support/pages/`: Page Objects for browser interactions.
- `cypress/support/api/`: API clients used by the book-store scenario.
- `cypress/support/test-data.js`: shared random and unique test-data helpers.
- `cypress/fixtures/`: files used by tests, including the form-upload text file.
- `cypress.config.js`: Cypress and Cucumber configuration.

## Security and Collaboration

The repository does not require personal credentials or API tokens. The API scenario generates a temporary password for its DemoQA test user. Do not commit `.env` files, credentials, tokens, or private keys. The `.gitignore` excludes these files, generated Cypress artifacts, dependencies, and internal `.github` documents while allowing this root README.

This repository is private. To let someone else clone it, invite them as a collaborator in the repository's **Settings → Collaborators** page. Do not share your GitHub password or personal access token.

## Notes

- The browser-window scenario stubs `window.open` and visits the requested page in Cypress's controlled tab; Cypress does not manage a separate physical browser window.
- DemoQA has known UI quirks around its date picker and dialog close behavior. The related Page Object contains scoped workarounds.
