import { useSelector } from 'react-redux';

import { selectCurrentUser, selectCurrentUserToken } from '~/slices';

export const useWillFetchUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentUserToken);

  return !currentUser && Boolean(token);
};
