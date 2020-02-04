import { LitElement, html, css } from 'lit-element';
import { DropShadows, Gradients, Colors, ButtonText, BodyText, BorderRadius, ButtonStyles } from '../styles';

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
 * @cssprop --ll-button-border-color--disabled - Border Color for disabled State
 * @cssprop --ll-button-text-color--disabled - Text Color for disabled State
 * @cssprop --ll-button-fill--disabled - Background Color for disabled State
 */
class Main extends LitElement {

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

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host button, :host([small]) button {
        display: flex;
        text-align: var(--ll-button-text-align, center);
        --ll-icon-color: var(--ll-button-text-color, white);
        padding: 0 15px;
      }

      :host([no-label]) {
        width: 54px;
      }

      :host([small][no-label]) {
        width: 48px;
      }

      button:active {
        border-color: var(--ll-button-border-color--active, var(--ll-color-white));
        color: var(--ll-button-text-color--active, var(--ll-color-white));
        --ll-icon-color: var(--ll-button-text-color--active, var(--ll-color-white));
        background: var(--ll-button-fill--active, var(--ll-gradient-greenblue));
      }

      button:focus:not(:active) {
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
        cursor: default;
      }

      :host([disabled]) button {
        color: var(--ll-button-text-color--disabled, var(--ll-color-white));
        --ll-icon-color: var(--ll-button-text-color--disabled, var(--ll-color-white));
      }

      :host([raised]) button {
        box-shadow: var(--ll-drop-shadow-1);
        border-color: transparent;
      }

      :host([raised]) button:active {
        border-color: var(--ll-button-border-color--active, transparent);
        box-shadow: none;
        transform: translate(0px, 2px);
      }
        
      span {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 1.25;
      }

      span + ll-icon {
        padding-left: 8px;
      }

      ll-icon {
        flex: none;
      }

      :host([no-label]) span {
        display: none;
        padding: 0;
      }

      :host([no-label]) ll-icon {
        padding: 0;
      }

    `;
  }

  render() {
    return html`
      <style>
        
        :host {
          ${Colors}
          ${Gradients}
          ${BorderRadius}
          ${DropShadows}
        }

        button {
          ${ButtonText}
          ${BorderRadius}
          ${ButtonStyles()}
        }

        :host([small]) button {
          ${BodyText}
          ${ButtonStyles('small')}
        }

      </style>
      <button>
        <span>${this.label}</span>
        ${this.icon ? html`<ll-icon .icon="${this.icon}"></ll-icon>` : html`` }
    </button>
    `;
  }

  updated(props) {
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