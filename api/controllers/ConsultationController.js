let Diagnosa = require('./DiagnosaController');
const Rule = require('../models/rule');
const Disease = require('../models/disease');



ConsultationController = {
  Proccess: async (req, res) => {
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {

      let { id_pengguna, gejala } = req.body
      let get_disease = await Rule.find({ is_delete: false }).exec()
      let check1 = get_disease.map(el => {
        if (el.gejala.length == gejala.length) {
          return el
        }
      })
      let filter = check1.filter(el => el != undefined)

      let getDisease = filter.map(el => {
        let el_gejala = el.gejala.map(e => e)
        let val = gejala.slice().sort().every((value, index) => value == el_gejala.slice().sort()[index])
        if (val) {
          return el
        }
        el_gejala = []
      })
      // console.log(getDisease[0].gejala)
      // console.log(gejala)

      let filter2 = getDisease.filter(el => el != undefined)
      if (filter2.length == 0) {
        //gak ada nih
        response.ok(null, res)
      } else {
        //ada nih penyakitnya
        let res_data = filter2.map(async el => {
          try {
            let get_disease = await Disease.findOne({ _id: el.id_penyakit, is_delete: false }).exec()
            let save_diagnosa = await Diagnosa.Add(el.id_penyakit, id_pengguna)
            if (get_disease && save_diagnosa) {
              return get_disease
            }
          } catch (error) {
            console.log(error)
          }
        })

        let res_data_set = await Promise.all(res_data)
        let filterd_res_data = res_data_set.find(el => el !== undefined)
        response.ok(filterd_res_data, res, 'request success')

      }
    }
  },



}

module.exports = ConsultationController;


