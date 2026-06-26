declare const obj: object;

export const proto = Object.getPrototypeOf(obj);

export class Widget {
  render() {
    return "widget";
  }
}

export const render = Widget.prototype.render;
