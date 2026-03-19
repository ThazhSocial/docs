import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const oauthEndpoints = [
  { method: 'GET', path: '/developer/oauth/authorize', auth: false, desc: 'Bắt đầu OAuth flow' },
  { method: 'POST', path: '/developer/oauth/token', auth: false, desc: 'Đổi code / refresh token' },
  { method: 'POST', path: '/developer/oauth/revoke', auth: false, desc: 'Thu hồi token' },
  { method: 'GET', path: '/developer/oauth/userinfo', auth: true, desc: 'Thông tin user đang đăng nhập' },
  { method: 'GET', path: '/developer/info', auth: false, desc: 'Thông tin Developer API' },
  { method: 'GET', path: '/developer/webhooks', auth: false, desc: 'Danh sách webhooks (cần X-Developer-Key)' },
  { method: 'POST', path: '/developer/webhooks', auth: false, desc: 'Tạo webhook mới' },
]

const SCOPES = ['read', 'write', 'profile', 'messages', 'posts']

const authorizeUrl = `GET /developer/oauth/authorize
  ?client_id=your_client_id
  &redirect_uri=https://yourapp.com/callback
  &scope=read write profile
  &state=random_state_string`

const exchangeBody = `POST /developer/oauth/token
{
  "grant_type": "authorization_code",
  "code": "auth_code_from_callback",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "redirect_uri": "https://yourapp.com/callback"
}`

const tokenResponse = `{
  "access_token": "thazh_abc123...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "thazh_refresh_xyz...",
  "scope": "read write profile"
}`

const refreshBody = `POST /developer/oauth/token
{
  "grant_type": "refresh_token",
  "refresh_token": "thazh_refresh_xyz..."
}`

const userinfoResponse = `{
  "sub": "user_uuid",
  "name": "John Doe",
  "preferred_username": "johndoe",
  "picture": "https://cdn.example.com/avatar.jpg",
  "email": "john@example.com",
  "profile_url": "https://social.thazh.is-a.dev/@johndoe"
}`

const revokeBody = `POST /developer/oauth/revoke
{
  "token": "thazh_abc123..."
}`

const devInfoResponse = `{
  "name": "Thazh Social API",
  "version": "2.1.0",
  "developer_portal": "https://dev.thazh.is-a.dev",
  "documentation": "https://social.thazh.is-a.dev/admin/api/docs",
  "rate_limits": {
    "requests_per_minute": 60,
    "requests_per_day": 10000
  }
}`

const FLOW_STEPS = [
  { n: 1, text: <>App redirect người dùng đến <code>/developer/oauth/authorize</code> với <code>client_id</code>, <code>scope</code> và <code>state</code></> },
  { n: 2, text: 'Người dùng đăng nhập vào Thazh và xác nhận cấp quyền cho ứng dụng của bạn' },
  { n: 3, text: <>Thazh redirect về <code>redirect_uri</code> kèm <code>authorization_code</code></> },
  { n: 4, text: <>App dùng code để gọi <code>POST /developer/oauth/token</code> đổi lấy <code>access_token</code></> },
  { n: 5, text: <>Sử dụng <code>access_token</code> trong header <code>Authorization: Bearer</code> để gọi API</> },
]

