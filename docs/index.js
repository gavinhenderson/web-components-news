const getNews = async (apiKey) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`,
  );

  const { articles } = await response.json();

  return articles;
};

class NewsList extends HTMLElement {
  constructor() {
    super();

    const maxItems = this.getAttribute('max-items');
    const apiKey = this.getAttribute('api-key');

    getNews(apiKey).then(console.log);

    console.log(maxItems);
    console.log(apiKey);

    this.newsItems = [];

    for (let i = 0; i < parseInt(maxItems); i++) {
      const current = document.createElement('news-article');
      this.appendChild(current);
      this.newsItems.push(current);
    }
  }
}

const register = () => {
  customElements.define('news-list', NewsList);
};

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

const register$1 = () => {
  customElements.define('news-article', NewsArticle);
};

window.WebComponents = window.WebComponents || {
  waitFor(cb) {
    addEventListener('WebComponentsReady', cb);
  },
};
WebComponents.waitFor(async () => {
  register();
  register$1();
});
