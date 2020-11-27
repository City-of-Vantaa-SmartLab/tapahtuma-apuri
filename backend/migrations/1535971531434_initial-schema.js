exports.up = (pgm) => {
  pgm.createTable('question', {
    id: 'id',
    title: { type: 'text', notNull: true },
    info: { type: 'text', notNull: true },
    parent_id: { type: 'int', notNull: false },
    question_ordinal_first: { type: 'int', notNull: true },
    question_ordinal_second: { type: 'int', notNull: false },
    question_ordinal_third: { type: 'int', notNull: false },
  });
  pgm.createTable('option', {
    id: 'id',
    text: { type: 'text', notNull: true },
    forward_to: { type: 'int', notNull: false },
    memos: { type: 'text[]', notNull: true },
    additional_infos: { type: 'text[]', notNull: true },
    question_id: { type: 'int', notNull: true },
  });
  pgm.renameTable('admins', 'appuser');
};
