import CodeBlock from '../components/CodeBlock'
import EndpointTable from '../components/EndpointTable'

const msgEndpoints = [
  { method: 'GET', path: '/conversations', auth: true, desc: 'Danh sách hội thoại' },
  { method: 'GET', path: '/v2/messages', auth: true, desc: 'Alias → danh sách hội thoại' },
  { method: 'GET', path: '/v2/messages/{partner_id}', auth: true, desc: 'Tin nhắn với partner (phân trang)' },
  { method: 'POST', path: '/messages', auth: true, desc: 'Gửi tin nhắn' },
  { method: 'DELETE', path: '/messages/{message_id}', auth: true, desc: 'Xóa tin nhắn (soft delete)' },
  { method: 'GET', path: '/v2/messages/{partner_id}/nicknames', auth: true, desc: 'Lấy biệt danh' },
  { method: 'POST', path: '/v2/messages/{partner_id}/nicknames', auth: true, desc: 'Đặt / cập nhật biệt danh' },
  { method: 'GET', path: '/v2/messages/{partner_id}/encryption', auth: true, desc: 'Trạng thái mã hóa E2EE' },
  { method: 'POST', path: '/v2/messages/{partner_id}/encryption', auth: true, desc: 'Bật / tắt E2EE' },
]

const convResponse = `{
  "data": [
    {
      "partner": {
        "id": "uuid",
        "username": "johndoe",
        "full_name": "John Doe",
        "avatar_url": "https://cdn.example.com/avatar.jpg"
      },
      "partner_nickname": "Johnny",
      "last_message": {
        "id": "uuid",
        "content": "Xin chào!",
        "sender_id": "uuid",
        "receiver_id": "uuid",
        "is_read": true,
        "is_encrypted": false,
        "media_url": null,
        "created_at": "2026-03-18T10:30:00Z"
      },
      "unread_count": 0
    }
  ]
}`

const msgListResponse = `{
  "data": [
    {
      "id": "uuid",
      "content": "Xin chào!",
      "sender_id": "uuid",
      "receiver_id": "uuid",
      "is_read": true,
      "is_encrypted": false,
      "encrypted_content": null,
      "encryption_key_id": null,
      "media_url": null,
      "file_name": null,
      "created_at": "2026-03-18T10:30:00Z",
      "deleted_at": null,
      "sender": { "id": "uuid", "username": "me", "avatar_url": "..." },
      "receiver": { "id": "uuid", "username": "partner", "avatar_url": "..." }
    }
  ],
  "partner_nickname": "Johnny",
  "has_more": false
}`

const sendMsgBody = `{
  "receiver_id": "uuid",
  "content": "Xin chào bạn!",
  "media_url": "https://cdn.example.com/file.pdf (optional)",
  "file_name": "document.pdf (optional)"
}`

const sendEncryptedBody = `{
  "receiver_id": "uuid",
  "content": "fallback text",
  "encrypted_content": "base64_encrypted_data_here",
  "encryption_key_id": "key_uuid"
}`

const sendMsgResponse = `{
  "data": {
    "id": "uuid",
    "sender_id": "uuid",
    "receiver_id": "uuid",
    "content": "Xin chào bạn!",
    "is_read": false,
    "created_at": "2026-03-18T10:35:00Z"
  }
}`

const nicknameBody = `POST /v2/messages/{partner_id}/nicknames
{
  "nickname": "Người bạn thân 💖"
}`

const encryptionBody = `POST /v2/messages/{partner_id}/encryption
{ "enabled": true }`

const encryptionResponse = `{
  "data": {
    "user_id": "uuid",
    "partner_id": "uuid",
    "encryption_enabled": true,
    "updated_at": "2026-03-18T11:00:00Z"
  }
}`

