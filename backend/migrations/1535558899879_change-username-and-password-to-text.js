exports.up = (pgm) => {
  pgm.alterColumn('admins', 'username', {
    type: 'text',
  });
  pgm.alterColumn('admins', 'password', {
    type: 'text',
  });
};
