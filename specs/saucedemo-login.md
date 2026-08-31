# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-08-20

## Overview
This plan covers the core login behaviors for SauceDemo, including successful authentication, account lockout, and validation error cases for missing or incorrect credentials. The scenarios are designed to verify the user-facing behavior of the login form before the user reaches the inventory pages.

## Preconditions
- Browser is running in a fresh state with no active SauceDemo session.
- User is on the login page at https://www.saucedemo.com.
- All test users use the password secret_sauce.
- No prior cart, session, or local storage state is persisted from a previous login.

## Scenarios

### Scenario 1.1 — Successful login with standard_user
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Fresh browser session on the SauceDemo login page with no user logged in.
- **Steps:**
  1. Enter standard_user in the Username field and secret_sauce in the Password field — expected: both values are accepted and the form stays active.
  2. Click the Login button — expected: the app navigates away from the login page to the inventory dashboard.
- **Assertions:**
  - The login form is submitted successfully without an error banner.
  - The page displays the inventory view, including the Products heading.
  - The user is no longer on the login form.
- **Edge cases considered:**
  - Username and password fields are trimmed correctly.
  - Wrong target page is not rendered after a successful sign-in.

### Scenario 1.2 — Locked-out user displays account error
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Fresh browser session on the SauceDemo login page with the user not logged in.
- **Steps:**
  1. Enter locked_out_user in the Username field and secret_sauce in the Password field — expected: both values are accepted.
  2. Click the Login button — expected: the page remains on the login screen and an error message is displayed.
- **Assertions:**
  - The page shows the error text: Epic sadface: Sorry, this user has been locked out.
  - The error message is visible as an inline banner and is clearly associated with the login form.
  - The user is not redirected to the inventory page.
- **Edge cases considered:**
  - Error banner must not disappear immediately after focus change.
  - Retry flow is blocked until the user corrects the credentials or refreshes the page.

### Scenario 1.3 — Empty username submission shows validation error
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh browser session on the SauceDemo login page with no user logged in.
- **Steps:**
  1. Leave the Username field blank.
  2. Enter secret_sauce in the Password field.
  3. Click the Login button — expected: the form rejects the submission and shows a validation message.
- **Assertions:**
  - The login page shows the error text: Epic sadface: Username is required.
  - No user is authenticated and the inventory page is not shown.
- **Edge cases considered:**
  - Username containing spaces only is treated as empty if the field is sanitized.
  - Password-only submissions are not accepted.

### Scenario 1.4 — Empty password submission shows validation error
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh browser session on the SauceDemo login page with no user logged in.
- **Steps:**
  1. Enter standard_user in the Username field.
  2. Leave the Password field blank.
  3. Click the Login button — expected: the form prevents login and displays a password validation error.
- **Assertions:**
  - The page shows the error text: Epic sadface: Password is required.
  - The user remains on the login page and is not redirected.
- **Edge cases considered:**
  - Empty password is rejected even when a valid username is entered.
  - The validation appears before any navigation occurs.

### Scenario 1.5 — Invalid credentials show authentication failure
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Fresh browser session on the SauceDemo login page with no user logged in.
- **Steps:**
  1. Enter a non-existent or incorrect username such as invalid_user in the Username field.
  2. Enter secret_sauce in the Password field.
  3. Click the Login button — expected: the page stays on the login screen and shows an authentication error.
- **Assertions:**
  - The page shows the error text: Epic sadface: Username and password do not match any user in this service.
  - The inventory page is not loaded.
  - The credentials are clearly rejected without creating a session.
- **Edge cases considered:**
  - Wrong password for a valid user is rejected.
  - Incorrect username with a correct password is rejected.
  - Mixed-case user names are handled according to the application’s expected case sensitivity.

## Not covered (and why)
- Inventory browsing, cart actions, and checkout flows are intentionally excluded because this plan targets only login behavior.
- Multi-user session switching is not included because the scenarios are designed to be independent and to verify each login state in a fresh session.
- API-level validation and backend responses are out of scope for this UI-focused plan.
