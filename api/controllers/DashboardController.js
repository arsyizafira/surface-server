const Admin = require('../models/admin');
const Disease = require('../models/disease');
const Symptom = require('../models/symptom');
const Rule = require('../models/rule');


DashboardController = {

  GetData: async (req, res) => {
    try {
      let Dokter_data = await Admin.find({ is_delete: false, role: 'dokter' })
      let Rule_data = await Rule.find({ is_delete: false })
      let Disease_data = await Disease.find({ is_delete: false })
      let Symptom_data = await Symptom.find({ is_delete: false })
      let data = {
        dokter: {
          total: Dokter_data.length,
        },
        rule: {
          total: Rule_data.length,
        },
        penyakit: {
          total: Disease_data.length,
        },
        gejala: {
          total: Symptom_data.length,
        }
      }

      response.ok(data, res, `request success`)

    } catch (error) {
      console.log(error)
      response.error('500', 'error when get dashboard data', res)

    }

  },




}

module.exports = DashboardController;

