import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OAuthPage from './pages/OAuthPage'
import ShareKitPage from './pages/ShareKitPage'
import SDKPage from './pages/SDKPage'
import CodeBlock from './components/CodeBlock'
import EndpointTable from './components/EndpointTable'

const NAV = [
  {
    group: 'Bắt đầu',
    items: [
      { path: '/', icon: '🏠', label: 'Giới thiệu', exact: true },
    ]
  },
  {
    group: 'Developer',
    items: [
      { path: '/oauth',    icon: '🔑', label: 'OAuth 2.0' },
      { path: '/sharekit', icon: '📦', label: 'Embed & Share' },
      { path: '/webhooks', icon: '🔔', label: 'Webhooks' },
      { path: '/sdk',      icon: '⚡', label: 'SDK Examples' },
    ]
  }
]

const BREADCRUMBS = {
  '/':         ['Docs',      'Giới thiệu'],
  '/oauth':    ['Developer', 'OAuth 2.0'],
  '/sharekit': ['Developer', 'Embed & Share'],
  '/webhooks': ['Developer', 'Webhooks'],
  '/sdk':      ['Developer', 'SDK Examples'],
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const [section, title] = BREADCRUMBS[location.pathname] ?? ['Docs', '']

  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setSidebarOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const handleNav = () => setSidebarOpen(false)

  const goTo = (path) => navigate(path)

  return (
    <div className="layout">
      <div
        className={`overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <NavLink to="/" className="sidebar-logo" onClick={handleNav} style={{textDecoration:'none'}}>
          <div className="logo-icon">✦</div>
          <div className="logo-text">Thazh<span>Social</span></div>
          <span className="logo-badge">v2.1</span>
        </NavLink>

        <nav className="sidebar-nav">
          {NAV.map(group => (
            <div key={group.group} className="nav-group">
              <div className="nav-group-label">{group.group}</div>
              {group.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={handleNav}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                  style={{textDecoration:'none'}}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div style={{marginBottom:6}}>
            <a href="https://social.thazh.is-a.dev" target="_blank" rel="noreferrer">
              🌐 social.thazh.is-a.dev
            </a>
          </div>
          <div>
            <a href="https://social.thazh.is-a.dev/developers" target="_blank" rel="noreferrer">
              🛠️ Developer Center
            </a>
          </div>
          <div style={{marginTop:10,color:'var(--text3)',fontSize:11}}>
            © 2026 Thazh Social
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbar-breadcrumb">
            <span style={{color:'var(--text3)'}}>Thazh</span>
            <span className="topbar-sep">›</span>
            <span style={{color:'var(--text3)'}}>{section}</span>
            <span className="topbar-sep">›</span>
            <span>{title}</span>
          </div>
          <div className="topbar-right">
            <div className="base-url-pill">
              ldofhofhspzynhglwhii.supabase.co/functions/v1/api
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/"         element={<HomePage onNavigate={goTo} />} />
          <Route path="/oauth"    element={<OAuthPage />} />
          <Route path="/sharekit" element={<ShareKitPage />} />
          <Route path="/webhooks" element={<WebhooksPage />} />
          <Route path="/sdk"      element={<SDKPage />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <button
        className="mobile-toggle"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>
    </div>
  )
}

// ── Webhooks Page ──────────────────────────────────────────────────────────

const webhookEndpoints = [
  { method: 'GET',  path: '/developer/webhooks', auth: false, desc: 'Danh sách webhooks (cần X-Developer-Key)' },
  { method: 'POST', path: '/developer/webhooks', auth: false, desc: 'Tạo webhook mới' },
]

const WEBHOOK_EVENTS = [
  { event: 'post.created',     desc: 'Bài viết mới được tạo' },
  { event: 'post.deleted',     desc: 'Bài viết bị xóa' },
  { event: 'follow.created',   desc: 'Có người theo dõi mới' },
  { event: 'like.created',     desc: 'Bài viết được thích' },
  { event: 'comment.created',  desc: 'Comment mới' },
  { event: 'message.received', desc: 'Tin nhắn mới' },
]

const webhookBody = `POST /developer/webhooks
X-Developer-Key: your_api_key
{
  "url": "https://yourapp.com/webhook",
  "events": ["post.created", "like.created", "comment.created"]
}`

function WebhooksPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Webhooks</h1>
        <p className="page-desc">
          Nhận thông báo realtime khi có sự kiện trên nền tảng Thazh thông qua HTTP POST đến endpoint của bạn.
        </p>
        <div className="page-version">🔔 Webhooks · Realtime Events</div>
      </div>

      <div className="section">
        <h2 className="section-title">Endpoints</h2>
        <EndpointTable endpoints={webhookEndpoints} />
        <div className="note">
          <span className="note-icon">🔑</span>
          <span>Webhooks yêu cầu header <code>X-Developer-Key: your_api_key</code> thay vì JWT token thông thường.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Tạo Webhook</h2>
        <CodeBlock lang="json" title="POST /developer/webhooks" code={webhookBody} />
      </div>

      <div className="section">
        <h2 className="section-title">Sự kiện hỗ trợ</h2>
        <div className="webhook-events">
          {WEBHOOK_EVENTS.map(ev => (
            <div key={ev.event} className="webhook-event">
              <code>{ev.event}</code>
              <span className="webhook-event-desc">— {ev.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Lưu ý</h2>
        <div className="note green">
          <span className="note-icon">⚡</span>
          <span>Webhook gửi POST request đến <code>url</code> ngay khi sự kiện xảy ra. Endpoint của bạn cần trả về <code>200 OK</code> trong vòng <strong>5 giây</strong>.</span>
        </div>
        <div className="note blue">
          <span className="note-icon">🔁</span>
          <span>Nếu endpoint trả về lỗi hoặc timeout, Thazh sẽ retry tối đa <strong>3 lần</strong> với khoảng cách tăng dần.</span>
        </div>
      </div>
    </div>
  )
}
