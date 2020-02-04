import { LitElementLight, html } from 'lit-element-light';
import '../icon';

/**
 * Lit light Card Component
 * @element ll-card
 * 
 * @cssprop --ll-card-fill - Card Background Fill
 * @cssprop --ll-card-color - Card Text Color
 * 
 */
class Main extends LitElementLight {

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

  get template() {
    return html`
      <link rel="stylesheet" href="./src/card/ll-card.css">

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