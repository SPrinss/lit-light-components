import { LitElementLight, html } from 'lit-element-light';
import '../selector';
import '../button';

/**s
 * Lit light Button Group Component
 * @element ll-button-group
 * 
 * @cssprop --ll-button-group-display - Can be set to `grid` to enable grid view.
 * 
 * @cssprop --ll-button-group-cols - Number of columns when display == `grid`
 */
export class Main extends LitElementLight {

  static get properties() {
    return {

      options: {
        type: Array
      },

      selectedValues: {
        type: Array,
        attribute: 'selected-values'
      },
      
      small: {
        type: Boolean
      },

      multi: {
        type: Boolean
      },

      switch: {
        type: Boolean,
        reflect: true
      }

    };
  }

  constructor() {
    super();

    /**
     * Options
     * @type {Array}
     */
    this.options = [
      {label: 'One', value: 1},
      {label: 'Two', value: 2},
      {label: 'Three', value: 3}
    ];

    /**
     * Selected values
     * @type {Array}
     */
    this.selectedValues = [];

    /**
     * When `true`, buttons are smaller in size
     * @type {Boolean}
     */
    this.small = false;

    /**
     * When `true`, multiple buttons can be selected
     * @type {Boolean}
     */
    this.multi = false;
    
    this.switch = false;
  }

  updated() {
    super.updated();
    this.style.setProperty('--ll-button-group-numitems', this.options.length);
  }

  get template() {
    return html`
      <link rel="stylesheet" href="./src/button-group/ll-button-group.css">

      <ll-selector
        .multi="${this.multi}"
        .values="${this.selectedValues}"
        @values-changed="${this._valuesChanged}"
      >
        ${this.options.map(item => {
    return html`
                  <ll-button
                    .label="${item.label}"
                    .value="${item.value}"
                    ?small="${this.small}"
                  ></ll-button>
                `;
  })}
      </ll-selector>
    `;
  }

  _valuesChanged(evt) {
    this.selectedValues = [...evt.detail.value];
    this.dispatchEvent(new CustomEvent('selected-values-changed', {detail: {value: this.selectedValues}}));
  }

}

export const LLButtonGroup = Main;
window.customElements.define('ll-button-group', LLButtonGroup);
