import { Databases, Account, Storage, Avatars, Client } from 'appwrite'

// created a vite-env.d.ts to remove the error on this line 
// the error is because we should let typescript know we're using vite
export const appwriteConfig = {
    url:import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId:import.meta.env.VITE_APPWRITE_STORAGE_ID,
    savesCollectionId:import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    userCollectionId:import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
}

export const client = new Client()
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatar = new Avatars(client)
