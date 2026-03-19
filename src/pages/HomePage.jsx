import CodeBlock from '../components/CodeBlock'

const BASE_URL = 'https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api'

const QUICK_LINKS = [
  { icon: '🔑', name: 'OAuth 2.0',    desc: 'Authorization Code Flow, scopes, token management', path: '/' },
  { icon: '📦', name: 'Embed & Share', desc: 'Nhúng bài viết, profile vào website bên ngoài',     path: '/sharekit' },
  { icon: '🔔', name: 'Webhooks',      desc: 'Nhận sự kiện realtime qua HTTP POST',               path: '/webhooks' },
  { icon: '⚡', name: 'SDK Examples',  desc: 'JavaScript, Python, Swift, Kotlin',                 path: '/sdk' },
]

const STATUS_CODES = [
  { code: '200', desc: 'Thành công',               cls: 's2xx' },
  { code: '201', desc: 'Đã tạo thành công',         cls: 's2xx' },
  { code: '400', desc: 'Yêu cầu không hợp lệ',      cls: 's4xx' },
  { code: '401', desc: 'Chưa xác thực',             cls: 's4xx' },
  { code: '404', desc: 'Không tìm thấy',            cls: 's4xx' },
  { code: '429', desc: 'Quá giới hạn tốc độ',       cls: 's4xx' },
  { code: '500', desc: 'Lỗi máy chủ nội bộ',        cls: 's5xx' },
]

const authHeader = `Authorization: Bearer <your_jwt_token>`

const responseFormat = `{
  "data": {},
  "pagination": { "page": 1, "limit": 20, "total": 100 },
  "error": "Error message (chỉ khi thất bại)"
}`

export default function HomePage({ onNavigate }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Thazh Developer API</h1>
        <p className="page-desc">
          Tài liệu dành cho nhà phát triển tích hợp Thazh Social vào ứng dụng của mình.
          Hỗ trợ OAuth 2.0, nhúng nội dung, webhooks và SDK đa nền tảng.
        </p>
        <div className="page-version">✦ v2.1.0 · REST API · JSON</div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">4</div>
          <div className="hero-stat-label">Modules</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">4</div>
          <div className="hero-stat-label">SDK Languages</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">6</div>
          <div className="hero-stat-label">Webhook Events</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">OAuth</div>
          <div className="hero-stat-label">2.0</div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Khám phá nhanh</h2>
        <div className="quick-links">
          {QUICK_LINKS.map(l => (
            <div key={l.path} className="quick-link" onClick={() => onNavigate(l.path)}>
              <span className="quick-link-icon">{l.icon}</span>
              <span className="quick-link-name">{l.name}</span>
              <span className="quick-link-desc">{l.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Base URL</h2>
        <CodeBlock lang="bash" title="Base URL" code={BASE_URL} />
      </div>

      <div className="section">
        <h2 className="section-title">Xác thực</h2>
        <p>Include JWT token trong header <code>Authorization</code> với mọi request cần xác thực:</p>
        <CodeBlock lang="http" title="HTTP Header" code={authHeader} />
        <p>Lấy token qua <strong>Supabase Auth</strong> hoặc <strong>OAuth 2.0</strong> Authorization Code Flow.</p>
      </div>

      <div className="section">
        <h2 className="section-title">Định dạng phản hồi</h2>
        <CodeBlock lang="json" code={responseFormat} />
      </div>

      <div className="section">
        <h2 className="section-title">Mã trạng thái HTTP</h2>
        <div className="status-grid">
          {STATUS_CODES.map(s => (
            <div key={s.code} className="status-item">
              <span className={`status-code ${s.cls}`}>{s.code}</span>
              <span className="status-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Giới hạn tốc độ</h2>
        <table className="rate-table">
          <thead>
            <tr><th>Loại</th><th>Giới hạn</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Public API</td>
              <td style={{fontFamily:'var(--font-mono)',color:'var(--yellow)',fontSize:13}}>100 req/phút/IP</td>
            </tr>
            <tr>
              <td>Authenticated</td>
              <td style={{fontFamily:'var(--font-mono)',color:'var(--yellow)',fontSize:13}}>1.000 req/giờ/user</td>
            </tr>
            <tr>
              <td>Developer API</td>
              <td style={{fontFamily:'var(--font-mono)',color:'var(--yellow)',fontSize:13}}>60 req/phút · 10.000/ngày</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Hỗ trợ</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon">🛠️</div>
            <div className="info-card-label">Developer Portal</div>
            <div className="info-card-value">
              <a href="https://social.thazh.is-a.dev/developers" target="_blank" rel="noreferrer">Developer Center</a>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📧</div>
            <div className="info-card-label">Email</div>
            <div className="info-card-value">
              <a href="mailto:api@thazh.social">api@thazh.social</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
