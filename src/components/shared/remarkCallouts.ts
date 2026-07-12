import { visit } from 'unist-util-visit';

// Obsidian-style callouts (`> [!info] Title` ... ) arrive from the synced
// vault as plain blockquotes — react-markdown has no idea `[!info]` means
// anything special. This walks the first paragraph of each blockquote,
// pulls the `[!type] Title` marker off its first line (however micromark
// happened to chunk that line into text/break nodes), and retags the
// blockquote as `<div class="callout callout-{type}">` with the title
// stashed in a data attribute so CSS can render it via `::before`.
const MARKER_PATTERN = /^\[!(\w+)\]\s*(.*)$/i;

interface MdastNode {
  type: string;
  value?: string;
  children?: MdastNode[];
  data?: Record<string, unknown>;
}

function extractFirstLine(paragraph: MdastNode): { text: string; consumed: number } | null {
  const children = paragraph.children ?? [];
  let text = '';
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 'text' && typeof child.value === 'string') {
      const newlineIndex = child.value.indexOf('\n');
      if (newlineIndex !== -1) {
        text += child.value.slice(0, newlineIndex);
        child.value = child.value.slice(newlineIndex + 1);
        return { text, consumed: i };
      }
      text += child.value;
      continue;
    }
    if (child.type === 'break') {
      return { text, consumed: i + 1 };
    }
    // Anything else (a link, bold text, etc.) before we've found a line
    // break means this isn't a plain "[!type] title" line — bail out.
    return null;
  }
  // The whole paragraph was consumed with no trailing newline (the
  // callout body lives in a separate paragraph after a blank line).
  return { text, consumed: children.length };
}

export function remarkCallouts() {
  return (tree: MdastNode) => {
    visit(tree as never, 'blockquote', (node: unknown) => {
      const blockquote = node as MdastNode;
      const firstParagraph = blockquote.children?.[0];
      if (!firstParagraph || firstParagraph.type !== 'paragraph') return;

      const firstLine = extractFirstLine(firstParagraph);
      if (!firstLine) return;

      const match = MARKER_PATTERN.exec(firstLine.text);
      if (!match) return;

      const type = match[1].toLowerCase();
      const title = match[2].trim() || type;

      firstParagraph.children!.splice(0, firstLine.consumed);
      if (firstParagraph.children!.length === 0) {
        blockquote.children!.shift();
      }

      blockquote.data = {
        hName: 'div',
        hProperties: { className: ['callout', `callout-${type}`], 'data-callout-title': title },
      };
    });
  };
}
