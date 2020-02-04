import { LitElementLight, html } from 'lit-element-light';

/**
 * Conamore UI Progress bar Component
 * @element ll-progress-bar
 * 
 * @cssprop --ll-progress-bar-height - Bar Height
 * @cssprop --ll-progress-bar-color - Bar Color
 */
class Main extends LitElementLight {
  get template() {
    return html`
      <link rel="stylesheet" href="src/progress-bar/ll-progress-bar.css">
      <div id="progress-bar">
        ${this._maxArray.map((item, i) => html`<span ?data-active="${(this.value > i)}"></span>`)}
      </div>
    `;
  }

  static get properties() {
    return {

      value: {
        type: Number,
      },

      max: {
        type: Number,
      },

      solid: {
        type: Boolean,
      }

    };
  }

  constructor() {
    super();

    /**
     * Value
     * @type {Number}
     */
    this.value = 1;

    /**
     * Max value
     * @type {Number}
     */
    this.max = 2;

    /**
     * If `true`, the bar is a solid line instead of a collection of lines. 
     * @type {Boolean}
     */
    this.solid = false;
  }

  get _maxArray() {
    const values = [];
    for(let i=0;i<=(this.max || 0)-1 ; i++) values.push(i);
    return values;
  }

}

export const LLProgressBar = Main;
window.customElements.define('ll-progress-bar', LLProgressBar);
