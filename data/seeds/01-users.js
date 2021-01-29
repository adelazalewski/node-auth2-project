const hashedPassword = "jkdbaskfbsdjhfb"
exports.seed =async function(knex) {
  await knex("users").insert([
    { id: 3, username: "janedoe", password: hashedPassword, department: "cleaning" },
		{ id: 4, username: "johndoe", password: hashedPassword, department: "food processing" },
  ])
};
