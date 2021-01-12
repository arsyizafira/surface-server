const router = express.Router(),
  disease = require('../controllers/DiseaseController');

router.get('/', disease.GetData);
router.get('/:id', disease.GetDetail);
router.put('/:id', disease.Update);
router.post('/', disease.Add);
router.delete('/:id', disease.Delete);

// router.post('/login', disease.Login);






module.exports = router;
