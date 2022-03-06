import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { useGetMeQuery } from '~/services';
import { selectCurrentUser, selectCurrentUserToken } from '~/slices';

export const useGetCurrentUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentUserToken);
  const skip = Boolean(currentUser) || !authToken;
  const hadToken = useRef(authToken);

  useGetMeQuery(undefined, { skip });

  useEffect(() => {
    if (currentUser && !hadToken.current) {
      toast.success(`Welcome, ${currentUser.firstName}!`);
    }
  }, [currentUser]);
};
