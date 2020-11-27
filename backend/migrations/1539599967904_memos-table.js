exports.up = (pgm) => {
  pgm.createTable('memos', {
    id: 'id',
    text: { type: 'text', notNull: true },
    link: { type: 'text', notNull: true },
    additional_infos: { type: 'text[]', notNull: false },
    option_id: { type: 'int', notNull: true },
  });
  pgm.dropColumn('option', 'memos');
  pgm.dropColumn('option', 'additional_infos');
};
