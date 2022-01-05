import React, { useState } from 'react';
import faker from 'faker';
import { User } from '../../../types/th-doc';
import debounce from 'lodash/debounce';
import { RoomWrapper } from './styles/Room.styles';
import Client from '../Client/Client';

interface RoomProps {}

const createUser = (): User => {
  return {
    id: faker.random.uuid(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
};

const Room: React.FC<RoomProps> = () => {
  const [user, setUser] = useState(createUser());
  const [isRemounted, setRemountState] = useState(false);

  const remount = debounce(() => {
    setRemountState(true);
    setTimeout(setRemountState, 50, false);
  }, 300);

  return (
    <RoomWrapper>
      {isRemounted ? null : <Client {...user} key={user.id} />}
    </RoomWrapper>
  );
};

export default Room;
