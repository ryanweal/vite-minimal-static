import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";

export { render }
export { passToClient }

const passToClient = ['pageProps', 'routeParams']

function render(pageContext) {

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageContext.routeParams.twig)}</div>
      </body>
    </html>`
}