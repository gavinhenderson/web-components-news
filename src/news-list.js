import getNews from './get-news';

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

export default register;
