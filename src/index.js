import registerMyElement from './my-element';
import registerNewsList from './news-list';

window.WebComponents = window.WebComponents || {
  waitFor(cb) {
    addEventListener('WebComponentsReady', cb);
  },
};
WebComponents.waitFor(async () => {
  registerMyElement();
  registerNewsList();
});
