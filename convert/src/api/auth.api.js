import axios from 'axios';

const base_url = 'http://localhost:4021/api';

export const authApi = {
	register: async (data) => {
		const response = await axios.post(`${base_url}/register`, {
			email: data.email,
			password: data.password,
			role: 0,
		});
		return response.data;
	},

	login: async (data) => {
		const response = await axios.post(`${base_url}/login`, {
			email: data.email,
			password: data.password,
		});
		return response.data;
	},
};
