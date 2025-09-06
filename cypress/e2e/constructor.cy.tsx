describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('тесты для конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
  });

  it('проверка успешной загрузки ингредиента', () => {
    cy.get('img[alt="картинка ингредиента."]').should(
      'have.length.at.least',
      3
    );
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });
  it('проверка добавления булочки в конструктор через кнопку', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element_pos_top').should(
      'contain.text',
      'Краторная булка N-200i (верх)'
    );
    cy.get('.constructor-element_pos_bottom').should(
      'contain.text',
      'Краторная булка N-200i (низ)'
    );
    cy.contains('2510').should('exist');
  });

  it('проверка добавления ингредиента в конструктор через кнопку', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element').should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
  });
  it('проверка работы модальных окон ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('.text_type_main-medium').should(
      'contain.text',
      'Краторная булка N-200i'
    );
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('#modals > div > div > button').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('проверка работы создания заказа', () => {
    cy.setCookie('accessToken', 'test-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.contains('Краторная булка N-200i')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('Оформить заказ').should('not.be.disabled');
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.contains('12345').should('be.visible');
    cy.get('#modals > div > div > button').click();
    cy.contains('12345').should('not.exist');
    cy.get(
      '#root > div > main > div > section:nth-child(2) > div:first-child'
    ).should('not.contain.text', 'Краторная булка');
    cy.get(
      '#root > div > main > div > section:nth-child(2) > div:first-child'
    ).should('not.contain.text', 'Биокотлета');
  });

  it('удаление ингредиента из конструктора', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('.constructor-element__action > svg > path').click();
    cy.get(
      '#root > div > main > div > section:nth-child(2) > div:first-child'
    ).should('not.contain.text', 'Биокотлета из марсианской Магнолии');
  });
});
