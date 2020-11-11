let Schema = mongoose.Schema;

let event_promotion_schema = new Schema({
  title: {
    type: String,
    default: null
  },
  content: {
    type: String,
    default: null
  },
  start_date: {
    type: Date,
    default: null
  },
  end_date: {
    type: Date,
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

let event_promotion = mongoose.model("event_promotion", event_promotion_schema);

module.exports = event_promotion;
