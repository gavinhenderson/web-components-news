class NewsArticle extends HTMLElement {
  constructor() {
    super();

    // this.innerHTML('test');
  }
}

const register = () => {
  customElements.define('news-article', NewsArticle);
};

export default register;
