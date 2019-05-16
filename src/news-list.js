import getNews from './get-news';

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

export default register;
