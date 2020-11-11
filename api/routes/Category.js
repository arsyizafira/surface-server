const router = express.Router(),
    category = require('../controllers/CategoryController');

router.get('/', category.GetData);
router.get('/:id', category.GetDetail);
router.put('/:id', category.Update);
router.post('/', category.Add);
router.delete('/:id', category.Delete);





module.exports = router;
