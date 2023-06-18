import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {formatTimestamp} from '../datetime';
import {loadDecryptKey} from '../decrypt_key';
import {decrypt} from '../decryptor';
import {DriverRecord} from '../record';
import {DecryptKeyInput} from './DecryptKeyInput';
import {PageFoot} from './PageFoot';
import {PageHead} from './PageHead';

function compareRecords(r1: DriverRecord, r2: DriverRecord) {
  if (r1.created > r2.created) return -1;
  if (r1.created < r2.created) return 1;
  return 0;
}

export function DriverRecordList() {
  const [failure, setFailure] = useState<string>('');

  const decryptKey = loadDecryptKey();
  if (!decryptKey || failure) {
    return <DecryptKeyInput errorMessage={failure} />;
  }
  const [records, setRecords] = useState<ReadonlyArray<DriverRecord>>([]);

  useEffect(() => {
    const path = 'database/driverRecords';
    fetch(path)
      .then(async (result) => {
        if (!result.ok) {
          throw new Error(`Failed to load ${path}`);
        }
        const decrypted = await decrypt(await result.arrayBuffer(), 'ccsp-baddriver');
        const parsed = JSON.parse(await decrypted.text()) as DriverRecord[];
        parsed.sort(compareRecords);
        setRecords(parsed);
      })
      .catch((err) => {
        setFailure(err instanceof Error ? err.message : String(err));
      });
  }, []);

  return (
    <>
      <PageHead title="影像資料庫" />
      {records.length ? (
        <table className="table table-striped">
          <tbody>
            {records.map((rec, i, arr) => (
              <React.Fragment key={i}>
                <tr>
                  <th>
                    <Link to={`/driverRecords/${rec._id}`}>第 {arr.length - i} 筆</Link>
                    &nbsp;({rec.ext})
                    <br />
                    檢舉時間：{formatTimestamp(rec.created)}
                  </th>
                </tr>
                <tr>
                  <td>
                    <Link className="btn btn-default" to={`/driverRecords/${rec._id}`}>
                      詳細資料
                    </Link>
                    <br />
                    縣市：{rec.country}
                    <br />
                    地點：{rec.location}
                    <br />
                    車牌：{rec.carNum}
                    <br />
                    事發時間：{rec.happenedDate}&nbsp;{rec.happenedTime}
                    <br />
                    <blockquote>簡述：{rec.description}</blockquote>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : null}
      <PageFoot />
    </>
  );
}
