import { Schema, model, models } from 'mongoose';

const SettingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export const Setting = models?.Setting || model('Setting', SettingSchema);
