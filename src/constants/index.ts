export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

// Mock credentials
export const ADMIN_CREDENTIALS = {
  name: 'Admin',
  email: 'admin@test.com',
  password: 'admin123',
  role: ROLES.ADMIN,
  id: 'ADMIN_1'
}

export const USER_CREDENTIALS = {
  name: 'User',
  email: 'user@test.com',
  password: 'user123',
  role: ROLES.USER,
  id: 'USER_1'
}

export const CREDENTIALS = {
  email: { label: 'Email', type: 'email' },
  password: { label: 'Password', type: 'password' }
}
