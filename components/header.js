exports.Header = class Header {
  constructor(page) {
    this.page = page;

    this.cartCount = page.getByTestId("nav-cart-count");

    this.searchInput = page
      .locator("#nav-search")
      .getByTestId("twotabsearchtextbox");

    this.navCartButton = page.getByTestId("nav-cart");
  }

  async search(query) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async openShoppingBasket() {
    await this.navCartButton.click(this.navCartButton);
  }
};
