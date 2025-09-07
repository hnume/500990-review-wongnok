import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import KeyclockProvider from 'next-auth/providers/keycloak'

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config =
  {
  providers: [
    KeyclockProvider({
      clientId: process.env.KEYCLOCK_CLIENT_ID ?? '',
      clientSecret: process.env.KEYCLOCK_CLIENT_SECRET ?? '',
      issuer: process.env.KEYCLOCK_ISSUER,
      authorization: { params: { prompt: 'login' } },
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        console.log('account : ', account)
        token.accessToken = account.access_token
        token.userId = account.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.userId = token.userId
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}