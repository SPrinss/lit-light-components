import { LitElementLight, html } from 'lit-element-light';
import { MultiPropertyObserver } from 'lit-element-light/multi-property-observer-mixin';
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
class Main extends MultiPropertyObserver(LitElementLight) {

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

  get observers() {
    return {
      _checkedChanged: ['checked']
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if(!this.hasAttribute('tabindex') && !this.disabled) this.setAttribute('tabindex', 0);    
  }

  get template() {
    return html`
      <link rel="stylesheet" href="./src/checkbox/ll-checkbox.css">

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

  _checkedChanged() {
    this.dispatchEvent(new CustomEvent('checked-changed', {detail: {value: this.checked}}));
  }

  _handleClick() {
    this.checked = !this.checked;
  }

}

export const LLCheckbox = Main;
window.customElements.define('ll-checkbox', LLCheckbox);