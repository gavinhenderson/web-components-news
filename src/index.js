import registerNewsList from './news-list';
import registerNewsArticle from './news-article';

window.WebComponents = window.WebComponents || {
  waitFor(cb) {
    addEventListener('WebComponentsReady', cb);
  },
};
WebComponents.waitFor(async () => {
  registerNewsList();
  registerNewsArticle();
});
