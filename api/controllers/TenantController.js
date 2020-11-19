const Tenant = require('../models/tenant');
const Tenant_file = require('../models/tenant_file');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const response = require('../../config/response')
var mongoose = require('mongoose');
const tenant_file = require('../models/tenant_file');

TenantController = {
  GetData: (req, res) => {
    Tenant.aggregate([
      {
        $match: { is_delete: false }
      },
      {
        $lookup: {
          from: 'tenant_files',
          localField: "_id",
          foreignField: "tenant_id",
          as: "image"
        }
      },
      {
        $lookup: {
          from: 'floors',
          localField: "floor_id",
          foreignField: "_id",
          as: "floor_id"
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: "category_id",
          foreignField: "_id",
          as: "category_id"
        }
      },

    ])
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        console.log(err)
      })
    // Tenant.find({ is_delete: false })
    //   .populate('category_id')
    //   .populate('floor_id')
    //   .then(data => {
    //     response.ok(data, res, `request success`)
    //   })
    //   .catch(err => {
    //     response.error('500', 'Some error occurred while showing the Floor.', res, err)
    //   });
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
          response.ok(`adding Floor success successfully`, res, data._id)
        })
        .catch(err => {
          response.error('500', 'adding Floor failed', res, err)
        });
    }
  },
  GetDetail: async (req, res) => {
    // let data = await Tenant.find({ is_delete: false, _id: req.params.id })
    // data = data.length === 0 ? 'Tenant not found' : data
    // response.ok(data, res)
    console.log(req.params.id)
    Tenant.aggregate([
      { $match: { is_delete: false, _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'tenant_files',
          localField: "_id",
          foreignField: "tenant_id",
          as: "image"
        }
      },
      {
        $lookup: {
          from: 'floors',
          localField: "floor_id",
          foreignField: "_id",
          as: "floor_id"
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: "category_id",
          foreignField: "_id",
          as: "category_id"
        }
      },

    ])
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        console.log(err)
      })
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
        filename = file.originalname.split('.').pop()
        cb(null, tenant_id + '.' + filename)
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
              for (let i = 0; i < req.files.length; i++) {
                let path = `tenant_img/${req.files[i].filename}`
                let type = req.files[i].mimetype
                let size = req.files[i].size / 1024
                let uuid = uuidv4()
                let avaible = await Tenant_file.find({ is_delete: false, tenant_id: tenant_id })
                status = avaible.length === 0 ? true : false;
                if (status) {
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
                } else {
                  modified_time = Date.now()
                  let data = {
                    modified_at: modified_time,
                    path: path,
                    type: type,
                    uuid: uuid,
                    size: size,
                  }
                  success = await Tenant_file.findOneAndUpdate({ _id: avaible[0]._id }, data).then(data => success = true)


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

