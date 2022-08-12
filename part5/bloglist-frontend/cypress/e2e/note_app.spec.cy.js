describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', () => {
    cy.contains('Login');
    cy.get('[name = "Username"]');
    cy.get('[name = "Password"]');
  });
});