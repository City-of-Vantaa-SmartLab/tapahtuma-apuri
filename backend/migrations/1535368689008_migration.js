exports.up = (pgm) => {
  pgm.createTable('admins', {
    id: 'id',
    username: { type: 'varchar(50)', notNull: true },
    password: { type: 'char(60)', notNull: true },
  });
};
