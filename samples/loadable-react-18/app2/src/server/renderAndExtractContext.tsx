import React from 'react';
// import { Request } from 'express';
import { ChunkExtractor } from '@loadable/server';
import { renderToStaticMarkup } from 'react-dom/server';

import App from '../client/components/App';

export type RenderAndExtractContextOptions = {
  // req: Request;
  chunkExtractor: ChunkExtractor;
};
export type RenderAndExtractContextResult = {
  markup: string;
  linkTags: string;
  scriptTags: string;
};

export type RenderAndExtractContextFunction = (
  options: RenderAndExtractContextOptions,
) => Promise<RenderAndExtractContextResult>;

export async function renderAndExtractContext({
  // express objects
  // req,
  // @loadable chunk extractor
  chunkExtractor,
}: RenderAndExtractContextOptions) {
  const markup = await renderToStaticMarkup(chunkExtractor.collectChunks(<App />));

  const linkTags = chunkExtractor.getLinkTags();
  const scriptTags = chunkExtractor.getScriptTags();

  return {
    markup,
    linkTags,
    scriptTags,
  };
}
