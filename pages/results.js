exports.ResultsPage = class ResultsPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page
      .locator('[data-cel-widget="search_result_1"]')
      .locator(".a-size-base-plus.a-color-base.a-text-normal");
  }

  async addProductToTheBasket(productNumber) {
    await this.page.getByTestId(`a-autoid-${productNumber}-announce`).click();
  }

  async geTitleTextForProduct(productNumber) {
    return this.page
      .locator(`[data-cel-widget="search_result_${productNumber}"]`)
      .locator(".a-size-base-plus.a-color-base.a-text-normal")
      .textContent();
  }
};
