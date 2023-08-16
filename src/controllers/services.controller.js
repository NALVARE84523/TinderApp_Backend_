import initModels from "../models/init-models.js";
import { sequelize } from "../database/connection.js";


let models = initModels(sequelize);

export const getServices = async (req, res) => {
    let response;
    try{
        response = await models.services.findAll({
            order:[[ 'id_services', 'ASC' ]],
            exclude: ['createdAt', 'updatedAt']
        })
    }catch(error){
        console.error(error);
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar los servicios inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

export const getServiceById = async (req,res) =>{
    let response;
    let {id} = req.params;

    try{
        response = await models.services.findOne({
            where: {id_services: id},
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servido, no pudimos recuperar el servicio solicitado"})
    }
    res.status(200).json(response);
}

export const updateService = async (req, res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.services.update(req.body, {
            where: {id_services: id}
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos actualizar el servicio solicitado solicitada"})
    }
    res.status(200).json(response);
};

export const createService = async (req, res) =>{
    let response;
    let response_person;
    let id_person;
    let person_hourly_rate;
    let response_company;
    let company;

    const workStartDate = Date(req.body.set_date);
    let setWorkStartDate = new Date(workStartDate);
    let retrieveWorkHour = setWorkStartDate.getHours();
    let setWorkDuration = Number(req.body.work_duration);
    let workDuration = retrieveWorkHour + setWorkDuration;
    let ServiceEnd = setWorkStartDate.setHours(workDuration);

    let service_id = 1;


    try{
        response_person = await models.person.findByPk(req.body.person_id);
        person_hourly_rate = response_person.dataValues.hourly_rate;
        id_person = parseInt(response_person.dataValues.id_person);
        
        console.log("Valor de persona precio hora", person_hourly_rate);

        response_company = await models.company.findByPk(req.body.company_id);
        console.log("id Encontrado ", response_company);
        company = response_company.dataValues.id_company;

        response = await models.services.create({
            person_id: id_person,
            company_id: company,
            service_description: req.body.service_description,
            rate_hour: person_hourly_rate,
            work_duration: req.body.work_duration,
            work_start_date: workStartDate,
            work_end_date: ServiceEnd,
            work_status: service_id,
            calification: 0,
        })
    }catch(error){
        console.error(error);
        res.status(500).json({"message": "Error en el servidor, no pudimos crear el servicio inténtalo mas tarde"})
    }
    res.status(200).json(response);
}