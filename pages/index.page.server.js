import { escapeInject } from "vite-plugin-ssr";

export { render }

function render() {
  return escapeInject`<h1>Hello world</h1>`
}