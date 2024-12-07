// @ts-check
const { test, expect } = require("@playwright/test");
const { Header } = require("../components/header.js");
const { ResultsPage } = require("../pages/results.js");
const { ShoppingBasketPage } = require("../pages/shopping-basket.js");

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.amazon.de/");
  await page.getByTestId("sp-cc-accept").click();
});

test("add product to the shopping basket", async ({ page }) => {
  const header = new Header(page);
  const resultsPage = new ResultsPage(page);
  const shoppingBasketPage = new ShoppingBasketPage(page);
  const productNumber = 1;
  await header.search("Christmas tree");
  await resultsPage.addProductToTheBasket(productNumber);

  const productTitleResultPageText = await resultsPage.geTitleTextForProduct(
    productNumber
  );

  if (!productTitleResultPageText) {
    throw new Error(
      `Item text content is missing, got "${productTitleResultPageText}".`
    );
  }

  await expect(header.cartCount).toHaveText("1");

  await header.openShoppingBasket();

  await expect(shoppingBasketPage.productTitle).toHaveText(
    productTitleResultPageText
  );
});

test("remove product from the shopping basket", async ({ page }) => {
  const header = new Header(page);
  const resultsPage = new ResultsPage(page);
  const shoppingBasketPage = new ShoppingBasketPage(page);
  const productNumber = 2;
  await header.search("Christmas tree");
  await resultsPage.addProductToTheBasket(productNumber);

  const productTitleResultPageText = await resultsPage.geTitleTextForProduct(
    productNumber
  );

  await expect(header.cartCount).toHaveText("1");

  await header.openShoppingBasket();

  await shoppingBasketPage.removeProductByTitle(productTitleResultPageText);

  await expect(
    page.getByText("Ihr Amazon-Einkaufswagen ist leer", { exact: true })
  ).toBeVisible();
});

test("add several products and remove one from the shopping basket", async ({
  page,
}) => {
  const header = new Header(page);
  const resultsPage = new ResultsPage(page);
  const shoppingBasketPage = new ShoppingBasketPage(page);
  await header.search("Christmas tree");
  await resultsPage.addProductToTheBasket(1);
  await resultsPage.addProductToTheBasket(2);

  const productTitleResultPageText1 = await resultsPage.geTitleTextForProduct(
    1
  );
  const productTitleResultPageText2 = await resultsPage.geTitleTextForProduct(
    2
  );

  await expect(header.cartCount).toHaveText("2");

  await header.openShoppingBasket();

  await shoppingBasketPage.removeProductByTitle(productTitleResultPageText2);

  await expect(shoppingBasketPage.productTitle).toHaveText(
    productTitleResultPageText1
  );
});
