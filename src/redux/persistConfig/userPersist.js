import storage from 'redux-persist/lib/storage';

export const userPersist = {
    key: 'user',
    storage: storage,
    whitelist: ['user', 'token', 'isAuthenticated']
};