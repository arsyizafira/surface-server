const Symptom = require('../models/symptom');

SymptomController = {
  GetData: (req, res) => {
    Symptom.find({ is_delete: false })
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        response.error('500', 'Some error occurred while showing the symptoms.', res, err)
      });
  },
  Update: async (req, res) => {
    let modified_time = Date.now()
    let { kode, nama } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {
      let data = {
        kode,
        nama,

        modified_at: modified_time,
      }

      Symptom.findOneAndUpdate({ _id: req.params.id }, data)
        .then(data => {
          response.ok('data update succesfully', res)
        })
        .catch(err => {
          console.log(err)
          response.error('500', 'error while updating data', res, err)
        })
      // } else {
      //   response.error('400', 'kode sudah digunakan di penyakit lain', res)

      // }

    }
  },
  Add: async (req, res) => {
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {
      let check_data = async (kode) => {
        let avaible = await Symptom.find({ is_delete: false, kode: `${kode}` })
        result = avaible.length === 0 ? true : false;
        return result
      }
      let { kode, nama } = req.body
      let valid = await check_data(kode)

      if (valid) {
        let data = new Symptom({
          kode,
          nama

        })
        data
          .save(data)
          .then(data => {
            response.ok(`adding Symptom success successfully`, res)
          })
          .catch(err => {
            response.error('500', 'adding Symptom failed', res, err)
          });
      } else {
        response.error('400', 'kode sudah digunakan di penyakit lain', res)

      }


    }
  },
  GetDetail: async (req, res) => {
    let data = await Symptom.find({ is_delete: false, _id: req.params.id })
    data = data.length === 0 ? 'Symptom not found' : data
    response.ok(data, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Symptom.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },

}

module.exports = SymptomController;