export default function MessagesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Messages API</h1>
        <p className="page-desc">
          Tin nhắn 1-1 với hỗ trợ mã hóa đầu cuối (E2EE), biệt danh, gửi media, và phân trang theo thời gian.
        </p>
        <div className="page-version">💬 Messages · E2EE · Nicknames · Media</div>
      </div>

      <div className="section">
        <h2 className="section-title">Tất cả Endpoints</h2>
        <EndpointTable endpoints={msgEndpoints} />
      </div>

      <div className="section">
        <h2 className="section-title">Danh sách hội thoại</h2>
        <CodeBlock lang="http" title="Request" code={`GET /conversations\nAuthorization: Bearer <token>`} />
        <CodeBlock lang="json" title="Response" code={convResponse} />
      </div>

      <div className="section">
        <h2 className="section-title">Tin nhắn với một user</h2>
        <CodeBlock lang="http" title="Request" code={`GET /v2/messages/{partner_id}?limit=50&before=2026-03-18T00:00:00Z`} />
        <div style={{margin:'12px 0'}}>
          <table className="rate-table">
            <thead>
              <tr><th>Param</th><th>Type</th><th>Default</th><th>Mô tả</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code className="path-code">limit</code></td>
                <td style={{color:'var(--blue)',fontFamily:'var(--font-mono)',fontSize:13}}>number</td>
                <td style={{color:'var(--text3)'}}>50</td>
                <td style={{color:'var(--text2)',fontSize:13}}>Số tin nhắn (max 100)</td>
              </tr>
              <tr>
                <td><code className="path-code">before</code></td>
                <td style={{color:'var(--blue)',fontFamily:'var(--font-mono)',fontSize:13}}>ISO timestamp</td>
                <td style={{color:'var(--text3)'}}>—</td>
                <td style={{color:'var(--text2)',fontSize:13}}>Phân trang: lấy tin trước thời điểm này</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeBlock lang="json" title="Response" code={msgListResponse} />
        <div className="note">
          <span className="note-icon">⚡</span>
          <span>Khi gọi endpoint này, tất cả tin nhắn chưa đọc từ đối tác sẽ <strong>tự động được đánh dấu đã đọc</strong>.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Gửi tin nhắn</h2>
        <CodeBlock lang="json" title="POST /messages — Request Body" code={sendMsgBody} />
        <CodeBlock lang="json" title="Response" code={sendMsgResponse} />

        <h3 style={{marginBottom:10,marginTop:24,fontSize:15,color:'var(--text)',fontFamily:'var(--font-display)'}}>Gửi tin nhắn mã hóa (E2EE)</h3>
        <CodeBlock lang="json" title="POST /messages — Encrypted Body" code={sendEncryptedBody} />
        <div className="note">
          <span className="note-icon">🔒</span>
          <span>Khi gửi tin mã hóa, trường <code>content</code> sẽ tự động được thay bằng <code>[Encrypted message]</code> để bảo mật.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Xóa tin nhắn</h2>
        <CodeBlock lang="http" title="Request" code={`DELETE /messages/{message_id}\nAuthorization: Bearer <token>`} />
        <div className="note blue">
          <span className="note-icon">🗑️</span>
          <span><strong>Soft delete</strong>: tin nhắn được đánh dấu <code>deleted_at</code> thay vì xóa thực sự. Chỉ người gửi mới có quyền xóa tin nhắn của mình.</span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Biệt danh (Nicknames)</h2>
        <CodeBlock lang="json" title="POST /v2/messages/{partner_id}/nicknames — Request Body" code={nicknameBody} />
      </div>

      <div className="section">
        <h2 className="section-title">Mã hóa đầu cuối (E2EE)</h2>
        <div className="info-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
          <div className="info-card">
            <div className="info-card-icon">🔓</div>
            <div className="info-card-label">Trạng thái mặc định</div>
            <div className="info-card-value">Không mã hóa</div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🔐</div>
            <div className="info-card-label">Khi bật E2EE</div>
            <div className="info-card-value">AES-256 end-to-end</div>
          </div>
        </div>
        <CodeBlock lang="json" title="Bật mã hóa" code={encryptionBody} />
        <CodeBlock lang="json" title="Response" code={encryptionResponse} />
      </div>
    </div>
  )
}
