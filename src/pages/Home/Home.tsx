import { Divider, List, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Home = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const { user, getNotes } = useContext(AuthContext);
  useEffect(() => {
    getCurrentNotes();
  }, []);

  const getCurrentNotes = async () => {
    const currentNotes = await getNotes();
    setNotes(currentNotes);
  };
  return (
    <>
      <Typography.Title level={4}>
        {user && `Добро пожаловать, ${user.first_name || user.email}!`}
      </Typography.Title>
      <Divider orientation="left">{'Ваши посты'}</Divider>
      <List
        bordered
        dataSource={notes}
        renderItem={(item, index) => (
          <List.Item>
            <Typography.Text>
              {index + 1 + ') '} {item.body}
            </Typography.Text>
          </List.Item>
        )}
      />
    </>
  );
};
