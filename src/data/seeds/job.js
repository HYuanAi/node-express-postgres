
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('job').del()
    .then(function () {
      // Inserts seed entries
      return knex('job').insert([
        { title: 'Software Developer', description: 'Full Stack Developer', expiry_date: '2021-03-09' },
        { title: 'Executive', description: 'Operational executive to coordinate customers.', expiry_date: '2021-03-08' },
      ]);
    });
};
