import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light', 
      isAutoTheme: false,
      hydrated: false, 

      setTheme: (newTheme) => set({ theme: newTheme, isAutoTheme: false }), 
      setIsAutoTheme: (value) => {
        set({ isAutoTheme: value });
        if (value) {
          const systemTheme = Appearance.getColorScheme();
          set({ theme: systemTheme || 'light' }); 
        }
      },
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'theme-storage', 
      storage: createJSONStorage(() => AsyncStorage), 
      onRehydrateStorage: () => (state) => {
        if (state?.isAutoTheme) {
          const systemTheme = Appearance.getColorScheme();
          state.setTheme(systemTheme || 'light'); 
        }
        state?.setHydrated(); 
      },
    }
  )
);
