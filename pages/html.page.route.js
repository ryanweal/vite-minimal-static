const pages = import.meta.glob('./*.twig', { as: 'raw' })

export const iKnowThePerformanceRisksOfAsyncRouteFunctions = true

export default async (pageContext) => {
  const presumedFilePath = `.${pageContext.urlPathname == '/' ? '/index' : pageContext.urlPathname}.twig`

  if (pages[presumedFilePath] === undefined) {
    return false;
  };

  const twig = await pages[presumedFilePath]()

  return {
    // here we can add anything to our route object
    routeParams: {
      twig
    }
  }
}