import React, { useState } from 'react';
import { Col, Row, Typography, message, Upload } from 'antd';

import styles from './CreateForecast.module.scss';
import { MyUploader } from './components/Uploader/MyUploader';

const { Title, Text } = Typography;

export const CreateForecast = () => {
  const [uploadData, setUploadData] = useState<any>(null);
  console.log(uploadData);
  return (
    <div>
      <MyUploader uploadData={uploadData} setUploadData={setUploadData} />
    </div>
  );
};
