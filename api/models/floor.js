let Schema = mongoose.Schema;

let floor_schema = new Schema({
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

let floor = mongoose.model("floor", floor_schema);

module.exports = floor;
