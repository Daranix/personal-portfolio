export interface PostResponse {
    data: DataNode<Post>[]
    meta: Meta
}

export interface DataNode<T> {
    id: number
    attributes: T
}

export interface Post {
    title: string
    slug: string
    thumbnail_bg_color: string
    publishedAt: string
    description: string
    locale: string
    tags: Tags
    thumbnail: { data: DataNode<Thumbnail> };
}

export interface Tags {
    data: DataNode<Tag>[]
}

export interface Tag {
    tagName: string
    tagColor: string
    createdAt: string
    updatedAt: string
    locale: string
}



export interface Thumbnail {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
}

export interface Formats {
    large: Size
    small: Size
    medium: Size
    thumbnail: Size
}

export interface Size {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
}

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
