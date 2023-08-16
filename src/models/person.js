import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class person extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_person: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    person_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    skills_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'skills',
        key: 'id_skills'
      }
    },
    personality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personality',
        key: 'id_personality'
      }
    },
    hourly_rate: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    account_type: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    profile_image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'person',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "person_pkey",
        unique: true,
        fields: [
          { name: "id_person" },
        ]
      },
    ]
  });
  }
}
