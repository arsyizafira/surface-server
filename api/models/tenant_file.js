let Schema = mongoose.Schema;


let tenant_file_schema = new Schema({
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
  tenant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tenant',
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

let tenant_file = mongoose.model("tenant_file", tenant_file_schema);

module.exports = tenant_file;

