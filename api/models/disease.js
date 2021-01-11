let Schema = mongoose.Schema;

let disease = new Schema({
  kode: {
    type: String,
    default: null
  },
  nama: {
    type: String,
    default: null
  },
  deskripsi: {
    type: String,
    default: null
  },
  solusi: {
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

let disease_schema = mongoose.model("disease", disease);

module.exports = disease_schema;
