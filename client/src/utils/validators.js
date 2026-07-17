export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const required = (value) => String(value || '').trim().length > 0

export const minLength = (value, length) => String(value || '').length >= length

export const validatePasswordMatch = (password, confirmPassword) => password === confirmPassword
