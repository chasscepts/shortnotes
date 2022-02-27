import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(code, { language: validLanguage }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

/* eslint-disable no-param-reassign */
const mark = (note, content) => {
  let index = -1;
  const markdownRegex = /```[\S]*([\s\S]*?)```/g;
  const htmlRegex = /(<pre><code .+?>)/g;
  const codes = [];
  let match = markdownRegex.exec(content);
  while (match) {
    codes.push(match[1].trim());
    match = markdownRegex.exec(content);
  }
  note.codes = codes;
  const html = marked(content);
  note.content = html.replace(htmlRegex, (march, p1) => {
    index += 1;
    return `${p1}<button class="copy-btn" type="button" data-code="${index}">Copy</button>`;
  });
};
/* eslint-enable no-param-reassign */

export default mark;
