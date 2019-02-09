import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  // ref or embedded? ref: we don't need hospital almost never
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
});

export { UserSchema };
