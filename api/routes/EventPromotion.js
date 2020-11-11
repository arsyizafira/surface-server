const router = express.Router(),
  ep = require('../controllers/EventPromotionController');

router.get('/', ep.GetData);
router.get('/:id', ep.GetDetail);
router.put('/:id', ep.Update);
router.post('/upload/:id', ep.UploadImage);
router.post('/', ep.Add);
router.delete('/:id', ep.Delete);





module.exports = router;
