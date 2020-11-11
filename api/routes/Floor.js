const router = express.Router(),
  Floor = require('../controllers/FloorController');

router.get('/', Floor.GetData);
router.get('/:id', Floor.GetDetail);
router.put('/:id', Floor.Update);
router.post('/', Floor.Add);
router.delete('/:id', Floor.Delete);





module.exports = router;
