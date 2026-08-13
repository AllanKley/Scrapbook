/* =========================================================================
   Scrapbook — todo o JavaScript do site.
   Cada página chama uma dessas funções no final do <body>. Nada de framework.
   ========================================================================= */

/* ---------- utilidades ---------- */

/** Pega ?slug=... da URL. */
function getSlug() {
  return new URLSearchParams(location.search).get('slug') || '';
}

/** Escapa texto que veio de JSON antes de jogar no HTML. */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/**
 * Id de heading, pros links de âncora (`](#ímpeto)`).
 * Acento é PRESERVADO de propósito: os links dentro dos textos foram escritos
 * assim, então "Ímpeto" precisa virar "ímpeto" e não "impeto".
 * (Nome de arquivo é outra história — lá o acento sai. Ver scripts/sync-devlog.mjs.)
 */
function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Separa o frontmatter do corpo. O formato é sempre `chave: valor`,
 * às vezes com aspas simples — não precisa de biblioteca de YAML.
 */
function parseFrontmatter(raw) {
  var m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };

  var data = {};
  m[1].split(/\r?\n/).forEach(function (line) {
    var i = line.indexOf(':');
    if (i === -1) return;
    var key = line.slice(0, i).trim();
    var value = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
    data[key] = value;
  });

  return { data: data, body: m[2] };
}

/** Mostra um erro legível em vez de uma página em branco. */
function showError(el, message) {
  el.innerHTML = '<div class="callout callout-tip" data-callout-title="erro">' + esc(message) + '</div>';
}

/* ---------- markdown ---------- */

/** Dá aos headings um id slugificado, pra que os links de âncora funcionem. */
function configureMarked() {
  var renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    var plain = String(text).replace(/<[^>]*>/g, '');
    return '<h' + level + ' id="' + slugifyHeading(plain) + '">' + text + '</h' + level + '>';
  };
  marked.setOptions({ renderer: renderer, gfm: true, breaks: false });
}

/**
 * O Obsidian escreve callouts como `> [!info] Título`, que o markdown
 * entrega só como <blockquote>. Aqui viram a caixinha estilizada.
 */
function upgradeCallouts(root) {
  root.querySelectorAll('blockquote').forEach(function (quote) {
    var first = quote.querySelector('p');
    if (!first) return;

    var match = first.innerHTML.match(/^\s*\[!(\w+)\]\s*([^<\n]*)/);
    if (!match) return;

    var type = match[1].toLowerCase();
    var title = (match[2] || type).trim();

    // tira o marcador da primeira linha, preservando o resto do parágrafo
    first.innerHTML = first.innerHTML.replace(/^\s*\[!\w+\]\s*[^<\n]*\r?\n?/, '');
    if (!first.innerHTML.trim()) first.remove();

    var box = document.createElement('div');
    box.className = 'callout callout-' + type;
    box.setAttribute('data-callout-title', title);
    while (quote.firstChild) box.appendChild(quote.firstChild);
    quote.replaceWith(box);
  });
}

/** Deixa tabelas largas rolarem em vez de estourar a largura da página. */
function wrapTables(root) {
  root.querySelectorAll('table').forEach(function (table) {
    var wrap = document.createElement('div');
    wrap.className = 'table-scroll';
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });
}

/* ---------- páginas ---------- */

/** entry.html e changelog.html — mostra um markdown só. */
function renderDoc(options) {
  var slug = getSlug();
  var target = document.getElementById('doc');
  var titleEl = document.getElementById('doc-title');
  var metaEl = document.getElementById('doc-meta');

  if (!slug) return showError(target, 'Nenhum documento pedido na URL.');

  configureMarked();

  fetch(options.dir + slug + '.md')
    .then(function (res) {
      if (!res.ok) throw new Error('não encontrei "' + slug + '".');
      return res.text();
    })
    .then(function (raw) {
      var parsed = parseFrontmatter(raw);
      var data = parsed.data;
      var heading = options.titleOf ? options.titleOf(data) : data.title || slug;

      document.title = heading + ' | scrapbook';
      titleEl.textContent = heading;
      if (metaEl) {
        metaEl.textContent = [data.date, options.metaOf ? options.metaOf(data) : '']
          .filter(Boolean)
          .join(' · ');
      }

      target.innerHTML = marked.parse(parsed.body);
      upgradeCallouts(target);
      wrapTables(target);
    })
    .catch(function (err) { showError(target, err.message); });
}

