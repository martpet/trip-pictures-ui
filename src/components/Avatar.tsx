import { Icon } from '@adobe/react-spectrum';
import { IconPropsWithoutChildren } from '@react-spectrum/icon';

import { User } from '~/types';

type Props = {
  user: User;
  size?: IconPropsWithoutChildren['size'];
};

export function Avatar({ user, size }: Props) {
  return (
    <Icon size={size}>
      <span>
        <img
          src={user.pictureUrl}
          alt={`${user.firstName} ${user.lastName}`}
          style={{ borderRadius: '50px' }}
        />
      </span>
    </Icon>
  );
}
