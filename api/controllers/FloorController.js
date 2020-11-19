const Floor = require('../models/floor');
const response = require('../../config/response')
FloorController = {
  GetData: (req, res) => {
    if (req.query.active == 1) {
      Floor.find({ is_delete: false, is_active: true })
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the Floor.', res, err)

        });
    } else {
      Floor.find({ is_delete: false })
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the Floor.', res, err)

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

      Floor.findOneAndUpdate({ _id: req.params.id }, data)
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
      let data = new Floor({
        name: name,
        is_active: is_active
      })
      data
        .save(data)
        .then(data => {
          response.ok(`adding Floor success successfully`, res)
        })
        .catch(err => {
          response.error('500', 'adding Floor failed', res, err)
        });
    }
  },
  GetDetail: async (req, res) => {
    let data = await Floor.find({ is_delete: false, _id: req.params.id })
    data = data.length === 0 ? 'floor not found' : data
    response.ok(data, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Floor.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },

}

module.exports = FloorController;

