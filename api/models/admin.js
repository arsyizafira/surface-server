let Schema = mongoose.Schema;

let admin_schema = new Schema({
  username: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  last_login: {
    type: Date,
    default: null
  },
  role: {
    type: String,
    default: null
  },


  /* config */
  created_at: {
    type: Date,
    default: Date.now
  },
  modified_at: {
    type: Date,
    default: null
  },
  is_delete: {
    type: Boolean,
    default: false
  }
});

let admin = mongoose.model("admin", admin_schema);

module.exports = admin;
