import { LitElementLight, html } from 'lit-element-light';
import { MultiPropertyObserver } from 'lit-element-light/multi-property-observer-mixin';

/**
 * Lit light Button Component
 * @element ll-button

  * @cssprop --ll-button-background
  * @cssprop --ll-button-background--focus
  * @cssprop --ll-button-background--hover
  * @cssprop --ll-button-background--active
  * @cssprop --ll-button-background--disabled

  * @cssprop --ll-button-color
  * @cssprop --ll-button-color--focus
  * @cssprop --ll-button-color--hover
  * @cssprop --ll-button-color--active
  * @cssprop --ll-button-color--disabled

  * @cssprop --ll-button-border-width

  * @cssprop --ll-button-border-color
  * @cssprop --ll-button-border-color--focus
  * @cssprop --ll-button-border-color--hover
  * @cssprop --ll-button-border-color--active
  * @cssprop --ll-button-border-color--disabled

  * @cssprop --ll-button-border-radius
  * @cssprop --ll-button-transition-time
  * @cssprop --ll-button-text-align
 * 
 */
class Main extends MultiPropertyObserver(LitElementLight) {

  static get properties() {
    return { 

      disabled: {
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
     * When `true`, button is not clickable
     * @type {Boolean}
     */
    this.disabled = false;

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
      <button ?disabled="${this.disabled}" .value="${this.value}" tabindex="0">
        <span><slot></slot></span>
        ${this.icon ? html`<ll-icon .icon="${this.icon}"></ll-icon>` : html`` }
      </button>
    `;
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
  }

  get observers() {
    return {
      _iconChanged: ['icon'],
      _labelChanged: ['label'],
      _disabledChanged: ['disabled']
    };
  }

  _handleSlotChange(e) {
    const noLabel = e.target.assignedNodes().length === 0;
    if(noLabel) return this.setAttribute('no-label', '');
    this.removeAttribute('no-label');
  } 

  _iconChanged() {
    if(this.icon) import('../icon');
  }

  _labelChanged() {
    if(!this.label) this.setAttribute('no-label', '');
    else this.removeAttribute('no-label');
  }

  _disabledChanged() {
    if(this.disabled) {
      this.removeAttribute('tabindex');
      this.setAttribute('aria-disabled', 'true');
    } else {
      if(!this.hasAttribute('role')) this.setAttribute('role', 'button');
      this.removeAttribute('aria-disabled');
    }

  }

}

export const LLButton = Main;
window.customElements.define('ll-button', LLButton);