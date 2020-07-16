import { refreshToken, startRefreshingToken } from '../actions';

export function authMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        // only worry about expiring token for async actions
        if (typeof action === 'function') {
            if (getState().auth && getState().auth.accessToken && getState().auth.refreshToken) {
                // decode jwt so that we know if and when it expires
                const timeStamp = getState().auth.timeStamp;
                const minutes = 5;
                const expiresIn = new Date(timeStamp.getTime() + getState().auth.expiresIn * 1000 + minutes * 60000);
                const timeNow = new Date().getTime();

                if (expiresIn && (expiresIn > timeNow))) {
                  startRefreshingToken();
                  // make sure we are not already refreshing the token
                  //return refreshToken(dispatch).then(() => next(action));
                  if (!getState().auth.isRefreshing) {
                      return refreshToken(dispatch).then(() => next(action));
                  } else {
                      return next(action);
                  }
                }
            }
        }
        return next(action);
    };
}
