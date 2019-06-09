import { getPersonsList, getPerson, delPerson } from '@/services/persons';

export default {
  namespace: 'personsSpringBootRestExemple',

  state: {
    editingPerson: {
      id: '1',
      firstName: '1',
      lastName: 'Mike',
      description: 32,
    },
    loadingPersonsList: false,
    personsList: [
      // {
      //   id: '1',
      //   firstName: '1',
      //   lastName: 'Mike',
      //   description: 32,
      // },
    ],
  },

  effects: {
    *fetchPersonsList({ payload }, { call, put }) {
      const personsList = yield getPersonsList(payload.id);
      yield put({
        type: 'setStateProps',
        payload: { personsList },
      });
    },

    *fetchPerson({ payload }, { call, put }) {
      const editingPerson = yield getPerson(payload.id);
      yield put({
        type: 'setStateProps',
        payload: { editingPerson },
      });
    },

    *deletePerson({ payload }, { call, put }) {
      const res = yield delPerson(payload.id);
      const editingPerson = {};
      yield put({
        type: 'setStateProps',
        payload: { editingPerson },
      });
    },
  },

  reducers: {
    changeValuePerson(state, action) {
      return {
        ...state,
        editingPerson: {
          ...state.editingPerson,
          ...action.payload.changedValues,
        },
      };
    },

    setStateProps(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    addPerson(state, action) {
      const personsList = [...state.personsList];
      personsList.unshift({ ...action.payload.person, localId: uniqId() });
      return {
        ...state,
        personsList,
      };
    },

    removePerson(state, action) {
      const personsList = [...state.personsList];
      const index = personsList.findIndex(person => person.localId === action.payload.localId);
      personsList.splice(index, 1);
      return {
        ...state,
        personsList,
      };
    },

    updatePerson(state, action) {
      const personsList = [...state.personsList];
      const index = personsList.findIndex(person => person.localId === action.payload.localId);
      personsList[index] = { ...action.payload.person };
      return {
        ...state,
        personsList,
      };
    },
  },
};

function uniqId() {
  return Math.floor(Math.random() * 90000000 + 10000000);
}
