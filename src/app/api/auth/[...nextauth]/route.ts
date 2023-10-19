import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "id", type: "text", placeholder: "아이디" },
        password: { label: "password", type: "password", placeholder: "비밀번호" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) return null;
        return fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'post',
          body:
            JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            if (data) {
              return data;
            }
            return null;
          })
      }
    })
  ]
});

export { handler as GET, handler as POST }