import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchPlacesStart, fetchPlacesSuccess, fetchPlacesFailure,
  addPlaceStart, addPlaceSuccess, addPlaceFailure,
  deletePlaceStart, deletePlaceSuccess, deletePlaceFailure,
  updatePlaceStart, updatePlaceSuccess, updatePlaceFailure, 
  updateEventStart, updateEventSuccess, updateEventFailure,
  fetchEventsStart, fetchEventsSuccess, fetchEventsFailure,
  addEventStart, addEventSuccess, addEventFailure,
  deleteEventStart, deleteEventSuccess, deleteEventFailure,
} from '../Slices/adminSlice';
import { 
  fetchAllPlaces, addPlace, deletePlace,updatePlace,
  fetchAllEvents, addEvent, deleteEvent,updateEvent
} from '../../services/api/adminApi'

function* fetchPlaces() {
  try {
    const places = yield call(fetchAllPlaces);
    yield put(fetchPlacesSuccess(places));
  } catch (error) {
    yield put(fetchPlacesFailure(error.toString()));
  }
}

function* addPlaceSaga(action) {
  try {
    const newPlace = yield call(addPlace, action.payload);
    yield put(addPlaceSuccess(newPlace));
  } catch (error) {
    yield put(addPlaceFailure(error.toString()));
  }
}

function* deletePlaceSaga(action) {
  try {
    yield call(deletePlace, action.payload);
    yield put(deletePlaceSuccess(action.payload));
  } catch (error) {
    yield put(deletePlaceFailure(error.toString()));
  }
}

function* fetchEvents() {
  try {
    const events = yield call(fetchAllEvents);
    yield put(fetchEventsSuccess(events));
  } catch (error) {
    yield put(fetchEventsFailure(error.toString()));
  }
}

function* addEventSaga(action) {
  try {
    const newEvent = yield call(addEvent, action.payload);
    yield put(addEventSuccess(newEvent));
  } catch (error) {
    yield put(addEventFailure(error.toString()));
  }
}

function* deleteEventSaga(action) {
  try {
    yield call(deleteEvent, action.payload);
    yield put(deleteEventSuccess(action.payload));
  } catch (error) {
    yield put(deleteEventFailure(error.toString()));
  }
}

function* updatePlaceSaga(action) {
  try {
    yield put(updatePlaceStart()); // Dispatch action to update state to 'loading'
    const updatedPlace = yield call(updatePlace, action.payload); // API call to update the place
    yield put(updatePlaceSuccess(updatedPlace)); // Dispatch success action with the updated place
  } catch (error) {
    yield put(updatePlaceFailure(error.message)); // Dispatch failure action with error message
  }
}

// Worker Saga: Update Event
function* updateEventSaga(action) {
  try {
    yield put(updateEventStart()); // Dispatch action to update state to 'loading'
    const updatedEvent = yield call(updateEvent, action.payload); // API call to update the event
    yield put(updateEventSuccess(updatedEvent)); // Dispatch success action with the updated event
  } catch (error) {
    yield put(updateEventFailure(error.message)); // Dispatch failure action with error message
  }
}


export function* adminSaga() {
  yield takeEvery(fetchPlacesStart.type, fetchPlaces);
  yield takeEvery(addPlaceStart.type, addPlaceSaga);
  yield takeEvery(deletePlaceStart.type, deletePlaceSaga);
  yield takeEvery(updateEventStart.type, updateEventSaga);
  yield takeEvery(updatePlaceStart.type, updatePlaceSaga);
  yield takeEvery(fetchEventsStart.type, fetchEvents);
  yield takeEvery(addEventStart.type, addEventSaga);
  yield takeEvery(deleteEventStart.type, deleteEventSaga);

}
