// gray-matter (used to parse devlog/changelog frontmatter) checks
// `Buffer.isBuffer()` internally, but Vite externalizes Node's `buffer`
// module in the browser, leaving `Buffer` undefined. Polyfill it globally.
import { Buffer } from 'buffer';

declare global {
  // eslint-disable-next-line no-var
  var Buffer: typeof import('buffer').Buffer | undefined;
}

if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}
