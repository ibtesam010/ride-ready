export type ISigninResponse = {
  signInWithEmailPassword: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string | null;
  };
};

export type ISignupResponse = {
  signUpWithEmailPassword: {
    _id: string;
  };
};
