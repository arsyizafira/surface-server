const router = express.Router(),
  Blog = require('../controllers/BlogController');

router.get('/', Blog.GetData);
router.get('/:id', Blog.GetDetail);
router.put('/:id', Blog.Update);
router.post('/upload/:id', Blog.UploadImage);

router.post('/', Blog.Add);
router.delete('/:id', Blog.Delete);





module.exports = router;
