import CodeBlock from '../components/CodeBlock'

const BASE_URL = 'https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api'

const STATUS_CODES = [
  { code: '200', desc: 'Thành công', cls: 's2xx' },
  { code: '201', desc: 'Đã tạo thành công', cls: 's2xx' },
  { code: '400', desc: 'Yêu cầu không hợp lệ', cls: 's4xx' },
  { code: '401', desc: 'Chưa xác thực', cls: 's4xx' },
  { code: '404', desc: 'Không tìm thấy', cls: 's4xx' },
  { code: '405', desc: 'Phương thức không được phép', cls: 's4xx' },
  { code: '429', desc: 'Quá giới hạn tốc độ', cls: 's4xx' },
  { code: '500', desc: 'Lỗi máy chủ nội bộ', cls: 's5xx' },
]

const QUICK_LINKS = [
  { icon: '📝', name: 'Posts', desc: 'Bài viết & Feed', page: 'posts' },
  { icon: '👤', name: 'Users', desc: 'Hồ sơ & Follows', page: 'users' },
  { icon: '💬', name: 'Messages', desc: 'Tin nhắn & E2EE', page: 'messages' },
  { icon: '🌐', name: 'Social', desc: 'Groups & Stories', page: 'social' },
  { icon: '🔑', name: 'OAuth 2.0', desc: 'Xác thực bên thứ 3', page: 'oauth' },
  { icon: '📦', name: 'ShareKit', desc: 'Embed & Webhooks', page: 'sharekit' },
  { icon: '⚡', name: 'SDK', desc: 'JS · Python · Swift', page: 'sdk' },
]

const responseJSON = `{
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  },
  "error": "Error message (chỉ khi thất bại)"
}`

const healthJSON = `{
  "status": "ok",
  "timestamp": "2026-03-18T00:00:00.000Z",
  "version": "2.1.0"
}`

export default function HomePage({ onNavigate }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Thazh Social API</h1>
        <p className="page-desc">
          REST API toàn diện cho phép nhà phát triển tích hợp mạng xã hội Thazh vào ứng dụng.
          Hỗ trợ hơn <strong>70 endpoint</strong> bao gồm bài viết, tin nhắn, nhóm, stories và nhiều tính năng khác.
        </p>
        <div className="page-version">✦ v2.1.0 · REST API · JSON</div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">70+</div>
          <div className="hero-stat-label">Endpoints</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">7</div>
          <div className="hero-stat-label">Modules</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">4</div>
          <div className="hero-stat-label">SDK Languages</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">E2EE</div>
          <div className="hero-stat-label">Mã hoá đầu cuối</div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Khám phá nhanh</h2>
        <div className="quick-links">
          {QUICK_LINKS.map(l => (
            <div key={l.page} className="quick-link" onClick={() => onNavigate(l.page)}>
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
        <div className="note blue">
          <span className="note-icon">ℹ️</span>
          <span>Tất cả endpoint đều tương đối với Base URL trên. Ví dụ: <code>/posts</code> → <code>{BASE_URL}/posts</code></span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Xác thực</h2>
        <p>Include JWT token trong header <code>Authorization</code> với mọi request cần xác thực:</p>
        <CodeBlock lang="http" title="HTTP Header" code={`Authorization: Bearer <your_jwt_token>`} />
        <p>Lấy token qua <strong>Supabase Auth</strong> (Email/Password, OAuth với Google/GitHub/Discord) hoặc qua <strong>OAuth 2.0</strong>.</p>
      </div>

      <div className="section">
        <h2 className="section-title">Định dạng phản hồi</h2>
        <p>Tất cả phản hồi đều là JSON với cấu trúc nhất quán:</p>
        <CodeBlock lang="json" code={responseJSON} />
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
            <tr>
              <th>Loại</th>
              <th>Giới hạn</th>
            </tr>
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
        <h2 className="section-title">Health Check</h2>
        <CodeBlock lang="http" title="Request" code={`GET ${BASE_URL}/health`} />
        <CodeBlock lang="json" title="Response" code={healthJSON} />
      </div>

      <div className="section">
        <h2 className="section-title">Hỗ trợ</h2>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-icon">📘</div>
            <div className="info-card-label">Documentation</div>
            <div className="info-card-value"><a href="https://docs.thazh.is-a.dev/api/home" target="_blank" rel="noreferrer">docs.thazh.is-a.dev</a></div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🛠️</div>
            <div className="info-card-label">Developer Portal</div>
            <div className="info-card-value"><a href="https://social.thazh.is-a.dev/developers" target="_blank" rel="noreferrer">Developer Center</a></div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📧</div>
            <div className="info-card-label">Email</div>
            <div className="info-card-value"><a href="mailto:api@thazh.social">api@thazh.social</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
