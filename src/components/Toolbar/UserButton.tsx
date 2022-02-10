import { useSelector } from 'react-redux';

import { LoginMenu, ProfileMenu } from '~/components';
import { selectCurrentUser } from '~/slices';

export function UserButton() {
  const user = useSelector(selectCurrentUser);
  return user ? <ProfileMenu /> : <LoginMenu />;
}
