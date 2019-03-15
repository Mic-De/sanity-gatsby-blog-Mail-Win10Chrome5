export default {
  type: 'document',
  name: 'post',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule post where you show them',
      type: 'datetime'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'post.excerpt'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'post.author'}]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'post.mainImage'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'body',
      title: 'Body',
      type: 'post.content'
    }
  ],
  orderings: [
    {
      title: 'Publishing date newâ>old',
      name: 'publishingDateAsc',
      by: [{field: 'publishedAt', direction: 'asc'}, {field: 'title', direction: 'asc'}]
    },
    {
      title: 'Publishing date old->new',
      name: 'publishingDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}, {field: 'title', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      image: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, image}) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Missing publishing date',
        media: image
      }
    }
  }
}
