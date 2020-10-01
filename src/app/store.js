import { configureStore } from '@reduxjs/toolkit'
import listsReducer from '../features/lists/listsSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, listsReducer)
// export default configureStore({
//   reducer: {
//     lists: listsReducer
//   }
// })
export default () => {
  const store = configureStore({ reducer: { lists: persistedReducer } })
  const persistor = persistStore(store)
  return { store, persistor }
}
