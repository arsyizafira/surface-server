const Blog = require('../models/blog');
const Blog_file = require('../models/blog_file');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const response = require('../../config/response')
BlogController = {
  GetData: (req, res) => {
    Blog.find({ is_delete: false })
      .then(data => {
        response.ok(data, res, `request success`)
      })
      .catch(err => {
        response.error('500', 'Some error occurred while showing the Floor.', res, err)

      });
  },
  Update: (req, res) => {
    let modified_time = Date.now()
    let { title, content } = req.body
    if (Object.entries(req.body).length === 0) {
      response.error('400', 'body cant blank', res)
    } else {

      let data = {
        title: title,
        content: content,

        modified_at: modified_time
      }

      Blog.findOneAndUpdate({ _id: req.params.id }, data)
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
      let { title, content } = req.body
      let data = new Blog({
        title: title,
        content: content,

      })
      data
        .save(data)
        .then(data => {
          response.ok(`adding blog success successfully`, res, data._id)
        })
        .catch(err => {
          response.error('500', 'adding Floor failed', res, err)
        });
    }
  },
  GetDetail: async (req, res) => {
    // let data = await Blog.find({ is_delete: false, _id: req.params.id })
    // data = data.length === 0 ? 'blog not found' : data
    // response.ok(data, res)
    let data = await Blog.aggregate([
      { $match: { is_delete: false, _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'blog_files',
          localField: "_id",
          foreignField: "blog_id",
          as: "image"
        }
      }])

    response.ok(data, res)

  },
  Delete: (req, res) => {
    let data = {
      is_delete: true
    }
    Blog.findOneAndUpdate({ _id: req.params.id }, data)
      .then(data => {
        response.ok('delete data succesfully', res)
      })
      .catch(err => {
        console.log(err)
        response.error('500', 'error while deleting data', res, err)
      })
  },
  UploadImage: async (req, res) => {
    let blog_id = req.params.id
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'files/blog')
      },
      filename: function (req, file, cb) {
        filename = file.originalname.replace(/\s/g, "-")
        cb(null, blog_id + path.extname(file.originalname))
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
                let path = `blog_img/${req.files[i].filename}`
                let type = req.files[i].mimetype
                let size = req.files[i].size / 1024
                let uuid = uuidv4()
                let avaible = await Blog_file.find({ is_delete: false, blog_id: req.body.blog_id ? req.body.blog_id : blog_id })
                status = avaible.length === 0 ? true : false;
                if (status) {
                  let blog_file = new Blog_file({
                    path: path,
                    type: type,
                    uuid: uuid,
                    size: size,
                    blog_id: req.body.blog_id ? req.body.blog_id : blog_id
                  })
                  try {
                    success = await blog_file.save(blog_file).then(data => success = true)

                  } catch (err) {
                    console.log(err)

                  }
                } else {

                  let data = new Blog_file({
                    path: path,
                    type: type,
                    uuid: uuid,
                    size: size,
                    blog_id: blog_id
                  })
                  try {
                    success = await data.save(data).then(data => success = true)

                  } catch (err) {
                    console.log(err)

                  }
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

module.exports = BlogController;

