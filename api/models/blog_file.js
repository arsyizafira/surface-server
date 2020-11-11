let Schema = mongoose.Schema;


let blog_file_schema = new Schema({
  path: {
    type: String,
    default: null
  },
  uuid: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event_promotion',
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

let blog_file = mongoose.model("blog_file", blog_file_schema);

module.exports = blog_file;

