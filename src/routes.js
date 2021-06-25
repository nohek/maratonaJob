const express = require("express"); //biblioteca pra criar o servidor
const routes = express.Router(); //parte do express que vai criar os caminhos
const views = __dirname + "/views/"; //caminho base

const Profile = {
  data: {
    name: "Francyelle",
    avatar: "https://i.pinimg.com/564x/25/36/64/25366446f10f502d7e410738ebdabd57.jpg",
    "monthly-budget": 3500,
    "hours-per-day": 6,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
  },

  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data });
    },

    update(req, res) {
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

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour,
      };

      return res.redirect("/profile");
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Formassa",
      "daily-hours": 5,
      "total-hours": 15,
      criatedAt: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3.5,
      "total-hours": 40,
      criatedAt: Date.now(),
    },
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";

        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
        };
      });

      return res.render(views + "index", { jobs: updatedJobs });
    },

    save(req, res) {
      const job = req.body;
      const lastId = Job.data[Job.data.length - 1]?.id || 1;

      job.createdAt = Date.now();

      Job.data.push({
        //push job
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        criatedAt: Date.now(),
      });
      return res.redirect("/");
    },

    create(req, res) {
      return res.render(views + "job");
    },

    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("Job not found");
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"]);

      return res.render(views + "job-edit", { job });
    },
  },

  services: {
    remainingDays(job) {
      const remainingDaysInitial = (job["total-hours"] / job["daily-hours"]).toFixed();

      const createdDate = new Date(job.criatedAt);
      const dueDay = createdDate.getDate() + Number(remainingDaysInitial);
      const dueDateInMs = createdDate.setDate(dueDay);

      const timeDifferenceInMS = dueDateInMs - Date.now();

      const dayInMs = 1000 * 60 * 60 * 24;

      const dayDifference = Math.floor(timeDifferenceInMS / dayInMs);

      //restam x dias
      return dayDifference;
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"],
  },
};

routes.get("/", Job.controllers.index);
routes.get("/job", Job.controllers.create);
routes.post("/job", Job.controllers.save);

routes.get("/job/:id", Job.controllers.show);
routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

module.exports = routes;
