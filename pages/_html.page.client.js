import "./global.scss";
import.meta.glob(['./**/*.js', '!./**/*client.js', '!./**/*server.js', '!./**/route.js'], { eager: true });

export { render }

async function render(pageContext) {
  console.log("Client-side JS!");
}
