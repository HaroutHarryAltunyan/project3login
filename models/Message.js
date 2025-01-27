const{ model, Schema } = require('mongoose');

const messageSchema = new Schema ({
    text: String,
    createdAt: String,
    createdBy: String
});

module.exports = model('Message', messageSchema);


// this pulls from typedefs line 5-9         15-16         19-20