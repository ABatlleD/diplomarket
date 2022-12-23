import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { isEmpty } from '../../../libs/serialize'
import resources from '../../../restapi/resources'

const clientUser = async (username, password) => {
  try {
    const auth = await resources.auth.signin({
      username,
      password
    })
    const auth_response = auth.data
    if (auth_response?.token) {
      const users = await resources.users.all()
      const { results } = users.data
      const user = results.find((user) => user.email === username)
      const { email, name, direccion, ciudad, codigo_postal, is_active, id, premium, fecha_inicio, fecha_fin, rss } =
        user ?? {}
      if (is_active) {
        return (
          {
            email,
            name,
            direccion,
            is_active,
            ciudad,
            codigo_postal,
            id,
            premium,
            fecha_inicio,
            fecha_fin,
            rss
          } ?? {}
        )
      } else {
        return { error: 'Confirme su correo' }
      }
    }
  } catch (_) {
    if (_?.response?.data?.detail === 'USR_NOT_EXISTS') { return { error: '404' } } else if (_?.response?.data?.detail === 'USR_NOT_ACTIVE') { return { error: '403' } } else { return undefined }
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const username = credentials.username.replace(/\s+/g, '').toLowerCase()
        const password = credentials.password
        return loginUser({ username, password })
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin'
  },
  jwt: {},
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return { ...token, ...user }
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      const { email, exp, iat, jti, name, ...rest } = token
      return { ...session, ...rest }
    }
  },
  events: {},
  theme: {
    colorScheme: 'light'
  },
  debug: true
}

export const loginUser = async ({ username, password }) => {
  if (!password) {
    throw new Error('Accounts Have to login with password.')
  }

  const user = await clientUser(username, password)

  if (user?.error === '404') {
    throw new Error('404')
  } else if (user?.error === '403') {
    throw new Error('403')
  } else if (user === undefined && isEmpty(user)) {
    throw new Error('Login Incorrect.')
  }

  return user
}

export default NextAuth(authOptions)
