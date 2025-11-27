"use client";

import { useEffect, useReducer, useCallback, useMemo } from "react";
import { ActionMapType, AuthStateType } from "../types";
import { createCookie, deleteCookie, getCookie } from "@/utils/cookie";
import { AuthContext } from "./auth-context";
import { IProfile } from "@/types/profile/profile.interface";

enum Types {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

type Payload = {
  [Types.INITIAL]: {
    user: IProfile | null;
    accessToken: string | null;
  };
  [Types.LOGIN]: {
    user: IProfile;
    accessToken: string;
  };
  [Types.LOGOUT]: {
    user: null;
    accessToken: null;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

type AuthStateExtended = AuthStateType & {
  accessToken: string | null;
};

const initialState: AuthStateExtended = {
  user: null,
  loading: true,
  accessToken: null,
};

const reducer = (
  state: AuthStateExtended,
  action: ActionsType
): AuthStateExtended => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case Types.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case Types.LOGOUT:
      return {
        loading: false,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logout = useCallback(async () => {
    await deleteCookie("user");
    await deleteCookie("token");
    window.location.href = "/login";
    dispatch({
      type: Types.LOGOUT,
      payload: { user: null, accessToken: null },
    });
  }, []);

  const initialize = useCallback(async () => {
    const user = await getCookie("user");
    const accessToken = await getCookie("token");
    if (user && accessToken) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: user,
          accessToken: accessToken,
        },
      });
    } else {
      await deleteCookie("user");
      await deleteCookie("token");
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
          accessToken: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = useCallback(async (username: string, password: string) => {
    //we need to send username and password to server and get user info from server
    //in this case i used fake data
    const user: IProfile = {
      id: 1,
      firstname: "sepide",
      lastname: "soltanpour",
      email: "sepideh@gmail.com",
      avatar: null,
      token: "token",
      role: ["admin"],
    };

    const stringify = JSON.stringify(user);
    await createCookie("user", stringify);
    await createCookie("token", JSON.stringify(user.token));
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
        accessToken: user.token,
      },
    });

    return user;
  }, []);

  const status = state.loading
    ? "loading"
    : state.user
    ? "authenticated"
    : "unauthenticated";

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      accessToken: state.accessToken,
      initialize,
      login,
      logout,
    }),
    [state, login, logout, initialize, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
