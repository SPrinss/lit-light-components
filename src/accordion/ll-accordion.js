import { LitElement, html, css } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import { Colors } from '../styles';
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

  static get styles() {
    return css`
      :host {
        display: block;
        border-bottom: 1px solid var(--ll-color-black);
      }

      ll-button {
        --ll-button-text-align: start;
        --ll-button-fill: transparent;
        --ll-button-text-color: var(--ll-color-black);
        --ll-button-border-radius: 0;
        --ll-button-border-color: transparent;
        --ll-button-border-color--active: transparent;
        border: 1px solid var(--ll-color-black);
        display: block;
        margin-bottom: -1px;
      }

      ll-button:hover {
        --ll-button-fill: var(--ll-color-yellow);
      }

      ll-button[data-opened] {
        border-bottom: 0;
        --ll-button-fill: var(--ll-color-yellow);
      }

      #slotContainer {
        display: none;
      }

      .container {
        background-color: var(--ll-color-yellow);
        overflow: hidden;
        height: 0px;
        width: 100%;
        transition: 0.5s height ease;
        box-sizing: border-box;
      }

      .container > * {
        padding: 16px;
      }

      .container[data-opened] {
        height: var(--container-height);
        border-left: 1px solid var(--ll-color-black);
        border-right: 1px solid var(--ll-color-black);
      }

    `;
  }

  render() {
    return html`
      <style>
        :host {
          ${Colors}
        }
      </style>

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

    this.shadowRoot.addEventListener('slotchange', (e) => {
      const nodes = Array.from(e.target.assignedNodes());
      const children = nodes.filter(item => item.dataset && !!item.dataset.accname);
      const values = children.map(item => item.dataset.accname);
      this.values = [...values];
      this._children = [...children];
    });
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

