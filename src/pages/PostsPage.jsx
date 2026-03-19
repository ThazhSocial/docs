import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const postEndpoints = [
  { method: 'GET', path: '/posts', auth: false, desc: 'Danh sách bài viết (phân trang)' },
  { method: 'GET', path: '/posts?user_id={id}&search={q}&page=1&limit=20', auth: false, desc: 'Lọc bài viết theo user hoặc từ khóa' },
  { method: 'GET', path: '/posts/{id}', auth: false, desc: 'Chi tiết bài viết (kèm collaborators, polls)' },
  { method: 'POST', path: '/posts', auth: true, desc: 'Tạo bài viết mới' },
  { method: 'PATCH', path: '/posts/{id}', auth: true, desc: 'Chỉnh sửa bài viết' },
  { method: 'DELETE', path: '/posts/{id}', auth: true, desc: 'Xóa bài viết' },
]

const feedEndpoints = [
  { method: 'GET', path: '/feed?type=following&page=1&limit=20', auth: true, desc: 'Feed từ người theo dõi' },
  { method: 'GET', path: '/feed?type=trending', auth: true, desc: 'Bài viết thịnh hành' },
]

const commentEndpoints = [
  { method: 'GET', path: '/comments?post_id={id}', auth: false, desc: 'Comments dạng threaded' },
  { method: 'POST', path: '/comments', auth: true, desc: 'Tạo comment hoặc reply' },
  { method: 'PATCH', path: '/comments/{id}', auth: true, desc: 'Sửa comment' },
  { method: 'DELETE', path: '/comments/{id}', auth: true, desc: 'Xóa comment' },
]

const likeEndpoints = [
  { method: 'GET', path: '/likes/{post_id}', auth: true, desc: 'Kiểm tra đã thích bài viết chưa' },
  { method: 'POST', path: '/likes/{post_id}', auth: true, desc: 'Thích bài viết' },
  { method: 'DELETE', path: '/likes/{post_id}', auth: true, desc: 'Bỏ thích bài viết' },
]

const repostEndpoints = [
  { method: 'GET', path: '/reposts/{post_id}', auth: true, desc: 'Danh sách người đã repost' },
  { method: 'POST', path: '/reposts/{post_id}', auth: true, desc: 'Repost (có thể kèm quote)' },
  { method: 'DELETE', path: '/reposts/{post_id}', auth: true, desc: 'Xóa repost' },
]

const createPostBody = `{
  "content": "Hello @username! #hashtag",
  "media_urls": ["https://cdn.example.com/image.jpg"],
  "media_type": "image",
  "visibility": "public",
  "is_thought": false,
  "collaborators": ["user_uuid_1", "user_uuid_2"],
  "poll": {
    "question": "Bạn thích gì hơn?",
    "options": ["Lựa chọn 1", "Lựa chọn 2"],
    "ends_at": "2026-12-31T23:59:59Z"
  }
}`

const postResponse = `{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "content": "Hello @user! #test",
    "media_urls": [],
    "visibility": "public",
    "likes_count": 5,
    "comments_count": 2,
    "shares_count": 1,
    "created_at": "2026-03-18T12:00:00Z",
    "profiles": {
      "id": "uuid",
      "username": "user",
      "full_name": "User Name",
      "avatar_url": "https://cdn.example.com/avatar.jpg"
    },
    "polls": null,
    "post_collaborators": [
      {
        "user_id": "uuid",
        "profiles": { "id": "uuid", "username": "collab" }
      }
    ]
  }
}`

const createCommentBody = `{
  "post_id": "550e8400-e29b-41d4-a716-446655440000",
  "content": "Great post!",
  "parent_id": "uuid (optional, dùng khi reply)"
}`

const threadedResponse = `{
  "data": [
    {
      "id": "uuid",
      "content": "Top-level comment",
      "profiles": { "username": "user1" },
      "replies": [
        {
          "id": "uuid",
          "content": "Reply to comment",
          "profiles": { "username": "user2" },
          "replies": []
        }
      ]
    }
  ]
}`

const repostBody = `POST /reposts/{post_id}
{
  "quote": "Bài viết hay quá!"
}`

export default function PostsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Posts API</h1>
        <p className="page-desc">
          Quản lý bài viết, feed, bình luận, likes và reposts. Hỗ trợ tạo bài viết với media, polls, collaborators và nhiều tính năng khác.
        </p>
        <div className="page-version">📝 Posts · Feed · Comments · Likes · Reposts</div>
      </div>

      <div className="section">
        <h2 className="section-title">Bài viết</h2>
        <EndpointTable endpoints={postEndpoints} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo bài viết</h3>
        <CodeBlock lang="json" title="POST /posts — Request Body" code={createPostBody} />

        <div className="note">
          <span className="note-icon">💡</span>
          <span>Trường <code>visibility</code> hỗ trợ: <code>public</code>, <code>followers</code>, <code>private</code>. Đặt <code>is_thought: true</code> để tạo "thought" (bài viết ngắn không có media).</span>
        </div>

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Phản hồi chi tiết bài viết</h3>
        <CodeBlock lang="json" title="GET /posts/{id} — Response" code={postResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Feed</h2>
        <EndpointTable endpoints={feedEndpoints} />
        <div className="note blue">
          <span className="note-icon">📡</span>
          <span>Tham số <code>type</code>: <code>following</code> — feed từ người bạn theo dõi, <code>trending</code> — bài viết thịnh hành toàn nền tảng.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Bình luận</h2>
        <EndpointTable endpoints={commentEndpoints} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo comment / Reply</h3>
        <CodeBlock lang="json" title="POST /comments — Request Body" code={createCommentBody} />

        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Cấu trúc threaded</h3>
        <CodeBlock lang="json" title="GET /comments?post_id={id} — Response" code={threadedResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Likes</h2>
        <EndpointTable endpoints={likeEndpoints} />
      </div>

      <div className="section">
        <h2 className="section-title">Reposts</h2>
        <EndpointTable endpoints={repostEndpoints} />
        <h3 style={{marginBottom:10,marginTop:16,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Repost với quote</h3>
        <CodeBlock lang="json" title="POST /reposts/{post_id} — Request Body" code={repostBody} />
      </div>
    </div>
  )
}
