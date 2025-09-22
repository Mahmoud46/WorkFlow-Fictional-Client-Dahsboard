import { createContext } from "react";
import type { IContext } from "../interface/Context.interface";

export const Context = createContext<IContext | null>(null);
