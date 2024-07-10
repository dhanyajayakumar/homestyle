// utils/uniqueId.ts
import { v4 as uuidv4 } from "uuid";

export const getUniqueId = (): string => {
  let uniqueId = localStorage.getItem("uniqueId");

  if (!uniqueId) {
    uniqueId = uuidv4();
    localStorage.setItem("uniqueId", uniqueId as string); // Asserting uniqueId as string
  }

  return uniqueId as string; // Asserting uniqueId as string
};
