import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const embedEndpoints = [
  { method: 'GET', path: '/developer/embed/post/{post_id}?format=json', auth: false, desc: 'Embed bài viết dạng JSON' },
  { method: 'GET', path: '/developer/embed/post/{post_id}?format=html', auth: false, desc: 'Embed bài viết dạng HTML' },
  { method: 'GET', path: '/developer/embed/profile/{username}',         auth: false, desc: 'Embed hồ sơ user' },
]

const shareEndpoints = [
  { method: 'GET',  path: '/developer/share?text={text}&url={url}', auth: false, desc: 'Tạo share URL' },
  { method: 'POST', path: '/developer/share',                        auth: true,  desc: 'Tạo bài viết qua Share API' },
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

export default function ShareKitPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Embed & Share</h1>
        <p className="page-desc">
          Nhúng bài viết và hồ sơ Thazh vào website bên ngoài, hoặc tạo share URL để mở trang tạo bài viết với nội dung điền sẵn.
        </p>
        <div className="page-version">📦 Embed · Share URL · ShareKit</div>
      </div>

      <div className="section">
        <h2 className="section-title">Embed bài viết</h2>
        <EndpointTable endpoints={embedEndpoints} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>JSON format</h3>
        <CodeBlock lang="json" title="GET /developer/embed/post/{id}?format=json — Response" code={embedJsonResponse} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>HTML format</h3>
        <p>Trả về HTML có thể nhúng trực tiếp vào website:</p>
        <CodeBlock lang="js" title="GET /developer/embed/post/{id}?format=html — Response" code={embedHtml} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Embed hồ sơ</h3>
        <CodeBlock lang="json" title="GET /developer/embed/profile/{username} — Response" code={profileEmbedResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Share URL</h2>
        <EndpointTable endpoints={shareEndpoints} />
        <p>Tạo link chia sẻ để mở trang tạo bài viết trên Thazh với nội dung được điền sẵn:</p>
        <CodeBlock lang="json" title="GET /developer/share — Tạo share URL" code={shareUrlResponse} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo bài viết trực tiếp</h3>
        <CodeBlock lang="json" title="POST /developer/share — Tạo bài viết" code={sharePostBody} />
      </div>
    </div>
  )
}
