let Schema = mongoose.Schema;

let tenant_schema = new Schema({
  name: {
    type: String,
    default: null
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    default: null
  },
  floor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'floor',
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

let tenant = mongoose.model("tenant", tenant_schema);

module.exports = tenant;
