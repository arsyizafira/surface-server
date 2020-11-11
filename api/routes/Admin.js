const router = express.Router(),
  admin = require('../controllers/AdminController');

router.get('/', admin.GetData);
router.get('/:id', admin.GetDetail);
router.put('/:id', admin.Update);
router.post('/', admin.Add);
router.post('/login', admin.Login);

router.delete('/:id', admin.Delete);





module.exports = router;
