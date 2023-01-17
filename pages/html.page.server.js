import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";

const pages = import.meta.glob('./**/*.twig', { as: 'raw' })
const passToClient = ['pageProps', 'routeParams']

export { passToClient }

export { prerender }
export { onBeforeRender }
export { render }

// tell the framework all the URLs that will be generated
async function prerender(pageContext) {
  // look at both /index.twig, /beans/index.twig
  const prerender = Object.keys(pages).map(page => page.replaceAll('./', '/').replaceAll('/index.twig', '/').replaceAll('.twig', ''))
  return prerender
}

// preload the data on the server-side
async function onBeforeRender(pageContext) {
  const path = pageContext.urlPathname;
  let twig_src;

  // look at both /index.twig, /beans/index.twig
  if (pages[`.${path}index.twig`]) {
   twig_src = await pages[`.${path}index.twig`]()
  }
  else {
    twig_src = await pages[`.${path}.twig`]()
  }

  return {
    pageContext: {
      twig: twig_src
    }
  }  
}

// render the page html
function render(pageContext) {
  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageContext.twig)}</div>
      </body>
    </html>`
}