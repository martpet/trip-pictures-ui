import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { useGetMeQuery } from '~/services';
import { selectCurrentUser, selectCurrentUserToken } from '~/slices';

export const useGetCurrentUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentUserToken);
  const skip = Boolean(currentUser) || !authToken;
  const tokenRef = useRef(authToken);
  const wasLoggedInInitialy = !!tokenRef.current;
  const isWelcomeMsgEnabled = false;

  useGetMeQuery(undefined, { skip });

  useEffect(() => {
    if (isWelcomeMsgEnabled && currentUser && !wasLoggedInInitialy) {
      toast(`Welcome, ${currentUser.firstName}!`);
    }
  }, [currentUser]);
};