/** dungeon-rift.html — índice das entradas, agrupado por seção. */
function renderDevlogIndex() {
  var target = document.getElementById('sections');

  fetch('content/devlog/index.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      renderChangelog(data.changelog || []);

      var groups = {};
      (data.entries || []).forEach(function (entry) {
        var key = entry.section || '';
        (groups[key] = groups[key] || []).push(entry);
      });

      // sem seção primeiro (raiz do vault), o resto em ordem alfabética
      var keys = Object.keys(groups).sort(function (a, b) {
        if (a === '') return -1;
        if (b === '') return 1;
        return a.localeCompare(b);
      });

      target.innerHTML = keys.map(function (key) {
        var items = groups[key].slice().sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        return (
          '<button class="section-toggle" aria-expanded="true">' +
            '<span class="arrow">▾</span> ' + esc(key || 'Geral') +
            ' <span class="count">' + items.length + '</span>' +
          '</button>' +
          '<div class="card-grid">' +
            items.map(function (e) {
              return '<a class="card" href="entry.html?slug=' + encodeURIComponent(e.slug) + '">' +
                '<h3>' + esc(e.title) + '</h3>' +
                '<p>' + esc(e.date || '') + '</p>' +
              '</a>';
            }).join('') +
          '</div>'
        );
      }).join('');

      wireSectionToggles(target);
    })
    .catch(function () { showError(target, 'Não consegui carregar content/devlog/index.json.'); });
}

function renderChangelog(versions) {
  var el = document.getElementById('changelog');
  if (!el) return;
  if (!versions.length) { el.innerHTML = '<p>nenhuma versão publicada ainda.</p>'; return; }

  el.innerHTML = '<div class="card-grid">' + versions.map(function (v) {
    return '<a class="card" href="changelog.html?slug=' + encodeURIComponent(v.slug) + '">' +
      '<h3>v' + esc(v.version) + '</h3><p>' + esc(v.date || '') + '</p></a>';
  }).join('') + '</div>';
}

/** Recolhe/expande cada seção do índice. */
function wireSectionToggles(root) {
  root.querySelectorAll('.section-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var grid = button.nextElementSibling;
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.querySelector('.arrow').textContent = open ? '▸' : '▾';
      grid.style.display = open ? 'none' : '';
    });
  });
}

/** top10.html — índice das listas. */
function renderTop10Index() {
  var target = document.getElementById('lists');

  fetch('content/top10/index.json')
    .then(function (res) { return res.json(); })
    .then(function (lists) {
      target.innerHTML = lists.map(function (l) {
        return '<a class="card" href="lista.html?slug=' + encodeURIComponent(l.slug) + '">' +
          '<h3>' + esc(l.title) + '</h3>' +
          '<p>' + esc(l.description || '') + '</p></a>';
      }).join('');
    })
    .catch(function () { showError(target, 'Não consegui carregar content/top10/index.json.'); });
}

/** lista.html — uma lista com seus itens. */
function renderTop10List() {
  var slug = getSlug();
  var target = document.getElementById('items');
  var titleEl = document.getElementById('list-title');

  if (!slug) return showError(target, 'Nenhuma lista pedida na URL.');

  fetch('content/top10/' + slug + '.json')
    .then(function (res) {
      if (!res.ok) throw new Error('não encontrei a lista "' + slug + '".');
      return res.json();
    })
    .then(function (list) {
      document.title = list.title + ' | scrapbook';
      titleEl.textContent = list.title;

      var items = (list.items || []).slice().sort(function (a, b) { return a.rank - b.rank; });

      target.innerHTML = items.map(function (item) {
        var tags = (item.tags || []).map(function (t) {
          return '<li class="tag-chip">' + esc(t) + '</li>';
        }).join('');

        return '<li class="ranked-item">' +
          '<span class="rank">' + esc(item.rank) + '</span>' +
          '<div class="ranked-item-body">' +
            '<p class="title">' + esc(item.title) + '</p>' +
            (item.note ? '<p class="note">' + esc(item.note) + '</p>' : '') +
            (tags ? '<ul class="tag-list">' + tags + '</ul>' : '') +
          '</div>' +
          (item.image ? '<img src="' + esc(item.image) + '" alt="">' : '') +
        '</li>';
      }).join('');
    })
    .catch(function (err) { showError(target, err.message); });
}

/* ---------- animação de entrada ---------- */

/**
 * threshold 0 de propósito: um threshold por área nunca dispara em página
 * mais alta que a tela, que é o caso das entradas longas do devlog.
 */
function initReveal() {
  var items = document.querySelectorAll('[data-reveal]');
  if (!items.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

  items.forEach(function (item) { observer.observe(item); });
}

/**
 * Links antigos do site em React eram #/devlog/entry/x. Se alguém abrir um
 * desses, manda pro lugar certo em vez de mostrar a home.
 */
function redirectLegacyHash() {
  var hash = location.hash || '';
  var entry = hash.match(/^#\/devlog\/entry\/(.+)$/);
  if (entry) { location.replace('entry.html?slug=' + entry[1]); return true; }
  var change = hash.match(/^#\/devlog\/changelog\/(.+)$/);
  if (change) { location.replace('changelog.html?slug=' + change[1]); return true; }
  var list = hash.match(/^#\/top10\/(.+)$/);
  if (list) { location.replace('lista.html?slug=' + list[1]); return true; }
  if (hash === '#/devlog') { location.replace('dungeon-rift.html'); return true; }
  if (hash === '#/top10') { location.replace('top10.html'); return true; }
  return false;
}

document.addEventListener('DOMContentLoaded', initReveal);
