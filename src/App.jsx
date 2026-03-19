import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostsPage from './pages/PostsPage'
import UsersPage from './pages/UsersPage'
import MessagesPage from './pages/MessagesPage'
import SocialPage from './pages/SocialPage'
import OAuthPage from './pages/OAuthPage'
import ShareKitPage from './pages/ShareKitPage'
import SDKPage from './pages/SDKPage'

const NAV = [
  {
    group: 'Bắt đầu',
    items: [
      { path: '/', icon: '🏠', label: 'Giới thiệu', exact: true },
    ]
  },
  {
    group: 'API Reference',
    items: [
      { path: '/posts',    icon: '📝', label: 'Posts & Feed' },
      { path: '/users',    icon: '👤', label: 'Users & Social' },
      { path: '/messages', icon: '💬', label: 'Messages' },
      { path: '/social',   icon: '🌐', label: 'Groups & Stories' },
    ]
  },
  {
    group: 'Developer',
    items: [
      { path: '/oauth',    icon: '🔑', label: 'OAuth 2.0' },
      { path: '/sharekit', icon: '📦', label: 'ShareKit & Embed' },
      { path: '/sdk',      icon: '⚡', label: 'SDK Examples' },
    ]
  }
]

const BREADCRUMBS = {
  '/':         ['Docs',      'Giới thiệu'],
  '/posts':    ['API',       'Posts'],
  '/users':    ['API',       'Users'],
  '/messages': ['API',       'Messages'],
  '/social':   ['API',       'Social'],
  '/oauth':    ['Developer', 'OAuth 2.0'],
  '/sharekit': ['Developer', 'ShareKit'],
  '/sdk':      ['Developer', 'SDK'],
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const [section, title] = BREADCRUMBS[location.pathname] ?? ['Docs', '']

  // Close sidebar on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setSidebarOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const handleNav = () => setSidebarOpen(false)

  // Helper passed to pages (e.g. HomePage quick links)
  const goTo = (pageId) => {
    navigate(pageId === 'home' ? '/' : `/${pageId}`)
  }

  return (
    <div className="layout">
      {/* Overlay */}
      <div
        className={`overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
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

      {/* Main */}
      <main className="main">
        {/* Top bar */}
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

        {/* Routes */}
        <Routes>
          <Route path="/"         element={<HomePage onNavigate={goTo} />} />
          <Route path="/posts"    element={<PostsPage />} />
          <Route path="/users"    element={<UsersPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/social"   element={<SocialPage />} />
          <Route path="/oauth"    element={<OAuthPage />} />
          <Route path="/sharekit" element={<ShareKitPage />} />
          <Route path="/sdk"      element={<SDKPage />} />
          {/* Fallback: redirect về home */}
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mobile toggle */}
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
