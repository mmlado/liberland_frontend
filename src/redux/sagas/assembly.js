import {
  put, takeLatest, call, select,
} from 'redux-saga/effects';
import { web3Accounts } from '@polkadot/extension-dapp';

import { assemblyActions } from '../actions';

import { userSelectors } from '../selectors';

import api from '../../api';

// WORKERS
function* addMyDraftWorker(action) {
  try {
    const { data } = action.payload;
    const [accounts] = yield web3Accounts();
    const createdAt = Date.now();
    const userId = yield select(userSelectors.selectUserId);
    data.fileName = accounts.address + createdAt;
    data.createdDate = createdAt;
    data.userId = userId;

    yield call(api.post, 'assembly/add_new_draft', data);
    yield put(assemblyActions.addMyDraft.success());
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('e', e);
    yield put(assemblyActions.addMyDraft.failure(e));
  }
}

function* getMyProposalsWorker() {
  try {
    const userId = yield select(userSelectors.selectUserId);
    const { data } = yield api.post('/assembly/get_my_proposals', { userId });
    yield put(assemblyActions.getMyProposals.success(data));
  } catch (e) {
    yield put(assemblyActions.getMyProposals.failure(e));
  }
}

// WATCHERS

function* addMyDraftWatcher() {
  try {
    yield takeLatest(assemblyActions.addMyDraft.call, addMyDraftWorker);
  } catch (e) {
    yield put(assemblyActions.addMyDraft.failure(e));
  }
}

function* getMyProposalsWatcher() {
  try {
    yield takeLatest(assemblyActions.getMyProposals.call, getMyProposalsWorker);
  } catch (e) {
    yield put(assemblyActions.getMyProposals.failure(e));
  }
}

export {
  addMyDraftWatcher,
  getMyProposalsWatcher,
};
