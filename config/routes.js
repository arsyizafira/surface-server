module.exports = function (app) {


  let Category = require('../api/routes/Category');
  app.use('/category', Category);
  let Dashboard = require('../api/routes/Dashboard');
  app.use('/dashboard', Dashboard);
  let EP = require('../api/routes/EventPromotion');
  app.use('/event', EP);
  let Floor = require('../api/routes/Floor');
  app.use('/floor', Floor);
  let Tenant = require('../api/routes/Tenant');
  app.use('/tenant', Tenant);
  let Blog = require('../api/routes/Blog');
  app.use('/blog', Blog);
  let admin = require('../api/routes/admin');
  app.use('/admin', admin);

}
