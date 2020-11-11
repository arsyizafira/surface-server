let Schema = mongoose.Schema;

let category_schema = new Schema({
  name: {
    type: String,
    default: null
  },
  is_active: {
    type: Boolean,
    default: false
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

let category = mongoose.model("category", category_schema);

module.exports = category;
