/*!
 * Number of nanoseconds in a millisecond.
 *
 * @type {number}
 */

import { z } from 'zod';

const MS_TO_NANOS = 1000000;

/*!
 * The minimum legal value for the "seconds" property of a Timestamp object.
 *
 * This value corresponds to 0001-01-01T00:00:00Z.
 *
 * @type {number}
 */
const MIN_SECONDS = -62135596800;

/*!
 * The maximum legal value for the "seconds" property of a Timestamp object.
 *
 * This value corresponds to 9999-12-31T23:59:59.999999999Z.
 *
 * @type {number}
 */
const MAX_SECONDS = 253402300799;

export function timestampToDate(seconds: number, nanoseconds: number): Date {
  return new Date(seconds * 1000 + Math.round(nanoseconds / MS_TO_NANOS));
}

export function timestampToMillis(
  seconds: number,
  nanoseconds: number
): number {
  return seconds * 1000 + Math.round(nanoseconds / MS_TO_NANOS);
}

export const zFirestoreTimestamp = z.object({
  _seconds: z.number().min(MIN_SECONDS).max(MAX_SECONDS),
  _nanoseconds: z.number().min(0).max(999999999),
});
