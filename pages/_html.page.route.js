const pages = import.meta.glob('./**/*.twig', { as: 'raw' })

export default (pageContext) => {
  // look at both /index.twig, /beans/index.twig
  const presumedFilePath = `.${pageContext.urlPathname}.twig`
  const alternateFilePath = `.${pageContext.urlPathname}index.twig` 

  if (pages[presumedFilePath] === undefined && pages[alternateFilePath] === undefined) {
    return false;
  };

  return {
    routeParams: {
      srcFilePath: pages[presumedFilePath] !== undefined ? presumedFilePath : alternateFilePath
    },
    precedence: 10,
  }
}