import { apolloClient } from "@/apollo-client";
import { NEXTAUTH_SECRET } from "@/constants";
import { ISigninResponse, ISignupResponse } from "@/types/signin";
import { gql } from "@apollo/client";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      id: "credentials-sign-in",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, _) {
        const { data } = await apolloClient.mutate<ISigninResponse>({
          mutation: gql`
            mutation {
              signInWithEmailPassword(
                signInDto: {
                  email: "${credentials?.email}"
                  password: "${credentials?.password}"
                }
              ) {
                _id
                email
                firstName
                lastName
                phoneNumber
              }
            }
          `,
        });

        if (!data) return null;

        const {
          signInWithEmailPassword: { _id, email, firstName, lastName },
        } = data;

        return {
          id: _id,
          email,
          name: `${firstName} ${lastName}`,
        };
      },
    }),
    CredentialProvider({
      name: "Credentials",
      id: "credentials-sign-up",
      credentials: {
        email: { label: "email", type: "text" },
        password: {
          label: "password",
          type: "password",
        },
        firstName: { label: "firstName" },
        lastName: { label: "lastName" },
      },
      async authorize(credentials, _) {
        const { email, firstName, lastName, password } = credentials!;
        const { data } = await apolloClient.mutate<ISignupResponse>({
          mutation: gql`
            mutation {
              signUpWithEmailPassword(
                signUpDto: {
                  email: "${email}"
                  password: "${password}"
                  firstName: "${firstName}"
                  lastName: "${lastName}"
                  provider: "email"
                }
              ) {
                _id
              }
            }
          `,
        });

        if (!data) return null;

        return {
          id: data.signUpWithEmailPassword._id,
          email,
          name: `${firstName} ${lastName}`,
        };
      },
    }),
  ],
  secret: NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24 * 2, // 10 days
  },
};

export default NextAuth(authOptions);
