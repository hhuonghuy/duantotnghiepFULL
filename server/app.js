var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
// const express = require('express');
const cors = require('cors');

const app = express();

const port = 4021; // Thay đổi cổng thành cổng bạn muốn

app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
		credentials: true,
	})
);
app.get('/:id', (req, res) => {
	const data = [
		{
			message: 'Dữ liệu từ máy chủ Node.js',
		},
	];
	res.json(data);
});
app.get('/productnew', (req, res) => {
	const data = [
		{
			message: 'Dữ liệu từ máy chủ Node.js',
		},
	];
	res.json(data);
});
// POST
app.post('/addproduct', (req, res) => {
	const {
		id,
		productname,
		urlimage,
		price,
		sortdes,
		description,
		uppdate,
		idtype,
		gentype,
		view,
		hot,
		date,
	} = req.body;

	const sql =
		'INSERT INTO product (id, productname, urlimage, price, sortdes, description, uppdate, idtype, gentype, view, hot, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	const values = [
		id,
		productname,
		urlimage,
		price,
		sortdes,
		description,
		uppdate,
		idtype,
		gentype,
		view,
		hot,
		date,
	];

	db.query(sql, values, (err, result) => {
		if (err) {
			console.error('Error:', err);
			res.status(500).json({ error: 'Unable to add product' });
		} else {
			res.status(201).json({ message: 'Product added successfully' });
		}
	});
});
//PUT
app.post('/updateproduct/:id', (req, res) => {
	const productId = req.params.id;
	const {
		productname,
		urlimage,
		price,
		sortdes,
		description,
		uppdate,
		idtype,
		gentype,
		view,
		hot,
		date,
	} = req.body;

	const sql =
		'UPDATE product SET productname=?, urlimage=?, price=?, sortdes=?, description=?, uppdate=?, idtype=?, gentype=?, view=?, hot=?, date=? WHERE id=?';
	const values = [
		productname,
		urlimage,
		price,
		sortdes,
		description,
		uppdate,
		idtype,
		gentype,
		view,
		hot,
		date,
		productId,
	];

	db.query(sql, values, (err, result) => {
		if (err) {
			console.error('Error:', err);
			res.status(500).json({ error: 'Unable to update product' });
		} else {
			res.status(200).json({ message: 'Product updated successfully' });
		}
	});
});

//DELETE
app.delete('/deleteproduct/:id', (req, res) => {
	const productId = req.params.id;

	const sql = 'DELETE FROM `product` WHERE id = ?';
	const values = [productId];

	db.query(sql, values, (err, result) => {
		if (err) {
			console.error('Error:', err);
			res.status(500).json({ error: 'Unable to delete product' });
		} else {
			res.status(200).json({ message: 'Product deleted successfully' });
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/product', productRouter);
/* router user */
// app.use('/api', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
