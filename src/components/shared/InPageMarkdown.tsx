import type { AnchorHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// HashRouter owns the URL fragment for routing (#/devlog/entry/foo), so a
// plain in-page anchor href like "#some-heading" can't be left to native
// browser navigation — it would replace the whole route hash and blank the
// page. Intercept fragment-only links (from synced Obsidian [[#Heading]]
// links) and scroll to the target instead.
function MarkdownLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInPageAnchor = href?.startsWith('#') && !href.startsWith('#/');

  if (isInPageAnchor) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          // The markdown renderer URI-encodes non-ASCII link destinations
          // (e.g. "#ímpeto" becomes "#%C3%ADmpeto"), but heading ids from
          // rehype-slug are not encoded, so decode before looking one up.
          const targetId = decodeURIComponent(href!.slice(1));
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export function InPageMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={{ a: MarkdownLink }}>
      {children}
    </ReactMarkdown>
  );
}
