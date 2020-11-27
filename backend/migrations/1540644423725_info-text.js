exports.up = (pgm) => {
  pgm.createTable('info', {
    id: 'id',
    emptyGreetingHeader: { type: 'text', notNull: true },
    emptyGreetingBody: { type: 'text', notNull: true },
    readyGreetingHeader: { type: 'text', notNull: true },
    readyGreetingBody: { type: 'text', notNull: true },
  });
};
