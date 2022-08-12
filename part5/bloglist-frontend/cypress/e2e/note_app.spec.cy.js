describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name:'Oliv',
      username: 'testuser',
      password: '12345'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', () => {
    cy.contains('Login');
    cy.get('[name = "Username"]');
    cy.get('[name = "Password"]');
  });
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[name = "Username"]').type('testuser');
      cy.get('[name = "Password"]').type('12345');
      cy.contains('Login').click();
      cy.contains('Create blog');
    });
    it('fails with wrong credentials', () => {
      cy.get('[name = "Username"]').type('Wrongtestuser');
      cy.get('[name = "Password"]').type('WrongPassword');
      cy.contains('Login').click();
      cy.contains('Invalid credentials');
    });
  });
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username:'testuser', password:'12345' });
    });

    it('A blog can be created', () => {
      cy.contains('Create blog').click();
      cy.get('[name = "Author"]').type('TestAuthor');
      cy.get('[name = "Title"]').type('TestTitle');
      cy.get('[name = "Url"]').type('TestUrl');
      cy.contains('create').click();
      cy.contains('TestAuthor');
      cy.contains('TestTitle');
    });
  });
  describe.only('When a blog exists', () => {
    beforeEach(() => {
      cy.login({ username:'testuser', password:'12345' });
      cy.createBlog({ author: 'TestAuthor', title: 'TestTitle', url: 'TestUrl' });
    });
    afterEach(() => {
      cy.contains('Log out').click();

    });
    it('users can like a blog', () => {
      cy.contains('View').click();
      cy.contains('Like').click();
      cy.contains('1');
    });
    it('user who created a blog can delete it',  () => {
      cy.contains('View').click();
      cy.contains('Delete').click();
      cy.get('TestAuthor').should('not.exist');
    });
    it('other users cannot delete the blog', () => {
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Pam',
        username: 'TestUser2',
        password: '12345' });
      cy.login({ username: 'TestUser2', password: '12345' });
      cy.contains('View').click();
      cy.contains('Delete').should('not.exist');
    });
    it.only('blogs are ordered according to likes with the blog with the most likes being first', () => {
      cy.createBlog({ author: 'TestAuthor', title: 'mostLiked', url: 'TestUrl' });

      cy
        .get('.blog')
        .eq(0)
        .should('contain', 'TestTitle' )
        .contains('View').click();

      cy
        .get('.blog')
        .eq(1)
        .should('contain', 'mostLiked' )
        .contains('View').click();

      cy.get('.likeButton').eq(0).click();
      cy.get('.likeButton').eq(1).click();
      cy.wait(1000);
      cy.get('.likeButton').eq(1).click();
      cy.wait(1000);
      cy.get('.descending-order-button').trigger('mouseover').click();
      cy.contains('Descending order').trigger('mouseover').click();
      cy
        .get('.blog')
        .eq(0)
        .should('contain', 'mostLiked');
    });
  });
});