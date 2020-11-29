module.exports.port = process.env.PORT || 3101;
module.exports.host = process.env.HOST || "d02--";
const db1 = "mongodb://localhost:27018/db01"
module.exports.dbUrl = process.env.MONGO_URL || db1;
//module.exports.dbUrl = "mongodb://localhost:27018/db01";
//module.exports.dbUrl = "mongodb://localhost:27017/db01";
