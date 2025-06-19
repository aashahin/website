import type {Post, Article, ArticleFilters} from '../types/articles';

// Calculate reading time based on content
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200; // Average reading speed in Arabic
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} دقيقة${minutes > 1 ? '' : ''}`;
}

// Extract category from tags or use default
export function extractCategory(tags: any[]): string {
    // If you have specific category tags, you can filter them here
    // For now, we'll use the first tag as category or default
    if (tags && tags.length > 0) {
        return tags[0].data?.name || tags[0] || 'عام';
    }
    return 'عام';
}

// Format date to Arabic locale
export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ar', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Transform CMS post data to frontend article format
export function transformPostToArticle(post: Post): Article {
    return {
        id: post.id,
        title: post.data.title,
        excerpt: post.data.excerpt,
        date: formatDate(post.data.publishedDate),
        publishedDate: post.data.publishedDate,
        updatedDate: post.data.updatedDate,
        readTime: calculateReadTime(post.body),
        category: extractCategory(post.data.tags),
        tags: post.data.tags,
        keywords: post.data.keywords,
        slug: post.slug,
        body: post.body,
        featuredImage: post.data.featuredImage,
        status: post.data.status,
    };
}

// Filter articles based on criteria
export function filterArticles(articles: Article[], filters: ArticleFilters): Article[] {
    return articles.filter(article => {
        if (filters.category && article.category !== filters.category) {
            return false;
        }
        if (filters.tag && !article.tags.includes(filters.tag)) {
            return false;
        }
        return !(filters.status && article.status !== filters.status);
    });
}

// Sort articles by date (newest first)
export function sortArticlesByDate(articles: Article[]): Article[] {
    return articles.sort((a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
}

// Get published articles only
export function getPublishedArticles(articles: Article[]): Article[] {
    return articles.filter(article => article.status === 'published');
}