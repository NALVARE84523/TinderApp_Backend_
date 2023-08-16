import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class payments extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_payment: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id_services'
      }
    },
    advance_payment: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    service_total: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payments_pkey",
        unique: true,
        fields: [
          { name: "id_payment" },
        ]
      },
    ]
  });
  }
}
