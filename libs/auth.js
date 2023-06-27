import CredentialsProvider from 'next-auth/providers/credentials'
import { isEmpty } from '../libs/serialize'
import resources from '../restapi/resources'
import axios from 'axios'

const googleServerKey = process.env.SECRET_RECAPTCHA

export const authOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.recaptcha)
            throw new Error('error_recaptcha_fail')
          const recaptchaVerify = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${googleServerKey}&response=${credentials?.recaptcha}`,
            {}, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          const recaptchaVerifyData = await recaptchaVerify?.data
          if (recaptchaVerifyData?.score && recaptchaVerifyData?.score < 0.5) {
            throw new Error('error_recaptcha_fail')
          }
        } catch (err) {
          throw new Error('error_recaptcha_form')
        }
        const username = credentials.username.replace(/\s+/g, '').toLowerCase()
        const password = credentials.password
        return loginUser({ username, password })
      },
    }),
  ],
  // secret: "GGJ1q3ZhAKc0D+n75f8+Xc5J3aC407clNZOcmrGscVUiaa4w1xmZ1ZAHSg1UBh85UBZ7azRc4/UrwMdrIB9PXA==",
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      const { email, exp, iat, jti, name, ...rest } = token
      return { ...session, ...rest }
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return { ...token, ...user }
    },
  },
};

const clientUser = async (username, password) => {
  try {
    const auth = await resources.auth.signin({
      username,
      password
    })
    const auth_response = auth.data
    if (auth_response?.token) {
      const user = await resources.users.get(username)
      const { 
        email, name, direccion, ciudad, 
        codigo_postal, is_active, id, premium, 
        fecha_inicio, fecha_fin, rss, mayorista 
      } = user ?? {}
      if (is_active) {
        return (
          {
            email, name, direccion, is_active,
            ciudad, codigo_postal, id, premium,
            fecha_inicio, fecha_fin, rss, mayorista
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