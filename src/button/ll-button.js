import { LitElementLight, html } from 'lit-element-light';
import { MultiPropertyObserver } from 'lit-element-light/multi-property-observer-mixin';

/**
 * Lit light Button Component
 * @element ll-button

 * @cssprop --ll-button-text-align - Text Align
 * 
 * @cssprop --ll-button-border-color - Border Color
 * @cssprop --ll-button-text-color - Text Color
 * @cssprop --ll-button-fill - Background Color
 * 
 * @cssprop --ll-button-border-color--active - Border Color for active State
 * @cssprop --ll-button-text-color--active - Text Color for active State
 * @cssprop --ll-button-fill--active - Background Color for active State
 * 
 */
class Main extends MultiPropertyObserver(LitElementLight) {

  static get properties() {
    return { 
      
      label: {
        type: String,
      },
      
      disabled: {
        type: Boolean,
        reflect: true
      },

      small: {
        type: Boolean,
        reflect: true
      },

      raised: {
        type: Boolean,
        reflect: true
      },

      icon: {
        type: String
      },

      value: {
        type: String
      }

    };
  }

  constructor() {
    super();

    /**
     * Text label
     * @type {String}
     */
    this.label = '';

    /**
     * When `true`, button is not clickable
     * @type {Boolean}
     */
    this.disabled = false;

    /**
     * When `true`, button is smaller in size
     * @type {Boolean}
     */
    this.small = false;

    /**
     * When true, the button has a drop-shadow
     */
    this.raised = false;

    /**
     * Display an icon (one of `ll-icon`)
     */
    this.icon = '';

    /**
     * Button value
     */
    this.value = '';

  }

  get template() {
    return html`
      <link rel="stylesheet" href="./src/button/ll-button.css">
      <button>
        <span>${this.label}</span>
        ${this.icon ? html`<ll-icon .icon="${this.icon}"></ll-icon>` : html`` }
      </button>
    `;
  }

  get observers() {
    return {
      _iconChanged: ['icon'],
      _labelChanged: ['label']
    };
  }

  _iconChanged(icon) {
    if(icon) import('../icon');
  }

  _labelChanged(label) {
    if(!label) this.setAttribute('no-label', '');
    else this.removeAttribute('no-label');
  }

}

export const LLButton = Main;
window.customElements.define('ll-button', LLButton);