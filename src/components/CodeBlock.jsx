import { useState } from 'react'

function highlightJSON(code) {
  return code
    .replace(/("[\w@$-]+")\s*:/g, '<span class="json-key">$1</span>:')
    .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="json-str">$1</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-num">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-bool">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
}

function highlightJS(code) {
  return code
    .replace(/\b(const|let|var|class|return|new|import|from|export|default|async|await|function|if|else|for|of|in|typeof|this|private)\b/g, '<span class="kw">$1</span>')
    .replace(/\b([A-Z][a-zA-Z]+)\b/g, '<span class="type-val">$1</span>')
    .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="fn-name">$1</span>(')
    .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, (m) => `<span class="str-val">${m}</span>`)
    .replace(/\/\/.*/g, (m) => `<span class="comment">${m}</span>`)
}

function highlightPython(code) {
  return code
    .replace(/\b(def|class|import|from|return|self|if|else|elif|for|in|None|True|False|and|or|not)\b/g, '<span class="kw">$1</span>')
    .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="fn-name">$1</span>(')
    .replace(/("""[\s\S]*?"""|'[^']*'|"[^"]*")/g, (m) => `<span class="str-val">${m}</span>`)
    .replace(/#.*/g, (m) => `<span class="comment">${m}</span>`)
}

function highlightSwift(code) {
  return code
    .replace(/\b(func|var|let|struct|class|import|return|async|throws|try|await|if|else|for|in|nil|true|false)\b/g, '<span class="kw">$1</span>')
    .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="fn-name">$1</span>(')
    .replace(/(\"[^\"]*\")/g, (m) => `<span class="str-val">${m}</span>`)
    .replace(/\/\/.*/g, (m) => `<span class="comment">${m}</span>`)
}

function highlightKotlin(code) {
  return code
    .replace(/\b(fun|val|var|class|interface|import|return|suspend|data|override|null|true|false|object|companion)\b/g, '<span class="kw">$1</span>')
    .replace(/@[A-Z][a-zA-Z]+/g, (m) => `<span class="type-val">${m}</span>`)
    .replace(/(\"[^\"]*\")/g, (m) => `<span class="str-val">${m}</span>`)
    .replace(/\/\/.*/g, (m) => `<span class="comment">${m}</span>`)
}

function highlight(code, lang) {
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  if (lang === 'json') return highlightJSON(escaped)
  if (lang === 'js' || lang === 'typescript') return highlightJS(escaped)
  if (lang === 'python') return highlightPython(escaped)
  if (lang === 'swift') return highlightSwift(escaped)
  if (lang === 'kotlin') return highlightKotlin(escaped)
  return escaped
}

const LANG_LABELS = {
  json: 'JSON',
  js: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  swift: 'Swift',
  kotlin: 'Kotlin',
  bash: 'Shell',
  http: 'HTTP',
}

export default function CodeBlock({ code, lang = 'json', title }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{title || LANG_LABELS[lang] || lang}</span>
        <button className={`code-copy${copied ? ' copied' : ''}`} onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div
        className="code-body"
        dangerouslySetInnerHTML={{ __html: highlight(code, lang) }}
      />
    </div>
  )
}
