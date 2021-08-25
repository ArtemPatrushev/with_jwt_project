export const fields = {
    token: 'test_app_token',
    email: 'email',
    id: 'id', 
    refreshToken: 'refreshToken', 
    roles: 'roles',
    userName: 'userName', 
    isAuth: 'isAuth'
};

export type fieldsType = typeof fields;

// export const storage = {
//     save: (item, fieldName) => {
//         debugger
//         localStorage.setItem(fieldName, JSON.stringify(item));
//     },
//     load: (fieldName) => {
//         const item = localStorage.getItem(fieldName);
//         return item ? JSON.parse(item) : null;
//     },
//     remove: (fieldName) => {
//         localStorage.removeItem(fieldName);
//     },
// };

export const sesStorage = {
    save: (item: string | boolean, fieldName: string) => {
        debugger
        sessionStorage.setItem(fieldName, JSON.stringify(item));
    },
    load: (fieldName: string) => {
        const item = sessionStorage.getItem(fieldName);
        return item ? JSON.parse(item) : null;
    },
    remove: (fieldName: string) => {
        sessionStorage.removeItem(fieldName);
    },
}

export type sesStorageType = typeof sesStorage;
