export default {
  name: 'clientFeedback',
  type: 'document',
  title: 'Client Feedback',
  fields: [
    {
      name: 'feedback',
      type: 'text',
      title: 'Feedback / Quote',
      validation: (Rule) => Rule.max(150).warning('Keep feedback below 150 characters for a clean UI layout.'),
    },
    {
      name: 'name',
      type: 'string',
      title: 'Client Name',
    },
    {
      name: 'designation',
      type: 'string',
      title: 'Designation',
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company Name',
    },
  ],
}
