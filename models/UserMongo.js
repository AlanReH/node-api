import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  country: String
});

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  password: String,
  tax_id: String,
  created_at: Date,
  addresses: [AddressSchema]
});

export default mongoose.model('User', UserSchema);