module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define('Info', {
        barCode:{type: DataTypes.STRING },
        manufacturer : {type: DataTypes.STRING}, 
        modelNumber: {type: DataTypes.STRING},
        building: {type: DataTypes.STRING}, 
        roomNo: {type: DataTypes.STRING},
        quantity: {type : DataTypes.STRING}
    });

    return Info;
}

