import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  loadingCount: 0,
  isLoading: false,

  startLoading: () => {
    const count = get().loadingCount + 1;
    set({ loadingCount: count, isLoading: count > 0 });
  },

  stopLoading: () => {
    const count = Math.max(0, get().loadingCount - 1);
    set({ loadingCount: count, isLoading: count > 0 });
  },

  resetLoading: () => set({ loadingCount: 0, isLoading: false }),
}));

export default useGlobalStore;
