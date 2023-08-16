import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class service_status extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_service_status: {
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
    company_confirmation: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    person_confirmation: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'service_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "service_status_pkey",
        unique: true,
        fields: [
          { name: "id_service_status" },
        ]
      },
    ]
  });
  }
}
