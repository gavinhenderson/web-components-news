const style = `
  <style>
    .article-container {
      max-width: 22rem;
      margin: 0 auto;
      width: 95%;
      background: black;
    }
  </style>
`;

const content = `
  <div class='article-container'>
    <p>article</p>
  </div>
`;

class NewsArticle extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.innerHTML = style + content;

    console.log(this);
  }
}

const register = () => {
  customElements.define('news-article', NewsArticle);
};

export default register;
