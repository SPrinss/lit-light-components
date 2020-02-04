import { LitElement, html, css} from 'lit-element';
import { Sizings, Colors } from '../styles';
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
export class Main extends LitElement {

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
    this.style.setProperty('--ll-button-group-numitems', this.options.length);
  }

  static get styles() {
    return css`
      
      :host {
        display: block;
        --ll-button-group-gap-size: var(--ll-margin--medium);
      }

      :host([switch]) ll-selector {
        border: 2px solid var(--ll-color-green);
        padding: 0;
        border-radius: 5px;
        overflow: hidden;
        --ll-button-group-gap-size: 0;
      }

      ll-selector {
        display: var(--ll-button-group-display, block);
        grid-template-columns: repeat(var(--ll-button-group-cols, var(--ll-button-group-numitems)), 1fr);
        grid-gap: var(--ll-button-group-gap-size, var(--ll-margin--medium));
      }

      ll-button {
        --ll-button-border-radius: var(--ll-border-radius);
        --ll-button-text-color: var(--ll-color-black);
        --ll-button-text-color--active: var(--ll-color-black);
        --ll-button-fill: white;
        margin: 0;
      }

      :host([switch]) ll-button {
        --ll-border-radius: 0;        
        margin: 0;
      }

      ll-button.ll-selected {
        --ll-button-fill: var(--ll-gradient-greenblue);
        --ll-button-text-color: white;
        --ll-button-text-color--active: white;
      }

    `;
  }

  render() {
    return html`
      <style>
        :host {
          ${Sizings}
          ${Colors}
        }
      </style>
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
