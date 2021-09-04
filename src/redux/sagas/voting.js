import {
  put, takeLatest, call, cps,
} from 'redux-saga/effects';
import { web3Enable } from '@polkadot/extension-dapp';

import { votingActions } from '../actions';

import {
  applyMyCandidacy,
  getCandidacyListRpc,
} from '../../api/nodeRpcCall';

import truncate from '../../utils/truncate';

// WORKERS

function* addMyCandidacyWorker() {
  try {
    const extensions = yield web3Enable('Liberland dapp');
    if (extensions.length) {
      yield cps(applyMyCandidacy);
      yield put(votingActions.addMyCandidacy.success());
      yield put(votingActions.getListOfCandidacy.call());
    }
  } catch (e) {
    yield put(votingActions.addMyCandidacy.failure(e));
  }
}

function* getListOFCandidacyWorker() {
  try {
    const extensions = yield web3Enable('Liberland dapp');
    if (extensions.length) {
      let listOfCandidacy = yield call(getCandidacyListRpc);
      listOfCandidacy = yield listOfCandidacy.map((el) => (
        {
          id: el.pasportId,
          deputies: truncate(el.pasportId, 10),
          supported: '10.000 LLM',
          action: 'Vote',
          place: '',
        }
      ));
      yield put(votingActions.getListOfCandidacy.success(listOfCandidacy));
    }
  } catch (e) {
    yield put(votingActions.getListOfCandidacy.failure(e));
  }
}

// WATCHERS

function* addMyCandidacyWatcher() {
  try {
    yield takeLatest(votingActions.addMyCandidacy.call, addMyCandidacyWorker);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    yield put(votingActions.addMyCandidacy.failure(e));
  }
}

function* getListOFCandidacyWatcher() {
  try {
    yield takeLatest(votingActions.getListOfCandidacy.call, getListOFCandidacyWorker);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    yield put(votingActions.getListOfCandidacy.failure(e));
  }
}

export {
  addMyCandidacyWatcher,
  getListOFCandidacyWatcher,
};
