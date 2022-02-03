import { z } from 'zod';
import { timestampToDate, zFirestoreTimestamp } from './firestore-helpers';

export const zDate = z
  .union([z.string(), z.number(), zFirestoreTimestamp])
  .transform((val): Date => {
    if (val instanceof Date) {
      return val;
    }

    if (typeof val === 'string' || typeof val === 'number') {
      // Use regex to ensure string is a validate UTC date
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${val}`);
      }
      return date;
    }

    // If it is a firestore timestamp, convert it to a date
    if ('_seconds' in val && '_nanoseconds' in val) {
      return timestampToDate(val._seconds, val._nanoseconds);
    }

    throw new Error(`Invalid date: ${val}`);
  });
