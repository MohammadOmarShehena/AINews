import fs from "fs";
import { Pool } from "pg";

const code = fs.readFileSync("apps/web/lib/mockData.ts", "utf8");
const lines = code.split("\n");
const start = 106;
const end = 281;
let sub = lines.slice(start, end).join("\n").replace("export const MOCK_ARTICLES: FeedArticle[] =", "").trim();
if (sub.endsWith(";")) sub = sub.slice(0, -1);
const list = eval(sub);

const pool = new Pool({
  connectionString: "postgresql://postgres.qcwwouccyituqzebrtrj:050403168Omar@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false }
});

function esc(val: any) {
  if (val === null || val === undefined) return "NULL";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

async function run() {
  for (const a of list) {
    const existing = await pool.query("SELECT id FROM articles WHERE title = " + esc(a.title) + ";");
    if (existing.rows.length > 0) continue;

    const topics = a.topicSlugs || ["business"];
    const topicsSql = "ARRAY[" + topics.map((t: string) => esc(t)).join(",") + "]::text[]";

    const storyRes = await pool.query(
      "INSERT INTO stories (headline, article_count, briefing_stale, created_at, latest_article_at, topic_slugs) VALUES (" +
      esc(a.title) + ", 1, false, NOW(), NOW(), " + topicsSql + ") RETURNING id;"
    );
    const storyId = storyRes.rows[0].id;

    await pool.query(
      "INSERT INTO articles (external_id, title, content, summary, url, source, author, published_at, topic_slugs, story_id, image_url, article_type, created_at) VALUES (" +
      esc("article-" + a.id) + ", " +
      esc(a.title) + ", " +
      esc(a.content || a.summary) + ", " +
      esc(a.summary) + ", " +
      esc(a.url || "https://economictimes.indiatimes.com") + ", " +
      esc(a.source || "economictimes") + ", " +
      esc(a.author || "ET Bureau") + ", NOW(), " +
      topicsSql + ", " +
      esc(storyId) + ", " +
      esc(a.imageUrl) + ", " +
      "'news', NOW());"
    );
  }
  const count = await pool.query("SELECT count(*) FROM articles;");
  console.log("SUCCESS! Total articles in DB now:", count.rows[0].count);
  await pool.end();
}

run().catch((e) => {
  console.error("Seed error:", e);
  pool.end();
});
