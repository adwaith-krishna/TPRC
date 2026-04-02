export default {
  name: 'majorClient',
  type: 'document',
  title: 'Major Clients',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Client Name',
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Client Logo',
      options: { hotspot: true },
    },
  ],
}
