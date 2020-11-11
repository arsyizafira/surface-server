const router = express.Router(),
  Dashboard = require('../controllers/DashboardController');

router.get('/', Dashboard.GetData);





module.exports = router;
