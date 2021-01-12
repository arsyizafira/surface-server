const router = express.Router(),
  Rule = require('../controllers/RuleController');

router.get('/', Rule.GetData);
router.get('/:id', Rule.GetDetail);
router.put('/:id', Rule.Update);
router.post('/', Rule.Add);
router.delete('/:id', Rule.Delete);




module.exports = router;
