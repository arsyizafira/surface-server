const router = express.Router(),
  disease = require('../controllers/DiseaseController');

router.get('/', disease.GetData);
router.get('/:id', disease.GetDetail);
router.put('/:id', disease.Update);
router.post('/', disease.Add);
// router.post('/login', disease.Login);

// router.delete('/:id', admin.Delete);





module.exports = router;
