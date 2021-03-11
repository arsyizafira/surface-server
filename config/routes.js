module.exports = function (app) {



  let Dashboard = require('../api/routes/Dashboard');
  app.use('/dashboard', Dashboard);



  let admin = require('../api/routes/Admin');
  app.use('/api/admin', admin);
  let Symptom = require('../api/routes/Symptom');
  app.use('/api/symptom', Symptom);
  let Disease = require('../api/routes/Disease');
  app.use('/api/disease', Disease);
  let Rule = require('../api/routes/Rule');
  app.use('/api/rule', Rule);
  let Diagnosa = require('../api/routes/Diagnosa');
  app.use('/api/diagnosa', Diagnosa);
  let Consultation = require('../api/routes/Consultation');
  app.use('/api/consultation', Consultation);

}
