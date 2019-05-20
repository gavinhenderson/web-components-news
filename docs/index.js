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

    this.newsItems = [];

    for (let i = 0; i < parseInt(maxItems); i++) {
      const current = document.createElement('news-article');
      this.appendChild(current);
      this.newsItems.push(current);
    }

    getNews(apiKey).then((articles) => {
      articles.forEach((article, index) => {
        // This delay is for a nice demo
        setTimeout(() => {
          this.newsItems[index].article = article;
        }, Math.random() * 2000);
      });
    });
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
      object-fit: cover;
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
      <div class='title-area'>
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

const getHttpUrl = (fullUrl) => {
  if (fullUrl && !fullUrl.startsWith('https') && fullUrl.startsWith('http')) {
    const withoutHttp = fullUrl.split('http://')[1];
    return `https://${withoutHttp}`;
  }

  return fullUrl;
};

class NewsArticle extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.innerHTML = style + content;
  }

  set image(urlToImage) {
    const imgElement = this._shadowRoot.querySelector('.thumbnail');

    this.imgElement = imgElement;

    imgElement.onload = () => {
      imgElement.style.opacity = 1;
    };

    const imgUrl = getHttpUrl(urlToImage);

    imgElement.src = imgUrl;
  }

  set title(newTitle) {
    console.log('new title', newTitle);
    this.imgElement.alt = `Thumbnail image for article titled ${newTitle}`;

    this.titleElement = this._shadowRoot.querySelector('.title-area');

    const newTitleElement = document.createElement('p');
    newTitleElement.textContent = newTitle;

    // this.titleElement.appendChild(newTitleElement);
  }

  set article(newArticle) {
    const { urlToImage, title } = newArticle;

    const titleNoSource = title.split(' - ')[0];

    this.image = urlToImage;
    this.title = titleNoSource;
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
