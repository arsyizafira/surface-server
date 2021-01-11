let Schema = mongoose.Schema;

let rule = new Schema({

  id_penyakit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'disease',
    default: null
  },
  gejala: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'symptom' }],
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

let rule_schema = mongoose.model("rule", rule);

module.exports = rule_schema;
