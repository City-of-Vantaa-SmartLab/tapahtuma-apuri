exports.up = (pgm) => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true });
  pgm.createTable('memo', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    memodata: { type: 'jsonb', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('memo');
  pgm.dropExtension('uuid-ossp');
};
