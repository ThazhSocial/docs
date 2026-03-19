import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const userEndpoints = [
  { method: 'GET', path: '/users/{username_or_id}', auth: false, desc: 'Lấy thông tin user (hỗ trợ username và UUID)' },
  { method: 'GET', path: '/users/{id}/posts?page=1', auth: false, desc: 'Bài viết của user' },
  { method: 'GET', path: '/users/{id}/stats', auth: false, desc: 'Thống kê user' },
  { method: 'GET', path: '/users?search={query}', auth: false, desc: 'Tìm kiếm user' },
  { method: 'PATCH', path: '/users', auth: true, desc: 'Cập nhật hồ sơ của mình' },
]

const followEndpoints = [
  { method: 'POST', path: '/follows/{user_id}', auth: true, desc: 'Theo dõi user' },
  { method: 'DELETE', path: '/follows/{user_id}', auth: true, desc: 'Bỏ theo dõi' },
  { method: 'GET', path: '/follows/{user_id}?type=followers', auth: true, desc: 'Danh sách followers' },
  { method: 'GET', path: '/follows/{user_id}?type=following', auth: true, desc: 'Danh sách following' },
  { method: 'GET', path: '/follows?target_id={id}', auth: true, desc: 'Kiểm tra đã follow chưa' },
]

const blockEndpoints = [
  { method: 'GET', path: '/blocks', auth: true, desc: 'Danh sách user đã chặn' },
  { method: 'POST', path: '/blocks/{user_id}', auth: true, desc: 'Chặn user' },
  { method: 'DELETE', path: '/blocks/{user_id}', auth: true, desc: 'Bỏ chặn user' },
]

const muteEndpoints = [
  { method: 'GET', path: '/mutes', auth: true, desc: 'Danh sách user đã tắt tiếng' },
  { method: 'POST', path: '/mutes/{user_id}', auth: true, desc: 'Tắt tiếng user' },
  { method: 'DELETE', path: '/mutes/{user_id}', auth: true, desc: 'Bỏ tắt tiếng' },
]

const notifEndpoints = [
  { method: 'GET', path: '/notifications?unread=true&limit=50', auth: true, desc: 'Danh sách thông báo' },
  { method: 'PATCH', path: '/notifications/{id}', auth: true, desc: 'Đánh dấu đã đọc' },
  { method: 'PATCH', path: '/notifications', auth: true, desc: 'Đánh dấu tất cả đã đọc' },
  { method: 'DELETE', path: '/notifications/{id}', auth: true, desc: 'Xóa thông báo' },
]

const searchEndpoints = [
  { method: 'GET', path: '/search?q={query}&type=all&limit=20', auth: false, desc: 'Tìm kiếm đa loại (posts, users, hashtags)' },
]

const leaderEndpoints = [
  { method: 'GET', path: '/leaderboards?type=followers&limit=10', auth: false, desc: 'Top users theo followers' },
  { method: 'GET', path: '/leaderboards?type=interactions', auth: false, desc: 'Top posts theo engagement' },
]

const reportEndpoints = [
  { method: 'GET', path: '/reports', auth: true, desc: 'Các báo cáo đã gửi' },
  { method: 'POST', path: '/reports', auth: true, desc: 'Gửi báo cáo vi phạm' },
]

const profileResponse = `{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "full_name": "John Doe",
    "avatar_url": "https://cdn.example.com/avatar.jpg",
    "cover_url": "https://cdn.example.com/cover.jpg",
    "bio": "Hello world 👋",
    "location": "Vietnam",
    "website": "https://example.com",
    "social_links": {
      "twitter": "johndoe",
      "github": "johndoe"
    },
    "followers_count": 150,
    "following_count": 75,
    "created_at": "2026-01-01T00:00:00Z"
  }
}`

