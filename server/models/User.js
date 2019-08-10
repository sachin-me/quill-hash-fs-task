const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String },
  email: { type: String },
	password: { type: String },
	image: { type: String },
	likes: [{ type: Schema.Types.ObjectId, ref: 'User'  }],
	superlikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	blocks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
})

UserSchema.pre('save', function(next) {
  if(this.password) {
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);