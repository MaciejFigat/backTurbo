import bcrypt from 'bcryptjs'

export interface User {
  name: string
  email: string
  password: string
  isAdmin?: boolean
}

const users: User[] = [

  {
    name: 'Admin User',
    email: 'admin@somethin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Nina',
    email: 'nina@nina.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]
export default users
