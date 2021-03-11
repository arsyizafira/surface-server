const Admin = require('../models/admin');
const response = require('../../config/response')
let salt = bcrypt.genSaltSync(10);

AdminController = {

  GetData: (req, res) => {
    let role = req.query.role == 'dokter' ? 'dokter' : req.query.role == 'admin' ? 'admin' : req.query.role == 'user' ? 'user' : null;
    if (role) {
      Admin.find({ is_delete: false, role })
        .then(data => {
          response.ok(data, res, `request success`)
        })
        .catch(err => {
          response.error('500', 'Some error occurred while showing the Admin.', res, err)
        });
    } else {

      response.error('400', 'missing role', res)
    }

  },
  Update: async (req, res) => {
    let modified_time = Date.now()
    let { username, nama_lengkap, role } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {
      let data = {
        nama_lengkap,
        modified_at: modified_time,
        username: username,
        role: role
      }
      Admin.findOneAndUpdate({ _id: req.params.id }, data)
        .then(data => {
          response.ok('data update succesfully', res)
        })
        .catch(err => {
          console.log(err)
          response.error('500', 'error while updating data', res, err)
        })
    }
  },
  Add: async (req, res) => {
    let check_uname = async (username) => {
      let avaible = await Admin.find({ is_delete: false, username: `${username}` })
      result = avaible.length === 0 ? true : false;
      return result
    }

    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {
      let { username, password, role, nama_lengkap } = req.body

      let check = await check_uname(username)
      if (check) {

        let hash = await bcrypt.hashSync(password, salt)

        let data = new Admin({
          password: hash,
          username,
          nama_lengkap,
          role: role
        })
        data
          .save(data)
          .then(data => {
            response.ok(`adding ${req.body.role} success successfully`, res)
          })
          .catch(err => {
            response.error('500', 'adding Admin failed', res, err)
          });
      } else {
        response.error('500', 'please use another username', res)

      }
    }
  },
  GetDetail: async (req, res) => {
    let admin = await Admin.find({ is_delete: false, _id: req.params.id })
    admin = admin.length === 0 ? 'article not found' : admin
    response.ok(admin, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Admin.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },
  Login: async (req, res) => {
    let check_uname = async (username) => {
      let avaible = await Admin.find({ is_delete: false, username: username })
      let status = avaible.length === 0 ? true : false;
      let result = {
        status: status,
        data: avaible
      }
      return result
    }
    let { username, password } = req.body
    let uname_check = await check_uname(username)
    if (uname_check.status) {
      response.success("username not found", res)
    } else {
      let passworddb = await uname_check.data[0].password
      if (password) {
        const user = {
          _id: uname_check.data[0]._id,
          username: uname_check.data[0].username,
          role: uname_check.data[0].role
        }

        bcrypt.compare(password, passworddb, (err, result) => {
          if (err) {
            response.error('500', 'try again later', res)
            console.log(err)
          } else {
            if (result) {
              const token = jwt.sign(user, 'Secret', {
                expiresIn: "24h"
              })
              response.success(` Login successfully `, res, token)
            } else {
              response.success(' wrong password', res)
            }
          }
        })
      } else {
        response.success('password not submited', res)

      }
    }

  }

}

module.exports = AdminController;

