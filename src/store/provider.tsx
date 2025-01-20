"use client";
import React, { createContext, ReactNode } from "react";
import Store, { RootStore } from "@/store/store";
import { observer } from "mobx-react-lite";

export const StoreContext = createContext(RootStore);

interface State { store: Store, }

export const store = new Store();

export const Context = createContext<State>({ store, })

export const StoreWrapper = observer(({ children }: { children: ReactNode }) => {

  store.checkAuth();

  return (
    <Context.Provider value={{ store }}>{children}</Context.Provider>
  );
})