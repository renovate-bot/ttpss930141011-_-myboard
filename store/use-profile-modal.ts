/**
 * Profile modal state management
 */

'use client'

import { create } from 'zustand'

interface ProfileModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useProfileModal = create<ProfileModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))