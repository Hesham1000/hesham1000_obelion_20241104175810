javascript
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Posts', [
    {
      title: '',
      content: '',
      image: '',
      video: '',
      isDraft: false
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Posts', null, {})
};
