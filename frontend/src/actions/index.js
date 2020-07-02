import { SIGN_IN, SIGN_OUT } from './types';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    userId: userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}
