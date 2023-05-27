import type { AppwriteException } from "appwrite";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

const AppWriteClient = client;

export const getUserData = async () => {
  try {
    const account = new Account(client);
    return await account.get();
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const account = new Account(client);
    return await account.createEmailSession(email, password);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const logout = async () => {
  try {
    const account = new Account(client);
    return await account.deleteSession("current");
  } catch (error: unknown) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const register = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    const account = new Account(client);
    return await account.create("unique()", email, password, userName);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export default AppWriteClient;
