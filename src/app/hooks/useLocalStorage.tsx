import { StoredFormData } from "@/schema/register";

const useLocalStorage = (key: string) => {
  const saveData = (data: Partial<StoredFormData>) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadData = (): Partial<StoredFormData> | null => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  };

  const clearData = () => {
    localStorage.removeItem(key);
  };

  return { saveData, loadData, clearData };
};

export default useLocalStorage;
