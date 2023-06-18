import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {decrypt} from '../decryptor';

// 1x1 PNG with transparent background
const TRANSPARENT_PNG_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

interface Props {
  recordId: string;
}

export function DriverRecord() {
  const {recordId} = useParams();
  if (!recordId) {
    return null;
  }
  const [imgSrc, setImgSrc] = useState(TRANSPARENT_PNG_DATA_URL);
  useEffect(() => {
    fetch(`../recordMedia/${recordId}`).then(async (result) => {
      if (!result.ok) {
        return;
      }
      const decrypted = await decrypt(await result.arrayBuffer(), 'ccsp-baddriver');
      setImgSrc(URL.createObjectURL(decrypted));
    });
  }, [recordId]);

  return (
    <div>
      <img src={imgSrc} />
    </div>
  );
}
