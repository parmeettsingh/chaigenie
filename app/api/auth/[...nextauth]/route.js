// import NextAuth from 'next-auth'
// // import AppleProvider from 'next-auth/providers/apple'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import GoogleProvider from 'next-auth/providers/google'
// // import EmailProvider from 'next-auth/providers/email'
// import GithubProvider from 'next-auth/providers/github'
// import mongoose from 'mongoose'
// import Payment from '@/models/Payment'
// import Users from '@/models/Users'
// import connectDB from '@/db/connectDb'

// export const AuthOptions = NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (account.provider === 'github') {

//         // Connect to the database
//         await connectDB()

//         // Check if user exists in the database
//         const currentUser = await User.findOne({ email: user.email })

//         if (!currentUser) {
//           // If not, create a new user
//           const newUser = new User({
//             email: user.email,
//             username: user.email.split('@')[0],
//           })

//           // 🔧 FIX: save the user
//           await newUser.save()
//         }
//       }

//       // 🔧 FIX: ensure login continues
//       return true
//     },

//     async session({ session, token, user }) {

//       await connectDB()

//       const dbUser = await User.findOne({ email: session.user.email })
//       console.log("DB USER:", dbUser)

//       if (dbUser) {
//         session.user.name = dbUser.username
//       }

//       return session
//     },
//   }
// })

// export { AuthOptions as GET, AuthOptions as POST }  

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
})

export { handler as GET, handler as POST }