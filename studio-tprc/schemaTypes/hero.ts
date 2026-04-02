export default {
  name: 'hero',
  type: 'document',
  title: 'Hero Section',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Main Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle/Description',
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: { hotspot: true },
    },
  ],
}