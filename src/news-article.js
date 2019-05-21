const FADETIME = 1; // in seconds;

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

    
    .half-width {
      width: 50%;
    }
    
    .line-gap {
      /* margin: 0.125rem 0;
      box-sizing: border-box; */
    }
    
    .bottom-area {
      flex-grow: 1;
      display:flex;
      align-items: flex-end;
      position:relative;
    }

    .news-outlet {
      position: absolute;
    }
    
    .title-area {
      position: relative;
    }
    
    .title-text {
      position: absolute;
      z-index: -1;
      font-size: 16px;
      line-height: 1;
    }


    .greyed-out-area {
      width: 100%;
      height: 1.1rem;
      box-sizing: border-box;
      background: #D8D8D8;
      opacity: 1;
      transition: opacity ${FADETIME}s;
    }

    .half-width {
      width: 50%;
    }

    .news-outlet {
      z-index: -1;
      color:red;
    }

    .news-outlet:visited {
      color:red
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
        <span class='title-text'>This is test text that is longer than one line for a test</span>
        <div class='greyed-out-area margin-top margin-bottom'></div>
        <div class='greyed-out-area margin-bottom'></div>
        <div class='greyed-out-area margin-bottom'></div>
        <div class='greyed-out-area half-width'></div>
      </div>

      <div class='bottom-area'>
        <a class='news-outlet'>BBC News</a>
        <div class='greyed-out-area'></div>
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
    this.imgElement.alt = `Thumbnail image for article titled ${newTitle}`;

    this.titleElement = this._shadowRoot.querySelector('.title-area');

    this.titleText = this.titleElement.querySelector('.title-text');
    this.titleText.textContent = newTitle;

    this.titleElement
      .querySelectorAll('.greyed-out-area')
      .forEach((current) => {
        current.style.opacity = 0;

        setTimeout(() => {
          current.remove();
        }, FADETIME * 1000);
      });
  }

  set article(newArticle) {
    const { urlToImage, title } = newArticle;

    const titleSplit = title.split(' - ');
    const titleNoSource = titleSplit
      .slice(0, titleSplit.length - 1)
      .join(' - ');
    const sourceName = titleSplit[titleSplit.length - 1];

    const cropTitle = (uncropped) => {
      if (uncropped.length < 100) return uncropped;

      return uncropped.slice(0, 100) + '...';
    };

    const source = {
      name: sourceName,
      url: newArticle.url,
    };

    this.image = urlToImage;
    this.title = cropTitle(titleNoSource);
    this.source = source;
  }

  set source(source) {
    const newsOutlet = this._shadowRoot.querySelector('.news-outlet');
    newsOutlet.href = source.url;
    newsOutlet.textContent = source.name;

    const bottomArea = this._shadowRoot.querySelector('.bottom-area');
    const greyedArea = bottomArea.querySelector('.greyed-out-area');
    greyedArea.style.opacity = 0;

    setTimeout(() => {
      greyedArea.remove();
      newsOutlet.style['z-index'] = 0;
    }, FADETIME * 1000);
  }
}

const register = () => {
  customElements.define('news-article', NewsArticle);
};

export default register;
