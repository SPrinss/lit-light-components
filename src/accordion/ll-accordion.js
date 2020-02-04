import { LitElement, html } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
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
class Main extends LitElement {

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

  render() {
    return html`
      <link rel="stylesheet" href="./src/accordion/ll-accordion.css">
      ${this.values.map((val, i) => html`
        <ll-button
          small
          .label="${val}"
          .icon="${i === this.selectedIndex ? 'close' : 'add'}"
          data-index="${i}"
          @click="${this._handleButtonClick}"
          ?data-opened="${i === this.selectedIndex}"
        ></ll-button>
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

    this.shadowRoot.addEventListener('slotchange', this._childrenChanged.bind(this));
  }

  updated(props) {
    if(props.has('selectedIndex')) this._selectedIndexChanged();
    if(props.has('values')) this._valuesChanged();
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
    this._values = [...values];
    this.requestUpdate('values', oldVal);
  }

  _childrenChanged(e) {
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
    this._setOpenedContainerHeight();
  }

  _selectedIndexChanged() {
    this.dispatchEvent(new CustomEvent('selected-index-changed', {detail: {value: this.selectedIndex}}));
    this._setOpenedContainerHeight();
  }

  _setOpenedContainerHeight() {
    const $container = this.shadowRoot.querySelector('.container[data-opened]');
    if(!$container) return;
    const contentElement = $container.children[0];
    const contentHeight = contentElement.offsetHeight;
    this.style.setProperty('--container-height', contentHeight + 'px');
  }

}

export const LLAccordion = Main;
window.customElements.define('ll-accordion', LLAccordion);

