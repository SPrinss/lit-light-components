import { UpdatingElement } from 'lit-element';

/**
 * Conamore UI Icon Component
 * @element ll-icon
 * 
 * @cssprop --ll-icon-color - Stroke Color
 */
class Main extends UpdatingElement {

  static get properties() {
    return {
      
      icon: {
        type: String
      }

    };
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
  }

  updated() {
    const svgIcon = this.svgIcon || '';
    const viewboxValue = (svgIcon.match(/viewbox="(.*?)"/i) || [])[1];
    if(!this.svgIcon) return this.render(null, '__empty');
    this.render(viewboxValue, svgIcon); 
  }

  render(viewboxValue, svgIcon) {
    this._shadowRoot.innerHTML = `
      <link rel="stylesheet" href="src/icon/ll-icon.css">
      <svg viewBox="${viewboxValue || '0 0 24 24'}" id="ll-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        ${svgIcon}
      </svg>
    `;
  }

  get svgIcon() {
    const ICONS = {
      'arrow-left': `
        <g viewBox="0 0 30 30" fill="none">
        <line x1="29" y1="14.75" x2="2" y2="14.75" stroke-width="1.5"/>
        <path d="M15.9758 1L2.00001 15L15.9758 29" stroke-width="1.5"/>
        </g>      
      `,
      'arrow-down': `
        <g viewBox="0 0 30 30" fill="none">
        <line x1="14.5" y1="0.951538" x2="14.5" y2="27.9515"/>
        <path d="M1 13.9758L15 27.9515L29 13.9758"/>
        </g>      
      `,
      'arrow-right': `
        <g viewBox="0 0 30 30" fill="none" style="transform:rotate(180deg);transform-origin:center">
        <line x1="29" y1="14.75" x2="2" y2="14.75" stroke-width="1.5"/>
        <path d="M15.9758 1L2.00001 15L15.9758 29" stroke-width="1.5"/>
        </g>      
      `,
      'close': `
        <g viewBox="0 0 21 22" fill="none">
        <line y1="-0.75" x2="27" y2="-0.75" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 20.0919)"/>
        <line y1="-0.75" x2="27" y2="-0.75" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 19.0919 21.0919)"/>
        </g>      
      `,
      'add': `
        <g viewBox="0 0 27 27" fill="none">
        <line y1="-0.5" x2="27" y2="-0.5" transform="matrix(1 0 0 -1 0 14)"/>
        <line y1="-0.5" x2="27" y2="-0.5" transform="matrix(0 -1 -1 0 14 27)"/>
        </g>      
      `,
      'logo': `
        <g viewBox="0 0 108 78" stroke-width="2" fill="none">
          <ellipse
            cx="39"
            cy="39"
            rx="22.809"
            ry="29.517"
            transform="rotate(-45 39 39)"
            stroke-linecap="round"
          />
          <path d="M42.614 41.981c.935-6.583 4.328-13.453 9.984-19.11 11.527-11.526 28.093-13.65 37-4.743 8.908 8.908 6.784 25.473-4.743 37-5.657 5.657-12.527 9.05-19.11 9.985"
            stroke-linecap="round"
          />
        </g>
      `,
      'heart': `
      <g viewBox="0 0 43 43" fill="none" style="fill:var(--ll-icon-color, var(--ll-color-black))">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6683 12.8766C20.5883 13.4878 21.8379 13.4878 22.7579 12.8766C26.6417 10.2962 31.9312 10.718 35.3553 14.1421C39.2605 18.0474 39.2605 24.379 35.3553 28.2843L22.6273 41.0122C21.8463 41.7932 20.58 41.7932 19.7989 41.0122L7.071 28.2843C3.16576 24.379 3.16576 18.0474 7.071 14.1421C10.4951 10.718 15.7846 10.2962 19.6683 12.8766Z"/>
      </g>
      `,
      'done': `
        <g viewBox="0 0 16 16" fill="none">
        <path d="M1 9.10811L5.37863 13.881C6.32068 14.9079 7.99783 14.6807 8.63275 13.4402L15 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      `,
      '__empty': `
        <g></g>
      `,
      'pencil': `
      <g viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="17.821" y="1.17894" width="5" height="19" transform="rotate(45 17.821 1.17894)" stroke-linejoin="round"/>
        <path d="M4.38599 14.614L7.92152 18.1495L2.61822 19.9173L4.38599 14.614Z" stroke-linejoin="round"/>
        <path d="M3.67896 16.7353L5.80028 18.8566L2.61829 19.9173L3.67896 16.7353Z" fill="black"/>
        <line x1="19.5888" y1="2.58883" x2="6.15375" y2="16.0239"/>
      </svg>      
      `
    };
    return ICONS[this.icon || 'empty'];
  }

}

export const LLIcon = Main;
window.customElements.define('ll-icon', LLIcon);