const updateProfile = `{
  "full_name": "Tên mới",
  "bio": "Bio mới của tôi",
  "location": "TP.HCM, Việt Nam",
  "website": "https://example.com",
  "avatar_url": "https://cdn.example.com/new-avatar.jpg",
  "cover_url": "https://cdn.example.com/new-cover.jpg"
}`

const statsResponse = `GET /users/{id}/stats

{
  "data": {
    "posts_count": 42,
    "followers_count": 150,
    "following_count": 75
  }
}`

const notifResponse = `{
  "data": [
    {
      "id": "uuid",
      "type": "like",
      "is_read": false,
      "actor": {
        "id": "uuid",
        "username": "user1",
        "avatar_url": "https://..."
      },
      "post": {
        "id": "uuid",
        "content": "Nội dung bài viết..."
      },
      "created_at": "2026-03-18T12:00:00Z"
    }
  ],
  "unread_count": 5
}`

const searchResponse = `{
  "data": {
    "posts": [ /* danh sách bài viết */ ],
    "users": [ /* danh sách users */ ],
    "hashtags": [ /* danh sách hashtags */ ]
  }
}`

const reportBody = `{
  "reason": "spam",
  "description": "User này liên tục gửi nội dung spam...",
  "reported_user_id": "uuid (optional)",
  "reported_post_id": "uuid (optional)"
}`

export default function UsersPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Users API</h1>
        <p className="page-desc">
          Quản lý hồ sơ người dùng, theo dõi, chặn, tắt tiếng, thông báo, tìm kiếm và bảng xếp hạng.
        </p>
        <div className="page-version">👤 Profile · Follows · Blocks · Mutes · Notifications</div>
      </div>

      <div className="section">
        <h2 className="section-title">Hồ sơ người dùng</h2>
        <EndpointTable endpoints={userEndpoints} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Phản hồi profile</h3>
        <CodeBlock lang="json" title="GET /users/{username_or_id} — Response" code={profileResponse} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Cập nhật hồ sơ</h3>
        <CodeBlock lang="json" title="PATCH /users — Request Body" code={updateProfile} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Thống kê user</h3>
        <CodeBlock lang="json" title="GET /users/{id}/stats — Response" code={statsResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Follows</h2>
        <EndpointTable endpoints={followEndpoints} />
      </div>

      <div className="section">
        <h2 className="section-title">Blocks</h2>
        <EndpointTable endpoints={blockEndpoints} />
        <div className="note">
          <span className="note-icon">🚫</span>
          <span>Khi chặn một user, họ sẽ không thể xem hồ sơ, bình luận hoặc nhắn tin cho bạn.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Mutes</h2>
        <EndpointTable endpoints={muteEndpoints} />
        <div className="note blue">
          <span className="note-icon">🔇</span>
          <span>Tắt tiếng user sẽ ẩn bài viết của họ khỏi feed của bạn, nhưng họ vẫn có thể tương tác với bạn.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Notifications</h2>
        <EndpointTable endpoints={notifEndpoints} />
        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Phản hồi</h3>
        <CodeBlock lang="json" title="GET /notifications — Response" code={notifResponse} />
        <div className="note">
          <span className="note-icon">💡</span>
          <span>Trường <code>type</code> có thể là: <code>like</code>, <code>comment</code>, <code>follow</code>, <code>repost</code>, <code>mention</code>.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Search</h2>
        <EndpointTable endpoints={searchEndpoints} />
        <CodeBlock lang="json" title="GET /search?q=thazh&type=all — Response" code={searchResponse} />
        <div className="note blue">
          <span className="note-icon">🔍</span>
          <span>Tham số <code>type</code>: <code>all</code> · <code>posts</code> · <code>users</code> · <code>hashtags</code></span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Leaderboards</h2>
        <EndpointTable endpoints={leaderEndpoints} />
      </div>

      <div className="section">
        <h2 className="section-title">Reports</h2>
        <EndpointTable endpoints={reportEndpoints} />
        <CodeBlock lang="json" title="POST /reports — Request Body" code={reportBody} />
      </div>
    </div>
  )
}
