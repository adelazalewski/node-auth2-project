const db = require("../data/data-config")

async function add(user) {
    const [id] = await db("users").insert(user)
return findById(id)
}

function find() {
    return db("users").select("id","username", "department")
}

function findById(id) {
    return db("users").where("id", id).first("id", "username", "department")
}

function findByUsername(username) {
    return db("users").where("username", username).first("id", "username", "password", "department")
}

function findByDepartment(department) {
    return db("users").where("department", department).first("id", "username", "password", "department")
}

module.exports = {
    find,
    findById,
    findByUsername,
    add,
    findByDepartment
}