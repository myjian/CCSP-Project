const fs = require('fs');

if (process.argv.length < 3) {
  console.error('input file path is required');
  process.exit(1);
} else if (process.argv.length < 4) {
  console.error('output file path is required');
  process.exit(1);
}

const FIELDS_TO_REMOVE = [
  '__v',
  'user_email',
  'user_address',
  'user_id',
  'user_email',
  'user_phone',
  // Temporary
  'status',
  'url',
  'user_name',
];

const raw = fs.readFileSync(process.argv[2]);
const records = JSON.parse(raw);
const fields = new Map();
const sanitizedRecords = records.map((record) => {
  const keys = Object.keys(record);
  const sanitized = {};
  for (const key of keys) {
    if (FIELDS_TO_REMOVE.includes(key)) {
      continue;
    }
    let value = record[key];
    if (key === 'created') {
      value = parseInt(record[key]['$date']['$numberLong']);
    } else if (key === '_id') {
      value = record[key]['$oid'];
    }
    sanitized[key] = value;
    if (!fields.has(key)) {
      fields.set(key, new Set());
    }
    const values = fields.get(key);
    values.add(value);
  }
  return sanitized;
});
console.log(fields);

const keys = Array.from(fields.keys());
keys.sort();

const output = JSON.stringify(
  sanitizedRecords.map((r) => {
    const record = {};
    for (const key of keys) {
      record[key] = r[key];
    }
    return record;
  }),
  undefined,
  2
);
fs.writeFileSync(process.argv[3], output);
