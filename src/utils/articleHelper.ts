import type {Article} from '../types/articles';

// Get unique tags from articles
export function getUniqueTags(articles: Article[]): string[] {
  const allTags = articles.flatMap(article => article.tags);
  return [...new Set(allTags)].sort();
}

// Search articles by title, description, or content
export function searchArticles(articles: Article[], query: string): Article[] {
  const decodedQuery = decodeURIComponent(query);
  const lowercaseQuery = decodedQuery.toLowerCase();
  return articles.filter(article =>
    article.title.includes(lowercaseQuery) ||
    article.excerpt.includes(lowercaseQuery) ||
    article.keywords.some(keyword => keyword.includes(lowercaseQuery))
  );
}

// Get related articles based on tags
export function getRelatedArticles(currentArticle: Article, allArticles: Article[], limit = 3): Article[] {
  const relatedArticles = allArticles
    .filter(article =>
      article.id !== currentArticle.id &&
      article.status === 'published' &&
      article.tags.some(tag => currentArticle.tags.includes(tag))
    )
    .sort((a, b) => {
      // Sort by number of matching tags
      const aMatches = a.tags.filter(tag => currentArticle.tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => currentArticle.tags.includes(tag)).length;
      return bMatches - aMatches;
    });

  return relatedArticles.slice(0, limit);
}

// Paginate articles
export function paginateArticles(articles: Article[], page: number, perPage: number) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    currentPage: page,
    totalPages: Math.ceil(articles.length / perPage),
    totalArticles: articles.length,
    hasNextPage: endIndex < articles.length,
    hasPrevPage: page > 1,
  };
}
