import initModels from "../models/init-models.js";
import { sequelize } from "../database/connection.js";
let models = initModels(sequelize);

export const getUsers = async (req, res) =>{
    let response;
    try{
        response = await models.person.findAll( {
            order: [['id_person', 'ASC']],
            include:[
            {
                model: models.skills,
                as: "skill",
                attributes:{ exclude: ['id_skills']}
            },
            {
                model: models.personality,
                as: "personality",
                attributes:{ exclude: ['id_personality']}
            }
            ]
        });
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar los usuarios inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

export const getUserById = async (req, res) => {
    let response;
    let {id} = req.params;
    try{
        response = await models.person.findOne({
            include:[
                {
                    model: models.skills,
                    as: "skill",
                    attributes:{ exclude: ['id_skills']}
                },
                {
                    model: models.personality,
                    as: "personality",
                    attributes:{ exclude: ['id_personality']}
                }
                ],
            where: {
                id_person: id,
            },
          }
          )
    }catch(error){
        console.log(error);
        res.status(500).json({"message":"Error en el servidor, no pudimos recuperar el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

export const updateUser = async (req, res) =>{
    let response;
    let {id} = req.params;
    try{
        response = await models.person.update(req.body,
            {
                where:
                {
                    id_person:id,
                }
            }
            )
    }catch(error){
        console.log(error);
        res.status(500).json({"message":"Error en el servidor, no pudimos actualizar el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

export const createUser = async (req,res) => {
    let {person_name, skills_id, personality_id, hourly_rate, account_type = "user", created_at = new Date(), updated_at = new Date()} = req.body;
    let response = null;
    try{
        response = await models.person.create(req.body)
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos crear el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}

export const deleteUser = async (req,res) => {
    let response;
    let {id} = req.params;

    try{
        response = await models.person.destroy(
            {
                where:
                {
                    id_person: id,
                }
            })
    }catch(error){
        res.status(500).json({"message":"Error en el servidor, no pudimos eliminar el usuario inténtalo mas tarde"});
    }
    res.status(200).json(response);
}
