import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _califications from  "./califications.js";
import _company from  "./company.js";
import _payments from  "./payments.js";
import _person from  "./person.js";
import _personality from  "./personality.js";
import _service_status from  "./service_status.js";
import _services from  "./services.js";
import _skills from  "./skills.js";

export default function initModels(sequelize) {
  const califications = _califications.init(sequelize, DataTypes);
  const company = _company.init(sequelize, DataTypes);
  const payments = _payments.init(sequelize, DataTypes);
  const person = _person.init(sequelize, DataTypes);
  const personality = _personality.init(sequelize, DataTypes);
  const service_status = _service_status.init(sequelize, DataTypes);
  const services = _services.init(sequelize, DataTypes);
  const skills = _skills.init(sequelize, DataTypes);

  services.belongsTo(califications, { as: "calification_calification", foreignKey: "calification"});
  califications.hasMany(services, { as: "services", foreignKey: "calification"});
  services.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(services, { as: "services", foreignKey: "company_id"});
  services.belongsTo(person, { as: "person", foreignKey: "person_id"});
  person.hasMany(services, { as: "services", foreignKey: "person_id"});
  person.belongsTo(personality, { as: "personality", foreignKey: "personality_id"});
  personality.hasMany(person, { as: "people", foreignKey: "personality_id"});
  services.belongsTo(service_status, { as: "work_status_service_status", foreignKey: "work_status"});
  service_status.hasMany(services, { as: "services", foreignKey: "work_status"});
  payments.belongsTo(services, { as: "service", foreignKey: "service_id"});
  services.hasMany(payments, { as: "payments", foreignKey: "service_id"});
  person.belongsTo(skills, { as: "skill", foreignKey: "skills_id"});
  skills.hasMany(person, { as: "people", foreignKey: "skills_id"});

  return {
    califications,
    company,
    payments,
    person,
    personality,
    service_status,
    services,
    skills,
  };
}
