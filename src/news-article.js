const style = `
  <style>
    .article-container {
      max-width: 22rem;
      margin: 0 auto;
      width: 95%;
      display: flex;
      flex-direction: row;
      margin-top: .5rem;
      height: 6.1875rem;
    }

    .separator {
      padding: 0 0.25rem;
    }

    .thumbnail-container {
      width: 11rem;
      height: 100%;
      background: #A8A8A8;
    }

    .thumbnail {
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s;
    }

    .content-container {
      flex-grow: 1;
      margin-left: 0.5rem;
      display: flex;
      height: 100%;
      flex-direction: column;
    }

    .greyed-out-area {
      width: 100%;
      height: 1rem;
      background: #D8D8D8
    }

    .half-width {
      width: 50%;
    }

    .margin-below {
      margin-bottom: 0.25rem;
    }

    .bottom-area {
      flex-grow: 1;
      display:flex;
      align-items: flex-end;
    }
  </style>
`;

const content = `
  <div class='article-container'>

    <div class='thumbnail-container'>
      <img class='thumbnail' >
    </div>
    
    <div class='content-container'>
      <div>
        <div class='greyed-out-area margin-below'></div>
        <div class='greyed-out-area margin-below'></div>
        <div class='greyed-out-area half-width'></div>
      </div>

      <div class='bottom-area'>
        <div class='greyed-out-area'></div><span class='separator'>|</span><div class='greyed-out-area'></div>
      </div>
    </div>

  </div>
`;

class NewsArticle extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.innerHTML = style + content;
  }

  set article(newArticle) {
    const imgElement = this._shadowRoot.querySelector('.thumbnail');

    const titleNoSource = newArticle.title.split(' - ')[0];

    imgElement.alt = `Thumbnail image for article titled ${titleNoSource}`;

    imgElement.onload = () => {
      imgElement.style.opacity = 1;
    };

    imgElement.src = newArticle.urlToImage;
  }
}

const register = () => {
  customElements.define('news-article', NewsArticle);
};

export default register;
