export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.append(element);
  }
}

