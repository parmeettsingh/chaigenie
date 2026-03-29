import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

// FIX: This line is required for Vercel to handle authentication routes correctly
export const dynamic = "force-dynamic";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
})

export { handler as GET, handler as POST }