import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AutoIncrement = require('mongoose-sequence')(mongoose);
export const categories = [
  'Movies',
  'Songs',
  'Books',
  'Quotes',
  'TV Shows',
  'Arts',
  'Other'
];
const collectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field can not be empty']
    },
    text: {
      type: String,
      required: [true, 'Text field can not be empty']
    },
    category: {
      type: String,
      enum: {
        values: categories,
        message: 'Provide one of allowed categories'
      },
      required: [true, 'Category field can not be empty']
    },
    image: {
      type: String,
      default: null
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Author field can not be empty'],
      ref: 'User'
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }],
    odoo_id: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

collectionSchema.index({ title: 'text', text: 'text', category: 'text' });

collectionSchema.plugin(AutoIncrement, {
  id: 'collection_seq',
  inc_field: 'seq_no',
  start_seq: 0
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;
