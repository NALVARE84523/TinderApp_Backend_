import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class califications extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_calification: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calification: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'califications',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "califications_pkey",
        unique: true,
        fields: [
          { name: "id_calification" },
        ]
      },
    ]
  });
  }
}
