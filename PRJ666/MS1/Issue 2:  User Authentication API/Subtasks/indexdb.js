// 1
const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

export const createCollectionDB = () => {
    if (!indexedDB) {
        console.log("IndexedDB not found in this browser.");
    }

    const request = indexedDB.open("taskmaster", 1);

    request.onerror = function (event) {
        // window.alert("An error occurred with IndexedDB");
        console.error(event);
    };

    request.onupgradeneeded = async function (event) {
        const db = request.result;

        if (!db.objectStoreNames.contains("user_data")) {
            const userStore = db.createObjectStore("user_data", {
                keyPath: "id",
                autoIncrement: true,
            });
            userStore.createIndex("name", "name", {unique: false});
            userStore.createIndex("email", "email", {unique: true});
            userStore.createIndex("password", "password", {unique: false});
            userStore.createIndex("title", "title", {unique: false});
            userStore.createIndex("description", "description", {
                unique: false,
            });
            userStore.createIndex("photo", "photo", {unique: false});

            userStore.createIndex("group", "group", {
                unique: false,
                multiEntry: true,
            });
        }
    };

    request.onsuccess = () => {
        console.log("Database Open Successfully!");
    };

    return request;
};
