// apps/backend/src/utils/idGenerator.ts

import { Counter } from '@olp-monitor/database-models';

/**
 * Generates a unique, sequential and formatted ID for a given entity.
 * @param prefix - The prefix for the ID (e.g., 'ST' for student, 'TR' for teacher).
 * @returns A formatted string like 'ST-0000001'.
 */
export const generateUniqueId = async (prefix: string): Promise<string> => {
  // Find the counter for the given prefix and increment it atomically.
  // 'findOneAndUpdate' with 'upsert: true' and 'new: true' ensures the counter
  // is created if it doesn't exist and that the new value is returned.
  const counter = await Counter.findOneAndUpdate(
    { _id: `${prefix}_counter` },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  // Pad the sequence number with leading zeros to a fixed length (e.g., 7 digits).
  const sequentialPart = String(counter.sequence_value).padStart(7, '0');

  return `${prefix}-${sequentialPart}`;
};