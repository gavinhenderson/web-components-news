import registerMyElement from './my-element';

window.WebComponents = window.WebComponents || {
  waitFor(cb) {
    addEventListener('WebComponentsReady', cb);
  },
};
WebComponents.waitFor(async () => {
  registerMyElement();
});
