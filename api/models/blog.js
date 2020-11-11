let Schema = mongoose.Schema;

let blog_schema = new Schema({
  title: {
    type: String,
    default: null
  },
  content: {
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

let blog = mongoose.model("blog", blog_schema);

module.exports = blog;
