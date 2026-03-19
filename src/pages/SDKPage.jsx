import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

const JS_CODE = `const BASE = 'https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api';

class ThazhClient {
  constructor(token) {
    this.token = token;
  }

  headers() {
    const h = { 'Content-Type': 'application/json' };
    if (this.token) h['Authorization'] = \`Bearer \${this.token}\`;
    return h;
  }

  // Posts
  async getPosts(page = 1, limit = 20) {
    const res = await fetch(\`\${BASE}/posts?page=\${page}&limit=\${limit}\`);
    return res.json();
  }

  async createPost(content, options = {}) {
    const res = await fetch(\`\${BASE}/posts\`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ content, ...options })
    });
    return res.json();
  }

  // Feed
  async getFeed(type = 'following', page = 1) {
    const res = await fetch(\`\${BASE}/feed?type=\${type}&page=\${page}\`, {
      headers: this.headers()
    });
    return res.json();
  }

  // Conversations
  async getConversations() {
    const res = await fetch(\`\${BASE}/conversations\`, {
      headers: this.headers()
    });
    return res.json();
  }

  // Messages
  async getMessages(partnerId, limit = 50) {
    const res = await fetch(\`\${BASE}/v2/messages/\${partnerId}?limit=\${limit}\`, {
      headers: this.headers()
    });
    return res.json();
  }

  async sendMessage(receiverId, content, mediaUrl) {
    const res = await fetch(\`\${BASE}/messages\`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({ receiver_id: receiverId, content, media_url: mediaUrl })
    });
    return res.json();
  }

  // Search
  async search(query, type = 'all') {
    const res = await fetch(\`\${BASE}/search?q=\${encodeURIComponent(query)}&type=\${type}\`);
    return res.json();
  }
}

// Usage
const client = new ThazhClient('your_jwt_token');
const { data } = await client.getConversations();
const feed = await client.getFeed('trending');
const post = await client.createPost('Hello Thazh! 👋', {
  visibility: 'public',
  media_urls: ['https://cdn.example.com/image.jpg']
});`

const PY_CODE = `import requests

class ThazhClient:
    BASE = "https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api"

    def __init__(self, token: str = None):
        self.headers = {"Content-Type": "application/json"}
        if token:
            self.headers["Authorization"] = f"Bearer {token}"

    def get_posts(self, page=1, limit=20):
        return requests.get(
            f"{self.BASE}/posts?page={page}&limit={limit}"
        ).json()

    def create_post(self, content, **kwargs):
        return requests.post(
            f"{self.BASE}/posts",
            json={"content": content, **kwargs},
            headers=self.headers
        ).json()

    def get_feed(self, type="following", page=1):
        return requests.get(
            f"{self.BASE}/feed?type={type}&page={page}",
            headers=self.headers
        ).json()

    def get_conversations(self):
        return requests.get(
            f"{self.BASE}/conversations",
            headers=self.headers
        ).json()

    def get_messages(self, partner_id, limit=50):
        return requests.get(
            f"{self.BASE}/v2/messages/{partner_id}?limit={limit}",
            headers=self.headers
        ).json()

    def send_message(self, receiver_id, content, media_url=None):
        body = {"receiver_id": receiver_id, "content": content}
        if media_url:
            body["media_url"] = media_url
        return requests.post(
            f"{self.BASE}/messages",
            json=body,
            headers=self.headers
        ).json()

    def search(self, query, type="all"):
        return requests.get(
            f"{self.BASE}/search?q={query}&type={type}"
        ).json()

# Usage
client = ThazhClient("your_jwt_token")
chats = client.get_conversations()
feed = client.get_feed(type="trending")
client.send_message("partner_uuid", "Xin chào! 👋")`

const SWIFT_CODE = `import Foundation

struct ThazhClient {
    let base = "https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api"
    let token: String

    func request(
        _ path: String,
        method: String = "GET",
        body: Data? = nil
    ) async throws -> Data {
        var req = URLRequest(url: URL(string: "\\(base)\\(path)")!)
        req.httpMethod = method
        req.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = body
        let (data, _) = try await URLSession.shared.data(for: req)
        return data
    }

    func getConversations() async throws -> Data {
        try await request("/conversations")
    }

    func getMessages(partnerId: String, limit: Int = 50) async throws -> Data {
        try await request("/v2/messages/\\(partnerId)?limit=\\(limit)")
    }

    func sendMessage(receiverId: String, content: String) async throws -> Data {
        let body = try JSONSerialization.data(withJSONObject: [
            "receiver_id": receiverId,
            "content": content
        ])
        return try await request("/messages", method: "POST", body: body)
    }

    func getFeed(type: String = "following", page: Int = 1) async throws -> Data {
        try await request("/feed?type=\\(type)&page=\\(page)")
    }

    func search(query: String, type: String = "all") async throws -> Data {
        let encoded = query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query
        return try await request("/search?q=\\(encoded)&type=\\(type)")
    }
}

// Usage
let client = ThazhClient(token: "your_jwt_token")
let conversations = try await client.getConversations()
try await client.sendMessage(receiverId: "partner_uuid", content: "Xin chào!")`

