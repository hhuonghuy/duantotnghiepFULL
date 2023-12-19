var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var db = require('./../models/database');
const { userRegister } = require('../validates/user.validate');

/* GET users listing. */
router.post('/register', async function (req, res, next) {
	try {
		/* validate */
		const { error } = userRegister.validate(req.body, { abortEarly: false });
		if (error) {
			console.log('🚀 ~ file: users.js:14 ~ error:', error);
			const errors = error.details.map((err) => err.message);
			return res.status(400).json({ errors });
		}

		/* check email exist */
		const { email } = req.body;
		/* hash password */
		const salt = await bcrypt.genSalt(10);
		console.log('🚀 ~ file: users.js:26 ~ salt:', salt);
		const passwordHash = await bcrypt.hash(req.body.password, salt);

		/* create user */
		const result = await db.query(
			'INSERT INTO `users` (email, password) VALUES (?, ?);',
			[email, passwordHash]
		);
		return res.status(200).json({ message: 'User registered successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.post('/login', async function (req, res, next) {
	try {
		const { email, password } = req.body;

		/* check email exist */
		db.query('SELECT * FROM users WHERE email = ?', [email], (error, data) => {
			if (error) {
				console.log('🚀 ~ file: users.js:44 ~ db.query ~ error:', error);
				return res
					.status(400)
					.json({ message: 'Email or password is incorrect' });
			}

			/* check password */
			bcrypt.compare(password, data[0].password, (err, isMatch) => {
				if (err || !isMatch) {
					return res
						.status(400)
						.json({ message: 'Email or password is incorrect' });
				}

				/* create token */
				const token = jwt.sign({ id: data[0].id }, '123456');
				const { password: _, ...userInfo } = data[0];
				return res.status(200).json({ accessToken: token, ...userInfo });
			});
		});
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;
