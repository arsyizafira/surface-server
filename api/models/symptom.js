let Schema = mongoose.Schema;

let symptom = new Schema({
  kode: {
    type: String,
    default: null
  },
  nama: {
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

let symptom_schema = mongoose.model("symptom", symptom);

module.exports = symptom_schema;
