const style = `
  <style>
    .article-container {
      max-width: 22rem;
      margin: 0 auto;
      width: 95%;
      display: flex;
      flex-direction: row;
      margin-bottom: .5rem;
    }

    .thumbnail-container {
      width: 11rem;
      height: 6.1875rem;
      background: #A8A8A8;
    }

    .content-container {
      flex-grow: 1;
    }
  </style>
`;

const content = `
  <div class='article-container'>

    <div class='thumbnail-container'>
      <img class='thumbnail' >
    </div>
    
    <div class='content-container'>
      <p>article</p>
    </div>

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
