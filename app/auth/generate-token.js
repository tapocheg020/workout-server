import jwt from 'jsonwebtoken'

export const generateToken = userId => {
	return jwt.sign({ id: userId }, process.env.JWT_TOKEN, {
		expiresIn: '30d' // Время жизни токена
	})
}
