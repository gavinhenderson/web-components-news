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

window.WebComponents = window.WebComponents || {
  waitFor(cb) {
    addEventListener('WebComponentsReady', cb);
  },
};
WebComponents.waitFor(async () => {
  register();
});
