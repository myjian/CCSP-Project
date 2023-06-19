import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {formatTimestamp} from '../datetime';
import {query} from '../firebase';
import {DriverRecord} from '../record';
import {ErrorPage} from './ErrorPage';
import {PageContainer} from './PageContainer';

export function DriverRecordList() {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [records, setRecords] = useState<DriverRecord[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isLoading !== null) {
      return;
    }
    setIsLoading(true);
    query('/driverRecords')
      .then((snapshot) => {
        if (snapshot.exists()) {
          const records: DriverRecord[] = Object.values(snapshot.val());
          records.sort((r1, r2) => {
            if (r1.created > r2.created) return -1;
            if (r1.created < r2.created) return 1;
            return 0;
          });
          setRecords(records);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error instanceof Error ? error.message : String(error));
      })
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <PageContainer title="檢舉資料庫">
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
      ) : (
        <p>Loading...</p>
      )}
    </PageContainer>
  );
}
