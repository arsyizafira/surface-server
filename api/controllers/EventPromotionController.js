const Event = require('../models/eventpromotion');
const Event_file = require('../models/eventpromotion_file');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const response = require('../../config/response')
TenantController = {
  GetData: (req, res) => {
    Event.find({ is_delete: false })
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        response.error('500', 'Some error occurred while showing the Floor.', res, err)

      });
  },
  Update: (req, res) => {
    let modified_time = Date.now()
    let { title, content, start_date, end_date } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {

      let data = {
        title: title,
        content: content,
        start_date: start_date,
        end_date: end_date,
        modified_at: modified_time
      }

      Event.findOneAndUpdate({ _id: req.params.id }, data)
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
      let { title, content, start_date, end_date } = req.body
      let data = new Event({
        title: title,
        content: content,
        start_date: start_date,
        end_date: end_date
      })
      data
        .save(data)
        .then(data => {
          response.ok(`adding event success successfully`, res)
        })
        .catch(err => {
          response.error('500', 'adding Floor failed', res, err)
        });
    }
  },
  GetDetail: async (req, res) => {
    let data = await Event.find({ is_delete: false, _id: req.params.id })
    data = data.length === 0 ? 'Event not found' : data
    response.ok(data, res)
  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Event.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },
  UploadImage: async (req, res) => {
    let event_id = req.params.id
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'files/event')
      },
      filename: function (req, file, cb) {
        filename = file.originalname.replace(/\s/g, "-")
        cb(null, event_id + path.extname(file.originalname))
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
                let tenant_img = new Event_file({
                  path: path,
                  type: type,
                  uuid: uuid,
                  size: size,
                  event_id: event_id
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

