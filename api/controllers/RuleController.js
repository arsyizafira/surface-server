const Rule = require('../models/rule');

RuleController = {
  GetData: (req, res) => {

    Rule.find({ is_delete: false }).populate('gejala').populate('id_penyakit')
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        response.error('500', 'Some error occurred while showing the symptoms.', res, err)
      });
  },
  Update: (req, res) => {
    let modified_time = Date.now()
    let { id_penyakit, gejala } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {

      let data = {
        id_penyakit,
        gejala,
        modified_at: modified_time,
      }

      Rule.findOneAndUpdate({ _id: req.params.id }, data)
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
      let { id_penyakit, gejala } = req.body
      let data = new Rule({
        id_penyakit,
        gejala
      })
      data
        .save(data)
        .then(data => {
          response.ok(`adding Rule  successfully`, res)
        })
        .catch(err => {
          response.error('500', 'adding Rule failed', res, err)
        });
    }
  },
  GetDetail: async (req, res) => {
    let data = await Rule.find({ is_delete: false, _id: req.params.id }).populate('gejala').populate('id_penyakit')
    data = data.length === 0 ? 'Rule not found' : data
    response.ok(data, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Rule.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },

}

module.exports = RuleController;

