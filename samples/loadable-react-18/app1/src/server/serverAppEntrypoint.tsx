import type { RenderAndExtractContextOptions } from './renderAndExtractContext';

export async function renderAndExtractContext({
  // express objects
  // req,
  // @loadable chunk extractor
  chunkExtractor,
}: RenderAndExtractContextOptions) {
  const { renderAndExtractContext } = await import('./renderAndExtractContext');
  return await renderAndExtractContext({ chunkExtractor });
}
