var express = require('express');
var router = express.Router();
var db = require('./../models/database');

router.get('/productnew', function (req, res, next) {
	db.query(
		'SELECT * FROM product ORDER BY date DESC LIMIT 0,4',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});

router.get('/producthot', function (req, res, next) {
	db.query(
		'select * from product WHERE hot=1 ORDER BY  date DESC LIMIT 0,6',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});

router.get('/phukien', function (req, res, next) {
	db.query(
		'select * from product WHERE idtype=4 ORDER BY date DESC LIMIT 0,6',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});

router.get('/aopolo', function (req, res, next) {
	db.query(
		'select * from product WHERE idtype=2 ORDER BY date DESC LIMIT 0,6',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});
router.get('/aothun', function (req, res, next) {
	db.query(
		'select * from product WHERE idtype=1 ORDER BY date DESC LIMIT 0,6',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});
router.get('/aosomi', function (req, res, next) {
	db.query(
		'select * from product WHERE idtype=3 ORDER BY date DESC LIMIT 0,6',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});
router.get('/phukien1', function (req, res, next) {
	db.query(
		'select * from product WHERE idtype=4 ORDER BY date DESC LIMIT 0,6',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});
router.get('/productmen', function (req, res, next) {
	db.query(
		'select * from product WHERE gentype=1 ORDER BY date DESC LIMIT 0,2',
		(err, data) => {
			if (err) throw new Error(err);
			res.json(data);
		}
	);
});
router.get('/allproduct', function (req, res, next) {
	db.query(`select * from product`, (err, data) => {
		if (err) {
			throw new Error(err);
		} else {
			res.json(data);
		}
	});
});

router.get('/:id', function (req, res, next) {
	let id = req.params.id;
	db.query(`select * from product WHERE id=${id}`, (err, data) => {
		if (err) throw new Error(err);
		res.json(data);
	});
});
router.get('/detail/:id', function (req, res, next) {
	let id = req.params.id;
	db.query(`select * from product WHERE id=${id}`, (err, data) => {
		if (err) throw new Error(err);
		res.json(data);
	});
});
router.get('/type/:id', function (req, res, next) {
	let id = req.params.id;
	db.query(`select * from product WHERE idtype=${id}`, (err, data) => {
		if (err) throw new Error(err);
		res.json(data);
	});
});
// route thêm xóa sửa
//thêm
router.post('/addproduct', (req, res) => {
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
		'INSERT INTO `product` (id, productname, sortdes, description, urlimage, uppdate, price, idtype, gentype, view, hot, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

	const values = [
		id,
		productname,
		sortdes,
		description,
		urlimage,
		uppdate,
		price,
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

router.put('/updateproduct/:id', (req, res) => {
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
		'UPDATE `product` SET productname=?, urlimage=?, price=?, sortdes=?, description=?, uppdate=?, idtype=?, gentype=?, view=?, hot=?, date=? WHERE id=?';
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
// router.put('/updateproduct/:id', (req, res) => {
//   const productId = req.params.id;
//   const updateValues = req.body; // Lấy tất cả giá trị mới từ yêu cầu

//   // Xây dựng truy vấn UPDATE động với các cột được chỉ định trong req.body
//   const updateColumns = Object.keys(updateValues);
//   const sql = `UPDATE \`product\` SET ${updateColumns.map(column => `${column} = ?`).join(', ')} WHERE id = ?`;

//   // Tạo mảng giá trị cho các cột cần cập nhật và thêm ID của sản phẩm vào cuối
//   const values = [...Object.values(updateValues), productId];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error:', err);
//       res.status(500).json({ error: 'Unable to update product' });
//     } else {
//       res.status(200).json({ message: 'Product updated successfully' });
//     }
//   });
// });

//xóa
router.delete('/deleteproduct/:id', (req, res) => {
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

module.exports = router;
