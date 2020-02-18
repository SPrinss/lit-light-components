import { LitElementLight, html } from 'lit-element-light';
import { MultiPropertyObserver } from 'lit-element-light/multi-property-observer-mixin';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import '../button';

/**
 * Conamore UI Accordion Component
 * @element ll-accordion
 * 
 * @slot
 * 
 * @fires values-changed - Fires when elements in slot have changed
 * @fires selected-index-changed - Fires when a list item is opened or closed
 * 
 */
class Main extends MultiPropertyObserver(LitElementLight) {

  static get properties() {
    return {
      
      values: {
        type: Array
      },

      selectedIndex: {
        type: Number,
        attribute: 'selected-index'
      }

    };
  }

  get template() {
    return html`
      <link rel="stylesheet" href="./src/accordion/ll-accordion.css">
      ${this.values.map((val, i) => html`
        <ll-button
          .icon="${i === this.selectedIndex ? 'close' : 'add'}"
          data-index="${i}"
          @click="${this._handleButtonClick}"
          ?data-opened="${i === this.selectedIndex}"
        >${val}</ll-button>
        <div
          class="container"
          ?data-opened="${i === this.selectedIndex}"
        >${unsafeHTML(this._children[i].outerHTML)}</div>   
      `)}

      <div id="slotContainer"><slot></slot></div>
    `;
  }

  constructor() {
    super();

    this.values = [];

    /**
     * Index of selected value
     * @attr selected-index
     * @type {Number}
     */
    this.selectedIndex = -1;

    this._children = [];

    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));

    const resizeObserver = new ResizeObserver(this._handleResize.bind(this));
    resizeObserver.observe(this);
  }

  get observers() {
    return {
      _selectedIndexChanged: ['selectedIndex'],
      _valuesChanged: ['values'],
    };
  }

  /**
   * Button values
   * @prop values
   * @type {Array}
   */
  get values() {
    return this._values;
  }

  set values(values) {
    const oldVal = this._values;
    this._values = values;
    this.requestUpdate('values', oldVal);
  }

  _handleResize() {
    const oldWidth = this._offsetWidth || 0;
    this._offsetWidth = this.offsetWidth;
    const widthChanged = this._offsetWidth !== oldWidth;
    if(!widthChanged) return;
    window.clearTimeout(this._resizeDebouncer);
    this._resizeDebouncer = window.setTimeout(this._setContainerHeights.bind(this), 100);
  }

  _handleSlotChange(e) {
    const children = e.target.assignedNodes().filter(item => item.dataset && !!item.dataset.accname);
    const values = children.map(item => item.dataset.accname);
    this.values = [...values];
    this._children = [...children];
  }

  _handleButtonClick(evt) {
    const selectedIndex = parseInt(evt.target.dataset.index);
    this.selectedIndex = (selectedIndex === this.selectedIndex) ? -1 : selectedIndex;
  }

  _valuesChanged() {
    this.dispatchEvent(new CustomEvent('values-changed', {detail: {value: this.values}}));
  }

  _selectedIndexChanged() {
    this.dispatchEvent(new CustomEvent('selected-index-changed', {detail: {value: this.selectedIndex}}));
    this._setContainerHeights();
  }

  _setContainerHeights() {
    console.info('set container heights');
    const btns = this.shadowRoot.querySelectorAll('ll-button');
    if(!btns) return;
    btns.forEach(btn => {
      const container = btn.nextElementSibling;
      const height = (btn.dataset.index == this.selectedIndex) ? container.scrollHeight + 'px' : 0;
      container.style.setProperty('--container-height', height);  
    });
  }

}

export const LLAccordion = Main;
window.customElements.define('ll-accordion', LLAccordion);