export default function OAuthPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">OAuth 2.0</h1>
        <p className="page-desc">
          Thazh Social hỗ trợ OAuth 2.0 Authorization Code Flow để ứng dụng bên thứ ba xác thực người dùng an toàn.
        </p>
        <div className="page-version">🔑 OAuth 2.0 · Authorization Code · JWT</div>
      </div>

      <div className="section">
        <h2 className="section-title">Tất cả Endpoints</h2>
        <EndpointTable endpoints={oauthEndpoints} />
      </div>

      <div className="section">
        <h2 className="section-title">Luồng OAuth</h2>
        <div className="flow-steps">
          {FLOW_STEPS.map(s => (
            <div key={s.n} className="flow-step">
              <div className="flow-num">{s.n}</div>
              <div className="flow-text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Scopes hỗ trợ</h2>
        <div className="scope-list">
          {SCOPES.map(s => <span key={s} className="scope-tag">{s}</span>)}
        </div>
        <table className="rate-table" style={{marginTop:14}}>
          <thead>
            <tr><th>Scope</th><th>Mô tả</th></tr>
          </thead>
          <tbody>
            <tr><td><code className="path-code">read</code></td><td style={{color:'var(--text2)',fontSize:13}}>Đọc bài viết, profile công khai</td></tr>
            <tr><td><code className="path-code">write</code></td><td style={{color:'var(--text2)',fontSize:13}}>Tạo / sửa / xóa bài viết</td></tr>
            <tr><td><code className="path-code">profile</code></td><td style={{color:'var(--text2)',fontSize:13}}>Đọc thông tin cá nhân</td></tr>
            <tr><td><code className="path-code">messages</code></td><td style={{color:'var(--text2)',fontSize:13}}>Truy cập tin nhắn</td></tr>
            <tr><td><code className="path-code">posts</code></td><td style={{color:'var(--text2)',fontSize:13}}>Quản lý bài viết</td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">1. Authorization</h2>
        <CodeBlock lang="http" title="GET /developer/oauth/authorize" code={authorizeUrl} />
      </div>

      <div className="section">
        <h2 className="section-title">2. Đổi lấy Token</h2>
        <CodeBlock lang="json" title="POST /developer/oauth/token — Authorization Code" code={exchangeBody} />
        <CodeBlock lang="json" title="Response" code={tokenResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">3. Refresh Token</h2>
        <CodeBlock lang="json" title="POST /developer/oauth/token — Refresh" code={refreshBody} />
        <div className="note">
          <span className="note-icon">♻️</span>
          <span><code>access_token</code> hết hạn sau <strong>3600 giây</strong> (1 giờ). Dùng <code>refresh_token</code> để lấy token mới mà không cần người dùng đăng nhập lại.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">4. User Info</h2>
        <CodeBlock lang="http" title="GET /developer/oauth/userinfo" code={`GET /developer/oauth/userinfo\nAuthorization: Bearer <access_token>`} />
        <CodeBlock lang="json" title="Response" code={userinfoResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">5. Revoke Token</h2>
        <CodeBlock lang="json" title="POST /developer/oauth/revoke" code={revokeBody} />
      </div>

      <div className="section">
        <h2 className="section-title">Developer Info</h2>
        <CodeBlock lang="json" title="GET /developer/info — Response" code={devInfoResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Tạo ứng dụng Developer</h2>
        <div className="info-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:14}}>
          <div className="info-card">
            <div className="info-card-icon">🏗️</div>
            <div className="info-card-label">Bước 1</div>
            <div className="info-card-value" style={{fontSize:13,fontWeight:500}}>Tạo app → nhận Client ID & Secret</div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🔗</div>
            <div className="info-card-label">Bước 2</div>
            <div className="info-card-value" style={{fontSize:13,fontWeight:500}}>Cấu hình Redirect URIs</div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">✅</div>
            <div className="info-card-label">Bước 3</div>
            <div className="info-card-value" style={{fontSize:13,fontWeight:500}}>Chọn Scopes cần thiết</div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">📊</div>
            <div className="info-card-label">Bước 4</div>
            <div className="info-card-value" style={{fontSize:13,fontWeight:500}}>Theo dõi thống kê API</div>
          </div>
        </div>
        <div className="note green" style={{marginTop:16}}>
          <span className="note-icon">🚀</span>
          <span>Truy cập <a href="https://social.thazh.is-a.dev/developers" target="_blank" rel="noreferrer">Developer Center</a> để tạo ứng dụng và quản lý credentials của bạn.</span>
        </div>
      </div>
    </div>
  )
}
