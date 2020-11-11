const router = express.Router(),
  Tenant = require('../controllers/TenantController');

router.get('/', Tenant.GetData);
router.get('/:id', Tenant.GetDetail);
router.put('/:id', Tenant.Update);
router.post('/upload/:id', Tenant.UploadImage);

router.post('/', Tenant.Add);
router.delete('/:id', Tenant.Delete);





module.exports = router;
