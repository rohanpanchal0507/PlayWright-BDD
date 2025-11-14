@login @smoke
Feature: Login to demo application

  Background:
    Given I open the login page

  @positive @valid
  Scenario: Successful login with valid credentials
    When I login with username "Admin" and password "admin123"
    Then I should see the dashboard page
