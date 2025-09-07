// schemas/serverError.js
export default {
  name: 'serverError',
  title: 'Server Error',
  type: 'document',
  fields: [
    {
      name: 'message',
      title: 'Error Message',
      type: 'string',
    },
    {
      name: 'stack',
      title: 'Stack Trace',
      type: 'text',
    },
    {
      name: 'endpoint',
      title: 'Endpoint',
      type: 'string',
    },
    {
      name: 'occurredAt',
      title: 'Occurred At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  ],
}
