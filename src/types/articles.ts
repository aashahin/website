export type PostData = {
    title: string;
    excerpt: string;
    status: 'draft' | 'published';
    featuredImage?: string;
    publishedDate: string;
    updatedDate?: string;
    tags: string[];
    keywords: string[];
}

export type Post = {
    id: string;
    data: PostData;
    body: string;
    filePath: string;
    digest: string;
    deferredRender: boolean;
    collection: 'posts';
    slug: string;
    render: () => Promise<{ Content: any; headings: any[] }>;
}

// Processed article type for frontend display
export type Article = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    publishedDate: string;
    updatedDate?: string;
    readTime: string;
    category: string;
    tags: string[];
    keywords: string[];
    slug: string;
    body: string;
    featuredImage?: string;
    status: 'draft' | 'published';
}

export type ArticleFilters = {
    category?: string;
    tag?: string;
    status?: 'draft' | 'published';
}
