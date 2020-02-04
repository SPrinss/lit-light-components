import { LitElement, html, css } from 'lit-element';
import { H1, BodyText, Sizings  } from '../styles';

/**
 * Conamore UI Page Component
 * @element ll-page
 * 
 */
class Main extends LitElement {
  render() {
    return html`
      <style>
        
        :host {
          display: block;
          ${BodyText}
          ${Sizings}
          padding: var(--ll-margin--large);
        }
        
        ::slotted(h1) {
          ${H1}
        }

        /* @media(min-width: 800px) {
          :host {
            display: grid;
            grid-gap: var(--ll-padding--xlarge);
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 3fr;
            grid-template-areas: 
              'header header'
              'footer body'
              'footer body'
          }
        }

        @media(min-width: 800px) {
          header, main, footer {
          }

          header {
            grid-area: header;
          }

          main {
            grid-area: body;
          }

          footer {
            grid-area: footer;
          }
        } */

      </style>

      <header><slot name="header"></slot></header>
      <main><slot name="body"></slot></main>
      <footer><slot name="footer"></slot></footer>
    `;
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`

        ::slotted(h1) {
          margin-bottom: var(--ll-margin--large);
        }

        main {
          padding: var(--ll-margin--large) 0;
        }

        footer {
          padding-top: var(--ll-margin--large);
          padding-bottom: var(--ll-margin--xxlarge);
        }
    `;
  }

}

export const LLPage = Main;
window.customElements.define('ll-page', LLPage);
