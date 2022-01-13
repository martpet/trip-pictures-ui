import { useSelector } from 'react-redux';

import { LoginButton, ProfileButton } from '~/components';
import { selectCurrentUser } from '~/slices';

export function UserButtons() {
  const user = useSelector(selectCurrentUser);
  return user ? <ProfileButton /> : <LoginButton />;
}
