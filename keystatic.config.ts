import {config, fields, collection} from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: "aashahin/website"
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            entryLayout: 'content',
            format: {
                contentField: 'content',
            },
            columns: ["title", "publishedDate", "updatedDate", "status"],
            schema: {
                title: fields.slug({name: {label: 'Title'}}),
                description: fields.text({label: 'Description'}),
                excerpt: fields.text({
                    label: 'Excerpt',
                    description: 'Short summary for post previews'
                }),
                status: fields.select({
                    label: 'Status',
                    options: [
                        {label: 'Draft', value: 'draft'},
                        {label: 'Published', value: 'published'}
                    ],
                    defaultValue: 'draft'
                }),
                featuredImage: fields.image({
                    label: 'Featured Image',
                    directory: 'src/assets/images/posts',
                    publicPath: '@assets/images/posts/',
                }),
                content: fields.markdoc({
                    label: 'Content',
                    options: {
                        image: {
                            directory: 'src/assets/images/posts',
                            publicPath: '@assets/images/posts/'
                        },
                    },
                }),
                publishedDate: fields.date({label: 'Published Date', defaultValue: {kind: "today"}}),
                updatedDate: fields.date({
                    label: 'Updated Date',
                    description: 'Leave empty if same as published date'
                }),
                tags: fields.array(
                    fields.relationship({
                        label: 'Tags',
                        collection: 'tags',
                    })
                ),
                keywords: fields.array(fields.text({label: 'Keywords'})),
            },
        }),
        tags: collection({
            label: 'Tags',
            slugField: 'name',
            path: 'src/content/tags/*',
            schema: {
                name: fields.slug({name: {label: 'Name'}}),
            },
        }),
        projects: collection({
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            format: {contentField: 'description'},
            columns: ["title", "status", "featured", "startDate"],
            schema: {
                title: fields.slug({name: {label: 'Project Title'}}),
                shortDescription: fields.text({
                    label: 'Short Description',
                    description: 'Brief one-liner for project cards',
                    validation: {length: {max: 120}}
                }),
                description: fields.markdoc({
                    label: 'Full Description',
                    description: 'Detailed project description with markdown support',
                    options: {
                        image: {
                            directory: 'src/assets/images/projects',
                            publicPath: '@assets/images/projects/'
                        },
                    },
                }),
                featuredImage: fields.image({
                    label: 'Featured Image',
                    description: 'Main project screenshot or logo',
                    directory: 'src/assets/images/projects',
                    publicPath: '@assets/images/projects/',
                }),
                gallery: fields.array(
                    fields.image({
                        label: 'Gallery Image',
                        directory: 'src/assets/images/projects',
                        publicPath: '@assets/images/projects/',
                    }),
                    {
                        label: 'Project Gallery',
                        description: 'Additional screenshots or images'
                    }
                ),
                technologies: fields.array(
                    fields.text({label: "Technology"}),
                    {
                        label: 'Technologies Used',
                        description: 'List of technologies or frameworks used in the project'
                    }
                ),
                links: fields.object({
                    live: fields.url({
                        label: 'Live Demo',
                        description: 'URL to the live project'
                    }),
                    github: fields.url({
                        label: 'GitHub Repository',
                        description: 'Source code repository'
                    }),
                    documentation: fields.url({
                        label: 'Documentation',
                        description: 'Project documentation or wiki'
                    }),
                }),
                status: fields.select({
                    label: 'Project Status',
                    options: [
                        {label: 'In Development', value: 'in-development'},
                        {label: 'Completed', value: 'completed'},
                        {label: 'On Hold', value: 'on-hold'},
                        {label: 'Archived', value: 'archived'}
                    ],
                    defaultValue: 'in-development'
                }),
                featured: fields.checkbox({
                    label: 'Featured Project',
                    description: 'Show this project prominently on homepage'
                }),
                startDate: fields.date({
                    label: 'Start Date',
                    description: 'When you started working on this project'
                }),
                endDate: fields.date({
                    label: 'End Date',
                    description: 'Leave empty for ongoing projects'
                }),
                collaboration: fields.object({
                    isTeamProject: fields.checkbox({
                        label: 'Team Project',
                        description: 'Was this a collaborative project?'
                    }),
                    teamMembers: fields.array(
                        fields.text({label: 'Team Member'}),
                        {
                            label: 'Team Members',
                            description: 'Other contributors to this project'
                        }
                    ),
                    myRole: fields.text({
                        label: 'My Role',
                        description: 'Your specific role in the project'
                    }),
                }),
                keywords: fields.array(
                    fields.text({label: 'Keywords'}),
                    {
                        label: 'SEO Keywords',
                        description: 'Comma-separated keywords for search optimization'
                    }
                ),
            },
        }),
    },
});