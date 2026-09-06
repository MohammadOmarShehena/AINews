import { NextRequest, NextResponse } from "next/server";
import {
  MOCK_ARTICLES,
  MOCK_AUTHORS,
  MOCK_STORIES,
  MOCK_BRIEFINGS,
  MOCK_STORY_ARCS,
  MOCK_INTERESTS,
  MOCK_NOTIFICATIONS,
  FeedArticle,
} from "../../../lib/mockData";

// In-memory state for interactions (likes, bookmarks, followed stories/authors)
const likedArticleIds = new Set<string>();
const bookmarkedArticleIds = new Set<string>();
const followedAuthorIds = new Set<string>();
const followedStoryIds = new Set<string>(["story-india-ai-mission"]);

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug || [];
  const url = new URL(request.url);
  const path = slug.join("/");

  // 1. GET /api/feed/trending
  if (path === "feed/trending") {
    return NextResponse.json({
      trending: [
        { id: "tr-1", category: "Technology", topic: "IndiaAI Sovereign Cloud", count: "42.8k reads" },
        { id: "tr-2", category: "Monetary Policy", topic: "RBI Repo Rate Pause", count: "31.5k reads" },
        { id: "tr-3", category: "Healthcare", topic: "Biosimilar Exports Boom", count: "19.2k reads" },
        { id: "tr-4", category: "Hardware", topic: "Dholera Semiconductor Cleanroom", count: "16.7k reads" },
        { id: "tr-5", category: "Automotive", topic: "Commercial EV Adoption", count: "14.1k reads" },
      ],
    });
  }

  // 2. GET /api/feed/latest
  if (path === "feed/latest") {
    const articles = MOCK_ARTICLES.map((art) => ({
      ...art,
      isLiked: likedArticleIds.has(art.id),
      isBookmarked: bookmarkedArticleIds.has(art.id),
    }));
    return NextResponse.json({ articles });
  }

  // 3. GET /api/feed/search
  if (path === "feed/search") {
    const q = (url.searchParams.get("q") || "").toLowerCase().trim();
    const filtered = MOCK_ARTICLES.filter((art) => {
      if (!q) return true;
      return (
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q) ||
        (art.author && art.author.toLowerCase().includes(q)) ||
        art.topicSlugs.some((t) => t.toLowerCase().includes(q))
      );
    }).map((art) => ({
      ...art,
      isLiked: likedArticleIds.has(art.id),
      isBookmarked: bookmarkedArticleIds.has(art.id),
    }));
    return NextResponse.json({ articles: filtered });
  }

  // 4. GET /api/feed/liked
  if (path === "feed/liked") {
    const articles = MOCK_ARTICLES.filter((art) => likedArticleIds.has(art.id) || art.id === "art-1").map((art) => ({
      ...art,
      isLiked: true,
      isBookmarked: bookmarkedArticleIds.has(art.id),
    }));
    return NextResponse.json({ articles });
  }

  // 5. GET /api/feed/bookmarked
  if (path === "feed/bookmarked") {
    const articles = MOCK_ARTICLES.filter((art) => bookmarkedArticleIds.has(art.id) || art.id === "art-2").map((art) => ({
      ...art,
      isLiked: likedArticleIds.has(art.id),
      isBookmarked: true,
    }));
    return NextResponse.json({ articles });
  }

  // 6. GET /api/feed
  if (path === "feed") {
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const topic = url.searchParams.get("topic");

    let filtered = MOCK_ARTICLES;
    if (topic && topic !== "All") {
      filtered = filtered.filter((art) =>
        art.topicSlugs.some((t) => t.toLowerCase().includes(topic.toLowerCase())) ||
        art.frame.toLowerCase().includes(topic.toLowerCase())
      );
    }

    const paginated = filtered.slice(offset, offset + limit).map((art) => ({
      ...art,
      isLiked: likedArticleIds.has(art.id),
      isBookmarked: bookmarkedArticleIds.has(art.id),
    }));

    return NextResponse.json({
      articles: paginated,
      total: filtered.length,
      hasMore: offset + limit < filtered.length,
    });
  }

  // 7. GET /api/authors or /api/authors/:id or /api/authors/:id/articles
  if (slug[0] === "authors") {
    const authorId = slug[1];
    const subAction = slug[2];

    if (!authorId) {
      const limit = parseInt(url.searchParams.get("limit") || "10", 10);
      const authors = MOCK_AUTHORS.slice(0, limit).map((a) => ({
        id: a.id,
        name: a.name,
        handle: a.id.replace("author-", ""),
        avatar_url: a.avatar,
        bio: a.bio,
        followersCount: a.followersCount,
        genres: ["Economics", "Policy", "Technology"],
        articleCount: a.articleCount,
        isFollowing: followedAuthorIds.has(a.id),
      }));
      return NextResponse.json({ authors });
    }

    const author = MOCK_AUTHORS.find((a) => a.id === authorId || a.name.toLowerCase().includes(authorId.toLowerCase()));

    if (subAction === "articles") {
      const authorArticles = MOCK_ARTICLES.filter(
        (art) => art.authorId === authorId || (author && art.author === author.name)
      );
      return NextResponse.json({ articles: authorArticles });
    }

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: author.id,
      name: author.name,
      handle: author.id.replace("author-", ""),
      bio: author.bio,
      followersCount: author.followersCount,
      genres: ["Economics", "Technology", "Public Policy"],
      articleCount: author.articleCount,
      isFollowing: followedAuthorIds.has(author.id),
      avatar_url: author.avatar,
    });
  }

  // 8. GET /api/stories/followed or /api/stories
  if (slug[0] === "stories") {
    if (slug[1] === "followed") {
      const followed = MOCK_STORIES.filter((s) => followedStoryIds.has(s.id)).map((s) => ({
        ...s,
        isFollowed: true,
      }));
      return NextResponse.json(followed);
    }
    const stories = MOCK_STORIES.map((s) => ({
      ...s,
      isFollowed: followedStoryIds.has(s.id),
    }));
    return NextResponse.json({ stories });
  }

  // 9. GET /api/briefing/:storyId or /api/briefing/:storyId/vernacular/:lang
  if (slug[0] === "briefing") {
    const storyId = slug[1] || "story-india-ai-mission";
    const briefing = MOCK_BRIEFINGS[storyId] || MOCK_BRIEFINGS["story-india-ai-mission"]!;

    if (slug[2] === "vernacular") {
      return NextResponse.json(briefing);
    }

    return NextResponse.json(briefing);
  }

  // 10. GET /api/story-arc/:storyId
  if (slug[0] === "story-arc") {
    const storyId = slug[1] || "story-india-ai-mission";
    const arc = MOCK_STORY_ARCS[storyId] || MOCK_STORY_ARCS["story-india-ai-mission"]!;
    return NextResponse.json(arc);
  }

  // 11. GET /api/articles/:id
  if (slug[0] === "articles") {
    const id = slug[1];
    const article = MOCK_ARTICLES.find((a) => a.id === id) || MOCK_ARTICLES[0]!;
    return NextResponse.json(article);
  }

  // 12. GET /api/user/*
  if (slug[0] === "user") {
    const sub = slug[1];
    if (sub === "me") {
      return NextResponse.json({
        id: "user-demo",
        email: "reader@economictimes.com",
        name: "Executive Reader",
      });
    }
    if (sub === "stats") {
      return NextResponse.json({
        readArticlesCount: 14,
        bookmarkedCount: bookmarkedArticleIds.size + 2,
        likedCount: likedArticleIds.size + 1,
        followedAuthorsCount: followedAuthorIds.size + 1,
        followedStoriesCount: followedStoryIds.size,
      });
    }
    if (sub === "focus") {
      return NextResponse.json({
        totalSeconds: 3600,
        dailyFocus: [
          { day: "Mon", minutes: 12 },
          { day: "Tue", minutes: 25 },
          { day: "Wed", minutes: 18 },
          { day: "Thu", minutes: 32 },
          { day: "Fri", minutes: 20 },
        ],
      });
    }
    if (sub === "articles") {
      return NextResponse.json({ articles: MOCK_ARTICLES.slice(0, 3) });
    }
    if (sub === "authors") {
      return NextResponse.json({ authors: MOCK_AUTHORS.slice(0, 2) });
    }
    if (sub === "stories") {
      return NextResponse.json({ stories: MOCK_STORIES.slice(0, 2) });
    }
  }

  // 13. GET /api/interests
  if (slug[0] === "interests") {
    return NextResponse.json({ topics: MOCK_INTERESTS });
  }

  // 14. GET /api/notifications
  if (slug[0] === "notifications") {
    return NextResponse.json({ notifications: MOCK_NOTIFICATIONS });
  }

  // 15. GET /api/broadcast/generate
  if (slug[0] === "broadcast") {
    return NextResponse.json({
      title: "Daily Executive Financial Briefing",
      duration: "3:45",
      segments: [
        { title: "National AI Compute Subsidies", text: "India clears tenders for 10,000 sovereign GPUs." },
        { title: "RBI Holds Repo Rate", text: "Monetary policy remains neutral at 6.50%." },
      ],
    });
  }

  // Default fallback for any other GET endpoint
  return NextResponse.json({ ok: true, path });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug || [];
  const path = slug.join("/");

  // 1. POST /api/signals
  if (path === "signals") {
    try {
      const body = await request.json();
      if (body.article_id) {
        if (body.type === "like") {
          if (likedArticleIds.has(body.article_id)) {
            likedArticleIds.delete(body.article_id);
          } else {
            likedArticleIds.add(body.article_id);
          }
        }
        if (body.type === "bookmark") {
          if (bookmarkedArticleIds.has(body.article_id)) {
            bookmarkedArticleIds.delete(body.article_id);
          } else {
            bookmarkedArticleIds.add(body.article_id);
          }
        }
      }
    } catch {
      // Ignore JSON parse error on empty ping
    }
    return NextResponse.json({ success: true });
  }

  // 2. POST /api/briefing/:storyId/ask (Simulated AI Q&A Stream for useChat)
  if (slug[0] === "briefing" && slug[2] === "ask") {
    const storyId = slug[1] || "story-india-ai-mission";
    let question = "the briefing";
    try {
      const body = await request.json();
      if (body.messages && body.messages.length > 0) {
        question = body.messages[body.messages.length - 1].content;
      }
    } catch {}

    const briefing = (MOCK_BRIEFINGS[storyId] || MOCK_BRIEFINGS["story-india-ai-mission"])!;
    const answer = `Based on the latest reports on ${briefing.headline}:\n\n` +
      `Regarding your inquiry ("${question}"): ` +
      `The initiative focuses on democratizing compute access, maintaining macro liquidity stability, and supporting indigenous ecosystem development. ` +
      `Eligible startups receive direct compute subsidies up to 50%, with high security protocols mandated across all participating regional data center nodes.\n\n` +
      `Key Takeaways:\n` +
      `• Clear timelines established for cloud infrastructure rollout.\n` +
      `• Transparent benchmarking and monitoring through verified sovereign hubs.\n` +
      `• Continuous alignment with national digital infrastructure goals.`;

    // Return as streaming plain text response compatible with AI SDK useChat
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Stream chunks with slight delay for realistic typing effect
        const words = answer.split(" ");
        for (let i = 0; i < words.length; i++) {
          controller.enqueue(encoder.encode(words[i] + " "));
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  }

  // 3. POST /api/auth/login or /api/auth/register or /api/auth/logout
  if (slug[0] === "auth") {
    return NextResponse.json({
      success: true,
      user: {
        id: "user-demo",
        email: "reader@economictimes.com",
        name: "Executive Reader",
      },
    });
  }

  // 4. POST /api/stories/:id/follow or /unfollow
  if (slug[0] === "stories" && slug[2] && slug[1]) {
    const storyId = slug[1];
    const action = slug[2];
    if (action === "follow") followedStoryIds.add(storyId);
    if (action === "unfollow") followedStoryIds.delete(storyId);
    return NextResponse.json({ success: true, isFollowed: followedStoryIds.has(storyId) });
  }

  // 5. POST /api/authors/:id/follow or /unfollow
  if (slug[0] === "authors" && slug[2] && slug[1]) {
    const authorId = slug[1];
    const action = slug[2];
    if (action === "follow") followedAuthorIds.add(authorId);
    if (action === "unfollow") followedAuthorIds.delete(authorId);
    return NextResponse.json({ success: true, isFollowing: followedAuthorIds.has(authorId) });
  }

  // 6. POST /api/interests/*
  if (slug[0] === "interests") {
    return NextResponse.json({ success: true });
  }

  // 7. POST /api/broadcast/tts
  if (slug[0] === "broadcast") {
    return NextResponse.json({ success: true, status: "generated" });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug || [];
  if (slug[0] === "stories" && slug[2] === "unfollow" && slug[1]) {
    followedStoryIds.delete(slug[1]);
    return NextResponse.json({ success: true, isFollowed: false });
  }
  if (slug[0] === "authors" && slug[2] === "unfollow" && slug[1]) {
    followedAuthorIds.delete(slug[1]);
    return NextResponse.json({ success: true, isFollowing: false });
  }
  return NextResponse.json({ success: true });
}