const KOTLIN_CODE = `import retrofit2.http.*
import retrofit2.Response

interface ThazhAPI {
    @GET("conversations")
    suspend fun getConversations(
        @Header("Authorization") token: String
    ): Response<ConversationsResponse>

    @GET("v2/messages/{partnerId}")
    suspend fun getMessages(
        @Header("Authorization") token: String,
        @Path("partnerId") partnerId: String,
        @Query("limit") limit: Int = 50
    ): Response<MessagesResponse>

    @POST("messages")
    suspend fun sendMessage(
        @Header("Authorization") token: String,
        @Body body: SendMessageRequest
    ): Response<MessageResponse>

    @GET("feed")
    suspend fun getFeed(
        @Header("Authorization") token: String,
        @Query("type") type: String = "following",
        @Query("page") page: Int = 1
    ): Response<FeedResponse>

    @GET("posts")
    suspend fun getPosts(
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20
    ): Response<PostsResponse>

    @GET("search")
    suspend fun search(
        @Query("q") query: String,
        @Query("type") type: String = "all"
    ): Response<SearchResponse>
}

data class SendMessageRequest(
    val receiver_id: String,
    val content: String,
    val media_url: String? = null
)

// Usage with Retrofit
val retrofit = Retrofit.Builder()
    .baseUrl("https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()

val api = retrofit.create(ThazhAPI::class.java)
val conversations = api.getConversations("Bearer your_token")`

const TABS = [
  { id: 'js', label: 'JavaScript', lang: 'js', code: JS_CODE },
  { id: 'python', label: 'Python', lang: 'python', code: PY_CODE },
  { id: 'swift', label: 'Swift', lang: 'swift', code: SWIFT_CODE },
  { id: 'kotlin', label: 'Kotlin', lang: 'kotlin', code: KOTLIN_CODE },
]

export default function SDKPage() {
  const [active, setActive] = useState('js')
  const tab = TABS.find(t => t.id === active)

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">SDK Examples</h1>
        <p className="page-desc">
          Ví dụ code mẫu giúp bạn nhanh chóng tích hợp Thazh Social API vào ứng dụng. Hỗ trợ JavaScript, Python, Swift và Kotlin.
        </p>
        <div className="page-version">⚡ JavaScript · Python · Swift · Kotlin</div>
      </div>

      <div className="section">
        <h2 className="section-title">Base URL</h2>
        <CodeBlock lang="bash" title="Base URL" code="https://ldofhofhspzynhglwhii.supabase.co/functions/v1/api" />
      </div>

      <div className="section">
        <h2 className="section-title">Client SDK</h2>
        <div className="sdk-tabs">
          {TABS.map(t => (
            <div
              key={t.id}
              className={`sdk-tab${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div style={{borderTop:'none',marginTop:0}}>
          <CodeBlock lang={tab.lang} title={`ThazhClient — ${tab.label}`} code={tab.code} />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Quick Reference</h2>
        <table className="rate-table">
          <thead>
            <tr><th>Method</th><th>Mô tả</th></tr>
          </thead>
          <tbody>
            {[
              ['getPosts(page, limit)', 'Danh sách bài viết công khai'],
              ['createPost(content, options)', 'Tạo bài viết mới'],
              ['getFeed(type, page)', 'Feed theo dõi hoặc trending'],
              ['getConversations()', 'Danh sách hội thoại'],
              ['getMessages(partnerId, limit)', 'Tin nhắn với partner'],
              ['sendMessage(receiverId, content)', 'Gửi tin nhắn'],
              ['search(query, type)', 'Tìm kiếm posts, users, hashtags'],
            ].map(([method, desc]) => (
              <tr key={method}>
                <td><code className="path-code" style={{color:'var(--pink-soft)'}}>{method}</code></td>
                <td style={{color:'var(--text2)',fontSize:13}}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Xử lý lỗi</h2>
        <CodeBlock lang="js" title="Error handling pattern" code={`try {
  const client = new ThazhClient('your_token');
  const result = await client.getPosts();

  if (result.error) {
    console.error('API Error:', result.error);
    // Xử lý lỗi theo status code
  } else {
    console.log('Posts:', result.data);
    console.log('Pagination:', result.pagination);
  }
} catch (err) {
  // Network error hoặc lỗi không mong đợi
  console.error('Network error:', err.message);
}`} />
      </div>
    </div>
  )
}
