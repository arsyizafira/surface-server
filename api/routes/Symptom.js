const router = express.Router(),
  Sympton = require('../controllers/SymptomController');

router.get('/', Sympton.GetData);
router.get('/:id', Sympton.GetDetail);
router.put('/:id', Sympton.Update);
router.post('/', Sympton.Add);
router.delete('/:id', Sympton.Delete);


// router.delete('/:id', Sympton.Delete);





module.exports = router;
