let Schema = mongoose.Schema;

let diagnosa = new Schema({

  id_penyakit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'disease',
    default: null
  },
  id_pengguna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
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

let diagnosa_schema = mongoose.model("diagnosa", diagnosa);

module.exports = diagnosa_schema;
