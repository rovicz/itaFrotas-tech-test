import { call, put } from 'redux-saga/effects';
import { CustomException } from '../../utils/customException';
import { loginError, loginSuccess } from './authSlice';
import { authApi } from '../../services/auth';
import Cookies from 'js-cookie';

export function* authSaga({ payload }) {
  try {
    const locais = yield call(authApi, payload);
    const loginResult = loginSuccess({ token: locais.token, email: payload.email });
    yield put(loginResult);
  } catch (error) {
    yield put(loginError(new CustomException(error).data()));
  }
}
