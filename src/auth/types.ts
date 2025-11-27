import { IProfile } from "@/types/profile/profile.interface";

export type ActionMapType<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, unknown>;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: IProfile | null;
};

// ----------------------------------------------------------------------

type CanRemove = {
  login?: (userName: string, password: string) => Promise<IProfile>;
  initialize: () => Promise<void>;
};

export type ContextType = CanRemove & {
  user: IProfile | null;
  loading: boolean;
  accessToken: string | null;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (userName: string, password: string) => Promise<IProfile>;
  logout: () => void;
  initialize: () => Promise<void>;
};
