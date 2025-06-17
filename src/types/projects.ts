// Base types for the content collection
export type ProjectLinks = {
    live?: string;
    github?: string;
    documentation?: string;
}

export type ProjectCollaboration = {
    isTeamProject: boolean;
    teamMembers: string[];
    myRole?: string;
}

export type ProjectStatus = 'in-development' | 'completed' | 'on-hold' | 'archived';

export type ProjectData = {
    title: string;
    shortDescription: string;
    description: any; // Markdoc content
    featuredImage?: string;
    gallery: string[];
    technologies: string[];
    links: ProjectLinks;
    status: ProjectStatus;
    featured: boolean;
    startDate: Date;
    endDate?: Date;
    collaboration: ProjectCollaboration;
    keywords: string[];
}

// Complete project type as returned by getCollection
export type Project = {
    id: string;
    data: ProjectData;
    filePath: string;
    digest: string;
    deferredRender: boolean;
    collection: 'projects';
    slug: string;
    render: () => Promise<any>;
}

// Utility types for component props
export type ProjectCardProps = {
    project: Project;
}

// Status mapping types
export type StatusDisplayMap = {
    [K in ProjectStatus]: string;
};

export type StatusClassMap = {
    [K in ProjectStatus]: string;
};

// Helper type for sorted projects
export type SortedProject = Project;