import { LitElement, html, css} from 'lit-element';
import { Colors, InputStyles, BodyText } from '../styles';

/**
 * Conamore UI Text Input Component
 * 
 * @cssprop --ll-text-input-border-color - Border Color
 * @cssprop --ll-text-input-border-color--focus - Border Color for Focus State
 * @cssprop --ll-text-input-border-color--not-empty - Border Color for Empty State
 * @cssprop --ll-text-input-border-color--invalid - Border Color for Invalid State
 * @element ll-text-input
 * 
 * @fires value-changed - Event fired when value is changed
 * 
 * @fires invalid-changed - Event fired when invalid is changed
 * 
 */
export class Main extends LitElement {

  static get properties() {
    return {

      type: {
        type: String
      },
      
      value: {
        type: String,
      },

      name: {
        type: String
      },  
      
      disabled: {
        type: Boolean,
        reflect: true
      },

      invalid: {
        type: Boolean,
        reflect: true
      }

    };
  }

  constructor() {
    super();

    /**
     * Input Type
     * @type {String}
     */
    this.type = 'email';

    /**
     * Text value
     * @type {String}
     */
    this.value = '';

    /**
     * Name
     * @type {String}
     */
    this.name = 'My Text Input Name';

    /**
     * When `true`, input is not editable
     * @type {Boolean}
     */
    this.disabled = false;

    /**
     * When `true`, type criteria not reach
     * @type {Boolean}
     */
    this.invalid = false;
  }

  update(props) {
    super.update(props);
    if(props.has('value')) this._valueChanged();
    if(props.has('invalid')) this._invalidChanged();
  }

  get value() {
    return this.invalid ? undefined : this._value;
  }

  set value(value) {
    const oldVal = this._value;
    this._value = value;
    this.requestUpdate('value', oldVal);
  }

  get getInvalid() {
    const $input = this.shadowRoot.querySelector('input');
    return $input && !$input.checkValidity();
  }

  _valueChanged() {
    this.dispatchEvent(new CustomEvent('value-changed', {detail: {value: this.value}}));
  }

  _invalidChanged() {
    this.dispatchEvent(new CustomEvent('invalid-changed', {detail: {value: this.invalid}}));
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.invalid = this.getInvalid;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }

      input {
        -webkit-appearance: none;
        box-sizing: border-box;
        padding: 0;
        border-radius: 0;
        display: block; 
        border-bottom: 2px solid var(--ll-text-input-border-color, var(--ll-color-grey));
        transition: 0.5s border-bottom-color;
        background: transparent;
      }

      label {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        opacity: 0.5;
        color: --ll-color-black;
        user-select: none;
        pointer-events: none;
        transition: 0.3s transform ease;
        transform-origin: 0 0;
        transform: none;
      }

      input:focus {
        border-bottom-color: var(--ll-text-input-border-color--focus, var(--ll-color-black));
      }

      input:not([value='']) + label {
        transform: scale(0.8) translateY(-24px);
        border-bottom-color: var(--ll-text-input-border-color--not-empty, var(--ll-color-black));
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
        user-select: none;
        cursor: default;
      }

      :host([invalid]) input {
        border-bottom-color: var(--ll-text-input-border-color--invalid, var(--ll-color-red));
      }

    `;
  }

  render() {
    return html`
      <style>
        :host {
          ${Colors}
        }
        input {
          ${InputStyles}
          ${BodyText}
        }
      </style>
      <input
        type="${this.type}"
        value="${this.value}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
      >
      <label>${this.name}</label>
    `;
  }

}

export const LLTextInput = Main;
window.customElements.define('ll-text-input', LLTextInput);
