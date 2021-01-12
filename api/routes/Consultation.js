const router = express.Router(),
  Consultation = require('../controllers/ConsultationController');

router.post('/', Consultation.Proccess);




module.exports = router;
