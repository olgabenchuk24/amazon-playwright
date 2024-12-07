exports.ShoppingBasketPage = class ShoppingBasketPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page
      .locator(".sc-list-item-content")
      .locator(".a-truncate-full.a-offscreen");
  }

  async removeProductByTitle(title) {
    await this.page
      .locator(".sc-list-item-content", {
        has: this.page.getByText(title),
      })
      .locator('[data-feature-id="item-delete-button"]')
      .click();
  }
};
