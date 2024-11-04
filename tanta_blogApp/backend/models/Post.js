const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('tanta_blogApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Post extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title cannot be empty'
          }
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Body cannot be empty'
          }
        }
      },
      excerpt: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      modelName: 'Post',
      tableName: 'Posts',
      timestamps: false
    });
  }
}

module.exports = Post;