import { supabase } from "@shared/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createForm } from "effector-forms";

// --- effects ---

const checkSessionFx = createEffect<void, Session | null, string>(async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error.message;
  return data.session;
});

const initAuthListenerFx = createEffect<void, void, string>(() => {
  supabase.auth.onAuthStateChange((_event, session) => {
    sessionChanged(session);
  });
});

const signInFx = createEffect<{ email: string; password: string }, void, string>(
  async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error.message;
  },
);

const signOutFx = createEffect<void, void, string>(async () => {
  await supabase.auth.signOut();
});

// --- forms ---

const loginForm = createForm({
  fields: {
    email: {
      init: "",
      rules: [
        { name: "required", validator: (v: string) => Boolean(v), errorText: "Введите email" },
        {
          name: "email",
          validator: (v: string) => /\S+@\S+\.\S+/.test(v),
          errorText: "Некорректный email",
        },
      ],
    },
    password: {
      init: "",
      rules: [
        { name: "required", validator: (v: string) => Boolean(v), errorText: "Введите пароль" },
      ],
    },
  },
  validateOn: ["submit"],
});

// --- events ---

export const authInitRequested = createEvent();
const sessionChanged = createEvent<Session | null>();
export const signOutClicked = createEvent();

// --- stores ---

export const $session = createStore<Session | null>(null);
export const $isSessionLoading = checkSessionFx.pending;
export const $isSigningIn = signInFx.pending;

// --- wiring ---

sample({ clock: authInitRequested, target: [checkSessionFx, initAuthListenerFx] });
sample({ clock: checkSessionFx.doneData, target: $session });
sample({ clock: sessionChanged, target: $session });

sample({ clock: loginForm.formValidated, target: signInFx });
sample({
  clock: signInFx.failData,
  fn: (errorText) => ({ rule: "server", errorText }),
  target: loginForm.fields.email.addError,
});
sample({ clock: signInFx.done, target: loginForm.reset });

sample({ clock: signOutClicked, target: signOutFx });
sample({ clock: signOutFx.doneData, fn: () => null, target: $session });

// --- public model ---

export const authModel = {
  forms: {
    loginForm,
  },
  events: {
    authInitRequested,
    signOutClicked,
  },
  stores: {
    $session,
    $isSessionLoading,
    $isSigningIn,
  },
};
