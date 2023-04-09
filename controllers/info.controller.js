const db = require("../models/index");
const paginate = require("../utils/paginate");

const Model = db.Model;
const { Op} = require('sequelize');


exports.findAll = (req, res) => {
    const {page, size, search, sort, order} = req.query;
    const fullQuery = {};

    keys = [];
    for(let key in Model.rawAttributes){
        keys.push(key);
    }

    if (sort && keys.includes(sort) && order){
        let sortQuery;
        console.log(order)
        if(order === "asc" || order === "ASC"){
            sortQuery = [[sort, 'ASC']]
        } else if (order === "desc" || order === "DESC") {
            sortQuery = [[sort, 'DESC']]
        }
        console.log(sortQuery);
        fullQuery.order = sortQuery;
    } 

    // if(sort && (keys.includes(sort.slice(1)) || keys.includes(sort)) ){
    //     let sortQuery;
    //     if(sort.charAt(0) !== '-'){
    //         sortQuery = [[sort, 'ASC']]
    //     } else {
    //         sortQuery = [[sort.slice(1), 'DESC']]
    //     }
    //     console.log(sortQuery)
    //     fullQuery.order = sortQuery;
    // }

    
    if (search) {
        let searchQuery = {[Op.or] : [
        {barCode: { [Op.like]: `%${search}%`}},
        {manufacturer: { [Op.like]: `%${search}%`}},
        {modelNumber: { [Op.like]: `%${search}%`}},
        {building: { [Op.like]: `%${search}%`}},
        {roomNo: { [Op.like]: `%${search}%`}},
        {quantity: { [Op.like]: `%${search}%`}}
        ]}

        fullQuery.where = searchQuery;
    }

    const {limit, offset} = paginate.getPagination (page, size);

    fullQuery.limit = limit;
    fullQuery.offset = offset;

    Model.findAndCountAll(fullQuery)
    .then(data => {
        const response = paginate.getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An Error Occurred"
        });
    })
}

exports.addModel = async function addModel(){
    for (let i = 0 ; i < 7 ; i++){
        await Model.create({
        barCode : "A66-999",
        manufacturer : "ATrane",
        modelNumber : "BAMCC-A110",
        building : "AAWest",
        roomNo : "AA7A-551",
        quantity : 4
    })
    }
}