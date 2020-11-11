const Admin = require('../models/admin');
const response = require('../../config/response')
const Tenant = require('../models/tenant');
const Event = require('../models/eventpromotion');
const Blog = require('../models/blog');
const Category = require('../models/category');


DashboardController = {

  GetData: async (req, res) => {
    let Event_data = await Event.find({ is_delete: false }).sort({ created_at: -1 })
    let tenant_data = await Tenant.find({ is_delete: false }).populate('category_id').sort({ created_at: -1 })
    let Blog_data = await Blog.find({ is_delete: false }).sort({ created_at: -1 })
    let Category_data = await Category.find({ is_delete: false }).sort({ created_at: -1 })

    let data = {
      event: {
        total: Event_data.length,
        data: Event_data.slice(0, 5)
      },
      tenant: {
        total: tenant_data.length,
        data: tenant_data.slice(0, 5)
      },
      blog: {
        total: Blog_data.length,
        data: Blog_data.slice(0, 5)
      },
      category: {
        total: Category_data.length,
        data: Category_data.slice(0, 5)
      }
    }

    response.ok(data, res, `request success`)

    // Admin.find({ is_delete: false })
    //   .then(data => {
    // response.ok(data, res, `request success`)
    //   })
    //   .catch(err => {
    //     response.error('500', 'Some error occurred while showing the Admin.', res, err)

    //   });
  },




}

module.exports = DashboardController;

