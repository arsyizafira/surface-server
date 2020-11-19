const Category = require('../models/category');
const response = require('../../config/response')
CategoryController = {
  GetData: (req, res) => {
    if (req.query.active == 1) {
      Category.find({ is_delete: false, is_active: true })
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the Category.', res, err)

        });
    } else {
      Category.find({ is_delete: false })
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the Category.', res, err)

        });
    }
  },
  Update: (req, res) => {
    let modified_time = Date.now()
    let { name, is_active } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {

      let data = {

        is_active: is_active,
        modified_at: modified_time,
        name: name
      }

      Category.findOneAndUpdate({ _id: req.params.id }, data)
        .then(data => {
          response.ok('data update succesfully', res)
        })
        .catch(err => {
          console.log(err)
          response.error('500', 'error while updating data', res, err)
        })
    }
  },
  Add: (req, res) => {
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {
      let { name, is_active } = req.body
      let data = new Category({
        name: name,
        is_active: is_active
      })
      data
        .save(data)
        .then(data => {
          response.ok(`adding category success successfully`, res)
        })
        .catch(err => {
          response.error('500', 'adding category failed', res, err)
        });
    }
  },
  GetDetail: async (req, res) => {
    let category = await Category.find({ is_delete: false, _id: req.params.id })
    category = category.length === 0 ? 'article not found' : category
    response.ok(category, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Category.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },

}

module.exports = CategoryController;

