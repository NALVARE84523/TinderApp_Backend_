import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class company extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_company: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    account_type: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    company_logo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'company',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "company_pkey",
        unique: true,
        fields: [
          { name: "id_company" },
        ]
      },
    ]
  });
  }
}
