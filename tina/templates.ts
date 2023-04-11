import type { TinaField } from 'tinacms';
export function postFields() {
    return [
        {
            type: 'string',
            name: 'author',
            label: 'Author',
            ui: {
                component: 'textarea',
            },
            required: true,
        },
        {
            type: 'datetime',
            name: 'date',
            label: 'Date',
        },
        {
            type: 'image',
            name: 'hero_image',
            label: 'Hero Image',
        },
        {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
        },
        {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
                component: 'textarea',
            },
        },
        {
            type: 'string',
            name: 'tag',
            label: 'Tag',
            list: true,
            ui: {
                component: 'tags',
            },
        },
    ] as TinaField[];
}
export function videoFields() {
    return [
        {
            type: 'datetime',
            name: 'date',
            label: 'date',
        },
        {
            type: 'string',
            name: 'author',
            label: 'author',
        },
        {
            type: 'image',
            name: 'hero_image',
            label: 'hero_image',
        },
        {
            type: 'string',
            name: 'title',
            label: 'title',
        },
        {
            type: 'string',
            name: 'description',
            label: 'description',
        },
        {
            type: 'string',
            name: 'youtube_id',
            label: 'Youtube ID',
        },
        {
            type: 'string',
            name: 'tag',
            label: 'Tag',
            list: true,
            ui: {
                component: 'tags',
            },
        },
    ] as TinaField[];
}
