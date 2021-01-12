const Diagnosa = require('../models/Diagnosa');

DiagnosaController = {
  GetData: (req, res) => {
    if (req.query.user_id) {
      Diagnosa.find({ is_delete: false, id_pengguna: req.query.user_id }).populate('id_penyakit').populate('id_pengguna')
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the symptoms.', res, err)
        });
    } else {
      Diagnosa.find({ is_delete: false }).populate('id_penyakit').populate('id_pengguna')
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the symptoms.', res, err)
        });
    }


  },

  Add: async (id_penyakit, id_pengguna) => {

    let data = new Diagnosa({
      id_pengguna: id_pengguna,
      id_penyakit: id_penyakit
    })
    let save = await data.save(data)
    if (save) return true
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Diagnosa.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        console.log(data)
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },

}

module.exports = DiagnosaController;

