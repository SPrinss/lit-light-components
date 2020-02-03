import { LitElementLight, html } from 'lit-element-light';

/**
 * Lit light UI Button Component
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
 * @cssprop --ll-button-border-color--disabled - Border Color for disabled State
 * @cssprop --ll-button-text-color--disabled - Text Color for disabled State
 * @cssprop --ll-button-fill--disabled - Background Color for disabled State
 */
class Main extends LitElementLight {

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
    this.label = 'My Button';

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
        ${this.noLabel ? html`` : html`<span>${this.label}</span>` }
        <!-- ${this.icon ? html`<ll-icon .icon="${this.icon}"></ll-icon>` : html`` } -->
      </button>
    `;
  }

  updated(props) {
    super.updated(props)
    if(props.has('icon') && !!this.icon) import('../icon');
    this.noLabel = !this.label;
  }

  set noLabel(noLabel) {
    this._noLabel = noLabel;
    if(noLabel) this.setAttribute('no-label', '');
    else this.removeAttribute('no-label');
  }

  get noLabel() {
    return this._noLabel;
  }

}

export const LLButton = Main;
window.customElements.define('ll-button', LLButton);