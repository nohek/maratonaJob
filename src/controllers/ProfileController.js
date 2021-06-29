const Profile = require("../model/Profile");

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },

  async update(req, res) {
    //req body pra pegar os dados
    const data = req.body;
    //quantas semanas tem um ano
    const weeksPerYear = 52;
    //quantas semanas vai trabalhar por mes tirando as ferias anuais
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    //total de horas trabalhadas na semana
    const weekTotalHours = data["days-per-week"] * data["hours-per-day"];
    //horas trabalhadas no mes
    const monthTotalHours = weekTotalHours * weeksPerMonth;
    //valor da hora
    const valueHour = data["monthly-budget"] / monthTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
