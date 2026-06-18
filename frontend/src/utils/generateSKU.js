import { v4 as uuidv4 } from 'uuid';

export default function generateSKU() {
  const uniqueSegment = uuidv4().replace(/-/g, '').substring(0, 6).toUpperCase();
  return `PRD-${uniqueSegment}`;
}
