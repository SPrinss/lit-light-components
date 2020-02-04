import { LitElementLight, html } from 'lit-element-light';

/**
 * Lit light Selector Component
 * @element ll-selector
 * @slot
 * 
*/
class Main extends LitElementLight {

  static get properties() {
    return { 
      
      options: {
        type: Array,
      },

      values: {
        type: Array,
        hasChanged: function(newVal, oldVal) {
          return JSON.stringify(newVal) !== JSON.stringify(oldVal);
        }
      },

      value: {
        type: String,
      },

      multi: {
        type: Boolean
      },

      attrForSelected: {
        type: String,
        attribute: 'attr-for-selected'
      },

      selectedClassName: {
        type: String,
        attribute: 'selected-class-name'
      },

      _children: []

    };
  }

  constructor() {
    super();

    /**
     * Options
     * @type {Array}
     */
    this.options = [];

    /**
     * Selected values
     * @type {Array}
     */
    this.values = [];

    /**
     * When `true`, multiple selections are allowed
     * @type {Boolean}
     */
    this.multi = false;

    /**
     * Determines which attribute should be used as the `value` value.
     * @type {Boolean}
     */
    this.attrForSelected = 'value';

    /**
     * Classname added to child element when item is selected
     * @type {Boolean}
     */
    this.selectedClassName = 'll-selected';

    this._children = [];

    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));

  }

  connectedCallback() {
    super.connectedCallback();
    this._valuesChanged();
  }

  updated(props) {
    super.updated(props);
    if(props.has('_children')) this._childrenChanged(this._children, props.get('_children'));
    if(props.has('values') || props.has('_children')) this._valuesChanged();
  }

  get template() {
    return html`
      <slot></slot>
    `;
  }

  get value() {
    return (this.values || [])[0];
  }

  _firePropChange(propname) {
    this.dispatchEvent(new CustomEvent(`${propname}-changed`, {detail: {value: this[propname]}}));
  }

  _handleSlotChange(e) {
    const nodes = Array.from(e.target.assignedNodes());
    const children = nodes.filter(item => item[this.attrForSelected] || item.getAttribute && item.getAttribute(this.attrForSelected));
    const options = children.map(item => item[this.attrForSelected] || item.getAttribute && item.getAttribute(this.attrForSelected));
    this.options = [...options];
    this._children = [...children];
  }

  _childrenChanged(children, oldValues) {
    (oldValues || []).map(item => {
      const itemIsDeleted = children.indexOf(item) === -1;
      if(itemIsDeleted) this._removeClickEvent(item);
    });
    (children || []).map(item => {
      const itemIsAdded = oldValues.indexOf(item) === -1;
      if(itemIsAdded) this._addClickEvent(item);
    });
  }

  _addClickEvent(item) {
    item.addEventListener('click', this._handleButtonClick.bind(this));
  }

  _removeClickEvent(item) {
    item.removeEventListener('click', this._handleButtonClick.bind(this));
  }

  _handleButtonClick(evt) {
    
    const $item = evt.target;
    const value = $item[this.attrForSelected] || $item.getAttribute && $item.getAttribute(this.attrForSelected);

    const valueIndex = this.values.indexOf(value);
    const valueExists = valueIndex !== -1;

    const newValues = [];

    if(this.multi === true) {
      for(var i in this.values) {
        if(this.values[i] !== value) newValues.push(this.values[i]);
      }
      if(!valueExists) newValues.push(value);
    } else {
      newValues.push(value);
    }
    
    this.values = [...newValues];

  }

  _valuesChanged() {
    this._children.map($child => {
      const value = $child[this.attrForSelected] || $child.getAttribute && $child.getAttribute(this.attrForSelected);
      const valueExists = this.values.indexOf(value) !== -1;
      if(valueExists) $child.classList.add(this.selectedClassName);
      else $child.classList.remove(this.selectedClassName);
    });
    this._firePropChange('values');
  }

}

export const LLSelector = Main;
window.customElements.define('ll-selector', LLSelector);