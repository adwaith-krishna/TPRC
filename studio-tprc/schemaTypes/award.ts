export default {
  name: 'award',
  type: 'document',
  title: 'Certificates & Awards',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Award / Certificate Title',
    },
    {
      name: 'issuer',
      type: 'string',
      title: 'Issuing Organization',
    },
    {
      name: 'year',
      type: 'string',
      title: 'Year',
    },
    {
      name: 'badgeText',
      type: 'string',
      title: 'Badge Text',
      description: 'e.g., Certified, Winner, Top Performer',
    },
    {
      name: 'badgeType',
      type: 'string',
      title: 'Badge Color Theme',
      description: 'Choose a background color type for the badge',
      options: {
        list: [
          { title: 'Gold (Winner/Performer)', value: 'gold' },
          { title: 'Blue (Certified/Standard)', value: 'blue' },
        ],
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Award Image / Certificate',
      options: { hotspot: true },
    },
    {
      name: 'isCertificate',
      type: 'boolean',
      title: 'Is Certificate?',
      description: 'If checked, clicking the card will open the certificate in a zoom modal',
      initialValue: false,
    },
  ],
}
