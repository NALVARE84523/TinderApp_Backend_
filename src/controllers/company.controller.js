import initModels from "../models/init-models.js";
import { sequelize } from "../database/connection.js";


let models = initModels(sequelize);

export const getCompanies = async (req, res) => {
    let response;
    try{
        response = await models.company.findAll({
            order:[[ 'id_company', 'ASC' ]],
            exclude: ['createdAt', 'updatedAt']
        })
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar las empresas inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

export const getCompanyById = async (req,res) =>{
    let response;
    let {id} = req.params;

    try{
        response = await models.company.findOne({
            where: {id_company: id},
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servido, no pudimos recuperar la compañía solicitada"})
    }
    res.status(200).json(response);
}

export const updateCompany = async (req, res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.company.update(req.body, {
            where: {id_company: id}
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos actualizar la compañía solicitada"})
    }
    res.status(200).json(response);
};

export const createCompany = async (req, res) =>{
    let response;
    let {company_name, account_type, company_logo } = req.body;

    try{
        response = await models.company.create(req.body)
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos crear la compañía inténtalo mas tarde"})
    }
    res.status(200).json(response);
}

export const deleteCompany = async (req, res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.company.destroy({
            where: {id_company: id}
        })
    }catch(error){
        res.status(500).json({"message": "Error en el servidor, no pudimos eliminar la compañía solicitada"})
    }
    res.status(200).json(response);
}
