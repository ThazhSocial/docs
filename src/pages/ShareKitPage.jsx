import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const embedEndpoints = [
  { method: 'GET', path: '/developer/embed/post/{post_id}?format=json', auth: false, desc: 'Embed bài viết dạng JSON' },
  { method: 'GET', path: '/developer/embed/post/{post_id}?format=html', auth: false, desc: 'Embed bài viết dạng HTML' },
  { method: 'GET', path: '/developer/embed/profile/{username}', auth: false, desc: 'Embed hồ sơ user' },
]

const shareEndpoints = [
  { method: 'GET', path: '/developer/share?text={text}&url={url}', auth: false, desc: 'Tạo share URL' },
  { method: 'POST', path: '/developer/share', auth: true, desc: 'Tạo bài viết qua Share API' },
]

const webhookEndpoints = [
  { method: 'GET', path: '/developer/webhooks', auth: false, desc: 'Danh sách webhooks (cần X-Developer-Key)' },
  { method: 'POST', path: '/developer/webhooks', auth: false, desc: 'Tạo webhook mới' },
]

const WEBHOOK_EVENTS = [
  { event: 'post.created', desc: 'Bài viết mới được tạo' },
  { event: 'post.deleted', desc: 'Bài viết bị xóa' },
  { event: 'follow.created', desc: 'Có người theo dõi mới' },
  { event: 'like.created', desc: 'Bài viết được thích' },
  { event: 'comment.created', desc: 'Comment mới' },
  { event: 'message.received', desc: 'Tin nhắn mới' },
]

const embedJsonResponse = `{
  "html": "<blockquote class=\\"thazh-embed\\">...</blockquote>",
  "post_id": "uuid",
  "author": {
    "username": "johndoe",
    "full_name": "John Doe",
    "avatar_url": "https://cdn.example.com/avatar.jpg"
  },
  "content": "Nội dung bài viết",
  "url": "https://social.thazh.is-a.dev/post/uuid"
}`

const embedHtml = `<blockquote class="thazh-embed" data-post-id="uuid">
  <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;max-width:550px">
    <div style="display:flex;align-items:center;gap:12px">
      <img src="avatar_url" style="width:48px;height:48px;border-radius:50%">
      <div>
        <b>User Name</b>
        <div style="color:#6b7280">@username</div>
      </div>
    </div>
    <p>Nội dung bài viết</p>
    <a href="https://social.thazh.is-a.dev/post/uuid">View on Thazh →</a>
  </div>
</blockquote>`

const profileEmbedResponse = `{
  "username": "johndoe",
  "full_name": "John Doe",
  "avatar_url": "https://cdn.example.com/avatar.jpg",
  "bio": "Hello world 👋",
  "url": "https://social.thazh.is-a.dev/@johndoe"
}`

const shareUrlResponse = `GET /developer/share?text=Check%20this%20out&url=https://example.com

{
  "share_url": "https://social.thazh.is-a.dev/create-post?text=Check%20this%20out&url=https%3A%2F%2Fexample.com"
}`

const sharePostBody = `POST /developer/share
Authorization: Bearer <token>
{
  "text": "Check out this link!",
  "visibility": "public"
}

// Response:
{
  "post_id": "uuid",
  "url": "https://social.thazh.is-a.dev/post/uuid"
}`

const webhookBody = `POST /developer/webhooks
X-Developer-Key: your_api_key
{
  "url": "https://yourapp.com/webhook",
  "events": ["post.created", "like.created", "comment.created"]
}`

export default function ShareKitPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">ShareKit & Embed</h1>
        <p className="page-desc">
          Nhúng nội dung Thazh vào website bên ngoài, tạo share URL và nhận thông báo realtime qua webhooks.
        </p>
        <div className="page-version">📦 Embed · Share · Webhooks</div>
      </div>

      <div className="section">
        <h2 className="section-title">Embed bài viết</h2>
        <EndpointTable endpoints={embedEndpoints} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>JSON format</h3>
        <CodeBlock lang="json" title="GET /developer/embed/post/{id}?format=json — Response" code={embedJsonResponse} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>HTML format</h3>
        <p>Trả về HTML có thể nhúng trực tiếp vào website:</p>
        <CodeBlock lang="js" title="GET /developer/embed/post/{id}?format=html — Response HTML" code={embedHtml} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Embed hồ sơ</h3>
        <CodeBlock lang="json" title="GET /developer/embed/profile/{username} — Response" code={profileEmbedResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Share URL</h2>
        <EndpointTable endpoints={shareEndpoints} />
        <p>Tạo link chia sẻ để mở trang tạo bài viết trên Thazh với nội dung được điền sẵn:</p>
        <CodeBlock lang="json" title="GET /developer/share — Tạo share URL" code={shareUrlResponse} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo bài viết trực tiếp qua Share API</h3>
        <CodeBlock lang="json" title="POST /developer/share — Tạo bài viết" code={sharePostBody} />
      </div>

      <div className="section">
        <h2 className="section-title">Webhooks</h2>
        <EndpointTable endpoints={webhookEndpoints} />
        <div className="note">
          <span className="note-icon">🔑</span>
          <span>Webhooks yêu cầu header <code>X-Developer-Key: your_api_key</code> thay vì JWT token thông thường.</span>
        </div>

        <h3 style={{marginBottom:12,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo webhook</h3>
        <CodeBlock lang="json" title="POST /developer/webhooks" code={webhookBody} />

        <h3 style={{marginBottom:12,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Sự kiện hỗ trợ</h3>
        <div className="webhook-events">
          {WEBHOOK_EVENTS.map(ev => (
            <div key={ev.event} className="webhook-event">
              <code>{ev.event}</code>
              <span className="webhook-event-desc">— {ev.desc}</span>
            </div>
          ))}
        </div>
        <div className="note green" style={{marginTop:16}}>
          <span className="note-icon">⚡</span>
          <span>Webhooks gửi POST request đến <code>url</code> của bạn ngay khi sự kiện xảy ra. Đảm bảo endpoint của bạn trả về <code>200 OK</code> trong vòng 5 giây.</span>
        </div>
      </div>
    </div>
  )
}
