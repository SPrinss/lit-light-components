import { LitElement, html, css } from 'lit-element';
import { Colors, BodyText, BorderRadius } from '../styles';
import '../button';
import '../icon';

/**
 * Lit light Checkbox Component
 * @element ll-checkbox
 * 
 * @cssprop --ll-checkbox-fill - Checkbox Background Fill
 * @cssprop --ll-checkbox-color - Checkbox Tint Color
 * 
*/
class Main extends LitElement {

  static get properties() {
    return { 
      
      checked: {
        type: Boolean,
      },

      label: {
        type: String,
      },

    };
  }

  constructor() {
    super();

    /**
     * Checked state
     * @type {Boolean}
     */
    this.checked = false;

    /**
     * Text Label
     * @type {String}
     */
    this.label = 'My Label';

    this.addEventListener('click', this._handleClick.bind(this));

  }

  connectedCallback() {
    super.connectedCallback();
    if(!this.hasAttribute('tabindex') && !this.disabled) this.setAttribute('tabindex', 0);    
  }

  updated(props) {
    if(props.has('checked')) this.dispatchEvent(new CustomEvent('checked-changed', {detail: {value: this.checked}}));
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        cursor: pointer;
        outline: none;
      }

      ll-button {
        display: flex;
        align-items: center;
        justify-content: center;
        --ll-button-fill: white;
        --ll-button-text-color: var(--ll-color-green);
        --ll-button-border-radius: var(--ll-border-radius);
        padding: 0;
      }

      label {
        padding-left: 9px;
        user-select: none;
        cursor: pointer;
        color: var(--ll-checkbox-color, var(--ll-color-black));
      }
    `;
  }

  render() {
    return html`
      <style>
        :host {
          ${BorderRadius}
          ${Colors}
        }

        label {
          ${BodyText}
        }
      </style>
      <div>
      <ll-button
        small
        .icon="${this.checked ? 'done' : ''}"
        label=""
      ></ll-button>
      </div>
      <label>${this.label}</label>
    `;
  }

  _handleClick() {
    this.checked = !this.checked;
  }

}

export const LLCheckbox = Main;
window.customElements.define('ll-checkbox', LLCheckbox);