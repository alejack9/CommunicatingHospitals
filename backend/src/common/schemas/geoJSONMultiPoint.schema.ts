// Feature is not supported by mongodb
import * as mongoose from 'mongoose';
const GeoJSONMultiPointSchema = new mongoose.Schema({
  type: {
    type: String, // Don't do `{ location: { type: String } }`
    enum: ['MultiPoint'], // 'location.type' must be 'Point'
    required: true,
  },
  coordinates: {
    // long, lat
    type: [[Number]],
    required: true,
  },
});
export { GeoJSONMultiPointSchema };
