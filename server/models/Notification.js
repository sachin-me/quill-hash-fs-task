const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
	{
		liker: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		likee: { type: Schema.Types.ObjectId, ref: 'User' },
		status: {
			type: String, 
			enum: ['LIKE', 'SUPERLIKE']
		}
	}, {
    timestamps: { 
    	createdAt: 'created_at',
    	updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Notification', NotificationSchema);