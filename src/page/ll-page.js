import { LitElementLight, html } from 'lit-element-light';

/**
 * Lit light Page Component
 * @element ll-page
 * 
 */
class Main extends LitElementLight {
  get template() {
    return html`
      <link rel="stylesheet" href="./src/page/ll-page.css">
      <header><slot name="header"></slot></header>
      <main><slot name="body"></slot></main>
      <footer><slot name="footer"></slot></footer>
    `;
  }

}

export const LLPage = Main;
window.customElements.define('ll-page', LLPage);
