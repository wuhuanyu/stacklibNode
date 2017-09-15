export const NewsTags = ['politics', 'china', 'tech', 'business', 'life'];
export const NewsListItemFields = ['id', 'title', 'image_urls', 'tag', 'summary']

export const AllNewsFields = [
    'id',
    'title',
    'url',
    'timestamp',
    'crawled_at',
    'summary',
    'image_urls',
    'text',
    'tag',
    'source'
];
export const AllBlogFields = [
    'id',
    'title',
    'url',
    'crawled_at',
    'image_urls',
    'text',
    'summary'
];

export const Tags = {
    bbc: [
        'china',
        'politics',
        'asia',
        'business',
        'tech',
        'entertainment',
        'health'
    ],
    cnn: [
        'china',
        'business',
        'entertainment',
        'politics',
        'tech',
        'sport',
        'life',
        'health'
    ],
    reuters: [
        'china',
        'business',
        'politics',
        'tech',
        'life',
        'entertainment',
        'art',
        'sport'
    ]
};
const ali = "139.224.118.55";
export const host = ali;
export const port = "3002";
export const domain = host + ":" + port + "/api/v1/";;