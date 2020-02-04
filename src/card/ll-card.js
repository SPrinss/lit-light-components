import { LitElement, html, css } from 'lit-element';
import { Sizings, Gradients, Colors, BodyText, BorderRadius, DropShadows } from '../styles';
import '../icon';

/**
 * Lit light Card Component
 * @element ll-card
 * 
 * @cssprop --ll-card-fill - Card Background Fill
 * @cssprop --ll-card-color - Card Text Color
 * 
 */

class Main extends LitElement {

  static get properties() {
    return { 
      
      imageUrl: {
        type: String,
        attribute: 'image-url'
      },

      title: {
        type: String
      }

    };
  }

  constructor() {
    super();
    
    /**
     * Card title
     * @type {String}
     */
    this.title = 'Another card title';

    /**
     * Image URL
     * @type {String}
     */
    this.imageUrl = 'http://placehold.it/800x450';
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        background: var(--ll-card-fill, var(--ll-color-white));
        box-sizing: border-box;
        border-radius: var(--ll-border-radius);
        overflow: hidden;
      }

      header {
        max-height: 300px;
        flex: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      main {
        flex: 2;
        padding: var(--ll-margin--large);
        color: var(--ll-card-color, var(--ll-color-black));
      }

      h3 {
        margin: 0;
        font-weight: normal;
      }
    `;
  }

  render() {
    return html`
      <style>
        :host {
          ${BorderRadius}
          ${Colors}
          ${Gradients}
          ${Sizings}
          ${DropShadows}
        }

        h3 {
          ${BodyText}
        }

        img {
          width: 100%;
        }
      </style>

      <header>
        <img src="${this.imageUrl}">
      </header>
      <main>
        <h3>${this.title}</h3>
      </main>

    `;
  }


}

export const LLCard = Main;
window.customElements.define('ll-card', LLCard);