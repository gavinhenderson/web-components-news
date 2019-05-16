class NewsList extends HTMLElement {
  constructor() {
    super();

    const maxItems = this.getAttribute('max-items');
    const apiKey = this.getAttribute('api-key');

    console.log(maxItems);
    console.log(apiKey);
  }
}

const register = () => {
  customElements.define('news-list', NewsList);
};

export default register;
