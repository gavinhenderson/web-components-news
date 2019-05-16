class MyElement extends HTMLElement {
  constructor() {
    super();

    const pElem = document.createElement('p');
    pElem.textContent = this.getAttribute('text');

    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(pElem);
  }
}

const register = () => {
  customElements.define('my-element', MyElement);
};

class NewsList extends HTMLElement {
  constructor() {
    super();

    const maxItems = this.getAttribute('max-items');
    const apiKey = this.getAttribute('api-key');

    console.log(maxItems);
    console.log(apiKey);
  }
}

const register$1 = () => {
  customElements.define('news-list', NewsList);
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
