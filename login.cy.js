// login_test.spec.js

describe('Позитивный сценарий авторизации и восстановление пароля', function () {
  it('Верный логин и пароль', function () {
    cy.visit('https://login.qa.studio');

    // Проверка, что кнопка "Войти" изначально задизейблена
    cy.get('#loginButton').should('be.disabled');

    // Ввод логина
    cy.get('#mail').type('german@dolnikov.ru');

    // Ввод пароля
    cy.get('#pass').type('iLoveqastudio1');

    // Проверка, что после ввода логина и пароля кнопка "Войти" стала активной
    cy.get('#loginButton').should('not.be.disabled');

    // Клик по кнопке "Войти"
    cy.get('#loginButton').click();
  });

  it('Восстановление пароля', function () {
    // Перейти на страницу восстановления пароля
    cy.visit('https://login.qa.studio');

    // Нажать "Забыли пароль"
    cy.get('#forgotEmailButton').click();

    // Ввести любой имейл
    const testEmail = 'test@example.com'; // Замените на реальный тестовый имейл
    cy.get('#mailForgot').type(testEmail);

    // Нажать кнопку "Восстановить пароль"
    cy.get('#restoreEmailButton').click();

    // Проверка успешного сообщения и наличия кнопки крестика
    cy.get('#messageHeader').should('contain', 'Успешно отправили пароль на e-mail');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('Негативный сценарий авторизации', function () {
    // Перейти на страницу авторизации
    cy.visit('https://login.qa.studio');

    // Проверка, что кнопка "Войти" изначально задизейблена
    cy.get('#loginButton').should('be.disabled');

    // Ввод правильного логина
    cy.get('#mail').type('german@dolnikov.ru');

    // Ввод НЕ правильного пароля
    cy.get('#pass').type('incorrectPassword');

    // Проверка, что после ввода логина и пароля кнопка "Войти" стала активной
    cy.get('#loginButton').should('not.be.disabled');

    // Клик по кнопке "Войти"
    cy.get('#loginButton').click();

    // Проверка текста об ошибке и отсутствия кнопки крестика
    cy.get('#messageHeader').should('contain', 'Такого логина или пароля нет');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('Негативный сценарий валидации логина', function () {
    // Перейти на страницу авторизации
    cy.visit('https://login.qa.studio');

    // Проверка, что кнопка "Войти" изначально задизейблена
    cy.get('#loginButton').should('be.disabled');

    // Ввод логина без @
    cy.get('#mail').type('incorrectLogin');

    // Ввод правильного пароля
    cy.get('#pass').type('iLoveqastudio1');

    // Проверка, что после ввода логина и пароля кнопка "Войти" стала активной
    cy.get('#loginButton').should('not.be.disabled');

    // Клик по кнопке "Войти"
    cy.get('#loginButton').click();

    // Проверка текста об ошибке и отсутствия кнопки крестика
    cy.get('#messageHeader').should('contain', 'Нужно исправить проблему валидации');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });

  it('Тест на баг: Приведение к строчным буквам в логине', function () {
    // Перейти на страницу авторизации
    cy.visit('https://login.qa.studio');

    // Проверка, что кнопка "Войти" изначально задизейблена
    cy.get('#loginButton').should('be.disabled');

    // Ввод логина с заглавными буквами и приведение к строчным
    cy.get('#mail').type('GerMan@Dolnikov.ru'.toLowerCase());

    // Ввод правильного пароля
    cy.get('#pass').type('iLoveqastudio1');

    // Проверка, что после ввода логина и пароля кнопка "Войти" стала активной
    cy.get('#loginButton').should('not.be.disabled');

    // Клик по кнопке "Войти"
    cy.get('#loginButton').click();

    // Проверка успешного сообщения и наличия кнопки крестика
    cy.get('#messageHeader').should('contain', 'Авторизация прошла успешно');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  });
});
