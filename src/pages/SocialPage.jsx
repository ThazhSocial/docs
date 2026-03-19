import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const groupEndpoints = [
  { method: 'GET', path: '/groups?search={q}', auth: false, desc: 'Danh sách nhóm' },
  { method: 'GET', path: '/groups/{id}', auth: false, desc: 'Chi tiết nhóm' },
  { method: 'GET', path: '/groups/{id}/members', auth: false, desc: 'Thành viên nhóm' },
  { method: 'POST', path: '/groups', auth: true, desc: 'Tạo nhóm mới' },
]

const storyEndpoints = [
  { method: 'GET', path: '/stories', auth: false, desc: 'Stories đang hoạt động' },
  { method: 'GET', path: '/stories/{id}', auth: false, desc: 'Chi tiết story' },
  { method: 'POST', path: '/stories', auth: true, desc: 'Tạo story (tự hết hạn sau 24h)' },
  { method: 'DELETE', path: '/stories/{id}', auth: true, desc: 'Xóa story' },
]

const pollEndpoints = [
  { method: 'GET', path: '/polls/{id}', auth: false, desc: 'Chi tiết poll kèm options' },
  { method: 'POST', path: '/polls/{id}', auth: true, desc: 'Bình chọn một option' },
]

const hashtagEndpoints = [
  { method: 'GET', path: '/hashtags', auth: false, desc: 'Hashtags thịnh hành' },
  { method: 'GET', path: '/hashtags/{tag}?page=1', auth: false, desc: 'Bài viết theo hashtag' },
]

const bookmarkEndpoints = [
  { method: 'GET', path: '/bookmarks', auth: true, desc: 'Danh sách bài viết đã đánh dấu' },
  { method: 'POST', path: '/bookmarks/{post_id}', auth: true, desc: 'Đánh dấu bài viết' },
  { method: 'DELETE', path: '/bookmarks/{post_id}', auth: true, desc: 'Bỏ đánh dấu' },
]

const translateEndpoints = [
  { method: 'POST', path: '/translate', auth: false, desc: 'Dịch văn bản sang ngôn ngữ khác' },
]

const createGroupBody = `{
  "name": "Tên nhóm",
  "description": "Mô tả về nhóm",
  "cover_url": "https://cdn.example.com/cover.jpg",
  "visibility": "public"
}`

const createStoryBody = `{
  "media_url": "https://cdn.example.com/story.jpg",
  "media_type": "image",
  "caption": "Caption text cho story"
}`

const pollVoteBody = `POST /polls/{poll_id}
{
  "option_id": "option_uuid"
}`

const hashtagResponse = `{
  "data": [
    { "id": "uuid", "name": "trending", "posts_count": 42 },
    { "id": "uuid", "name": "thazh", "posts_count": 128 }
  ]
}`

const translateBody = `{
  "text": "Hello, world!",
  "target_language": "vi"
}`

export default function SocialPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Social API</h1>
        <p className="page-desc">
          Groups, Stories, Polls, Hashtags, Bookmarks và Translation — tất cả tính năng xã hội của Thazh.
        </p>
        <div className="page-version">🌐 Groups · Stories · Polls · Hashtags · Bookmarks</div>
      </div>

      <div className="section">
        <h2 className="section-title">Groups</h2>
        <EndpointTable endpoints={groupEndpoints} />
        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo nhóm</h3>
        <CodeBlock lang="json" title="POST /groups — Request Body" code={createGroupBody} />
        <div className="note blue">
          <span className="note-icon">👥</span>
          <span>Trường <code>visibility</code> hỗ trợ: <code>public</code> (ai cũng thấy) hoặc <code>private</code> (chỉ thành viên được mời).</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Stories</h2>
        <EndpointTable endpoints={storyEndpoints} />
        <h3 style={{marginBottom:10,marginTop:20,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Tạo story</h3>
        <CodeBlock lang="json" title="POST /stories — Request Body" code={createStoryBody} />
        <div className="note">
          <span className="note-icon">⏰</span>
          <span>Story tự động hết hạn sau <strong>24 giờ</strong> kể từ khi tạo. Trường <code>media_type</code>: <code>image</code> hoặc <code>video</code>.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Polls</h2>
        <EndpointTable endpoints={pollEndpoints} />
        <CodeBlock lang="json" title="POST /polls/{poll_id} — Bình chọn" code={pollVoteBody} />
        <div className="note">
          <span className="note-icon">🗳️</span>
          <span>User có thể <strong>thay đổi phiếu bầu</strong>. Phiếu cũ sẽ bị xóa tự động khi bình chọn lại.</span>
        </div>
        <div className="note blue">
          <span className="note-icon">💡</span>
          <span>Polls được tạo kèm trong bài viết qua <code>POST /posts</code> với trường <code>poll</code>. Xem chi tiết tại trang Posts API.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Hashtags</h2>
        <EndpointTable endpoints={hashtagEndpoints} />
        <CodeBlock lang="json" title="GET /hashtags — Response (trending)" code={hashtagResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Bookmarks</h2>
        <EndpointTable endpoints={bookmarkEndpoints} />
        <div className="note blue">
          <span className="note-icon">🔖</span>
          <span>Danh sách bookmarks chỉ hiển thị cho chủ sở hữu. Người khác không thể xem bookmarks của bạn.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Translation</h2>
        <EndpointTable endpoints={translateEndpoints} />
        <CodeBlock lang="json" title="POST /translate — Request Body" code={translateBody} />
        <div className="note">
          <span className="note-icon">🌏</span>
          <span>Endpoint này không yêu cầu xác thực. Hỗ trợ mã ngôn ngữ chuẩn ISO 639-1 như: <code>vi</code>, <code>en</code>, <code>ja</code>, <code>ko</code>, <code>zh</code>...</span>
        </div>
      </div>
    </div>
  )
}
