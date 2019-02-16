import { Document, Types } from 'mongoose';
/**
 * @description The ranking of a specific type
 */
export interface TypeRank extends Document {
  /**
   * The hospital id
   */
  _id: Types.ObjectId;
  /**
   * The hospital name
   */
  name: string;
  ranking: number;
  media: number;
}
