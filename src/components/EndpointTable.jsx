export default function EndpointTable({ endpoints }) {
  function formatPath(path) {
    // Highlight path params {id} in pink
    const parts = path.split(/(\{[^}]+\})/g)
    return parts.map((part, i) =>
      part.startsWith('{')
        ? <span key={i} className="path-param">{part}</span>
        : <span key={i}>{part}</span>
    )
  }

  return (
    <table className="endpoint-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Path</th>
          <th>Auth</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        {endpoints.map((ep, i) => (
          <tr key={i}>
            <td><span className={`method method-${ep.method}`}>{ep.method}</span></td>
            <td><code className="path-code">{formatPath(ep.path)}</code></td>
            <td>
              {ep.auth
                ? <span className="auth-badge">✓ Cần token</span>
                : <span className="no-auth">—</span>
              }
            </td>
            <td style={{ color: 'var(--text2)', fontSize: 13 }}>{ep.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
