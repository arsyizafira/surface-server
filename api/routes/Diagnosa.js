const router = express.Router(),
  Diagnosa = require('../controllers/DiagnosaController');

router.get('/', Diagnosa.GetData);
router.post('/', Diagnosa.Add);

router.delete('/:id', Diagnosa.Delete);




module.exports = router;
