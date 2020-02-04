import { LitElement, html, css } from 'lit-element';
import { BorderRadius } from '../styles';
import { Colors, Gradients } from '../styles';

/**
 * Conamore UI Progress bar Component
 * @element ll-progress-bar
 * 
 * @cssprop --ll-progress-bar-height - Bar Height
 * @cssprop --ll-progress-bar-color - Bar Color
 */
class Main extends LitElement {
  render() {
    return html`
      <style>
        :host {
          display: block;
          ${Colors}
          ${BorderRadius}
          ${Gradients}
        }
      </style>
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

  static get styles() {
    return css`

      #progress-bar {
        width: 100%;
        height: 100%;
        z-index: 2;
        overflow: hidden;
        display: flex;
        padding: 0 3px;
        margin: 3px 0;
        box-sizing: border-box;
        height: var(--ll-progress-bar-height, 3px);
      }

      span {
        flex: 1;
        margin: 0 3px;
        border-radius: var(--ll-border-radius, 5px);
        overflow: hidden;
        position: relative;
      }

      :host([solid]) span {
        margin: 0;
        border-radius: 0;
      }

      span:before, span:after {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: '';
        position: absolute;
      }

      span:before {
        opacity: 0.35;
      }

      span:after {
        background: var(--ll-progress-bar-color, var(--ll-gradient-greenblue));
        opacity: 0.1;
        transition: 0.5s opacity ease-in-out;
      }

      span[data-active]:after {
        opacity: 1;
      }
    `;
  }

}

export const LLProgressBar = Main;
window.customElements.define('ll-progress-bar', LLProgressBar);
