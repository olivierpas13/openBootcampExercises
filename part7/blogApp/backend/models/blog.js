const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: Array,
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});
/*eslint-disable*/
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
/* eslint-enable */
});

module.exports = mongoose.model('Blog', blogSchema);
