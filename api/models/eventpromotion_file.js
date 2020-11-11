let Schema = mongoose.Schema;


let event_file_schema = new Schema({
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

let eventpromotion_file = mongoose.model("eventpromotion_file", event_file_schema);

module.exports = eventpromotion_file;

