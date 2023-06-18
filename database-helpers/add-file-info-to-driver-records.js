const fs = require('fs');

if (process.argv.length < 5) {
  console.error(
    'must provide driverRecords-input.json file-metadata.json driverRecords-output.json'
  );
  process.exit(1);
}

const files = JSON.parse(fs.readFileSync(process.argv[3]));
const fileByRecordId = files.reduce((map, f) => {
  map.set(f.filename.substring(5), {
    fileUploadTime: new Date(f.uploadDate).getTime(),
    contentType: f.contentType,
  });
  return map;
}, new Map());

const records = JSON.parse(fs.readFileSync(process.argv[2]));
const augmentedRecords = records.map((r) => {
  const fileInfo = fileByRecordId.get(r._id);
  if (fileInfo == null) {
    console.error(`Could not find file info for record ${r._id}`);
    process.exit(1);
  }
  return {...r, ...fileInfo};
});

fs.writeFileSync(process.argv[4], JSON.stringify(augmentedRecords, null, 2));

const recordIds = Array.from(fileByRecordId.keys());
console.log(`for rec in ${recordIds.join(' ')}
do
    ls $rec || curl "http://localhost:8080/driverRecords/$rec/file" -o $rec
done`);
