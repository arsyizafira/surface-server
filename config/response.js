Response_data = {
	ok: (values, res, message, page, total) => {
		let data = {
			'success': true,
			'status': 200,
			'data': values,
			'message': message,
			'page': page,
			'total_page': total

		}
		res.json(data);
		res.end();
	},
	error: (errcode, message, res, err) => {
		let data = {
			'success': false,
			'status': errcode,
			'message': message,
			'error': err

		}
		res.json(data);
		res.end();
	},
	success: (message, res, token) => {
		var data = {
			'success': true,
			'status': 200,
			'message': message,
			'token': token

		}
		res.json(data);
		res.end();
	}
}

module.exports = Response_data;
