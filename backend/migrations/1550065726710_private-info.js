exports.up = (pgm) => {
  pgm.addColumns('info', {
    privateGreetingHeader: { type: 'text' },
    privateGreetingBody: { type: 'text' },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('info', ['privateGreetingHeader', 'privateGreetingBody']);
};
