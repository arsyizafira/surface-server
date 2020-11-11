const Tenant = require('../models/tenant');
const Tenant_file = require('../models/tenant_file');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const response = require('../../config/response')
TenantController = {
  GetData: (req, res) => {
    Tenant.find({ is_delete: false })
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        response.error('500', 'Some error occurred while showing the Floor.', res, err)

      });
  },
  Update: (req, res) => {
    let modified_time = Date.now()
    let { name, category_id, floor_id, is_active } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {

      let data = {
        is_active: is_active,
        modified_at: modified_time,
        name: name,
        category_id: category_id,
        floor_id: floor_id
      }

      Tenant.findOneAndUpdate({ _id: req.params.id }, data)
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
      let { name, category_id, floor_id, is_active } = req.body
      let data = new Tenant({
        name: name,
        is_active: is_active,
        category_id: category_id,
        floor_id: floor_id
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
    let data = await Tenant.find({ is_delete: false, _id: req.params.id })
    data = data.length === 0 ? 'Tenant not found' : data
    response.ok(data, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Tenant.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },
  UploadImage: async (req, res) => {
    let tenant_id = req.params.id
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'files/tenant')
      },
      filename: function (req, file, cb) {
        filename = file.originalname.replace(/\s/g, "-")
        cb(null, tenant_id + '_' + filename)
      }
    })
    let fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
      } else {
        cb(new Error('file format not supported'), false)
      }
    }

    let upload = multer({
      storage: storage,
      limits: {
        fileSize: 5 * 1024 * 1024
      },
      fileFilter: fileFilter
    })
    let Upfile = upload.array('file')
    let upload_status = new Promise(
      function (resolve, reject) {
        Upfile(req, res, async function (err) {

          success = false

          if (err) {
            success = false
            console.log(err)
          } else {
            if (req.files) {
              // console.log('masuk')
              for (let i = 0; i < req.files.length; i++) {
                let path = `tenant_img/${req.files[i].filename}`
                let type = req.files[i].mimetype
                let size = req.files[i].size / 1024
                let uuid = uuidv4()
                let tenant_img = new Tenant_file({
                  path: path,
                  type: type,
                  uuid: uuid,
                  size: size,
                  tenant_id: tenant_id
                })
                try {
                  success = await tenant_img.save(tenant_img).then(data => success = true)

                } catch (err) {
                  console.log(err)

                }
              }
            } else {
              console.log('gada ')
              success = false
            }
          }
          resolve(success)

        })
      }
    );

    // console.log(await upload_status)
    if (await upload_status) {
      response.ok('upload success', res, `request success`)
    } else {
      response.error('500', 'Some error occurred while Upload.', res)
    }
  },



}

module.exports = TenantController;

