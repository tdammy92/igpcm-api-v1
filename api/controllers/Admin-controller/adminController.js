const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../../Database/model/adminModel");



//admin login controller
async function Login(req, res) {
	//verify email and password;
	const admin = await adminModel.findOne({ email: req.body.email });

	if (!admin) return res.status(404).send("Invalid email address");

	//verify password
	const verifyPassword = await bcrypt.compare(req.body.password, admin.password);
	if (verifyPassword === false) return res.status(304).send("Invalid password");

	const token = await jwt.sign({ _id: admin._id }, process.env.JWT_SECRET_KEY);

	admin.password = undefined;

	//send back  userDetails after login

	return res.status(200).send({
		data: {
			...admin,
		},

		token,
	});
}



//admin register controller
async function Register(req, res) {
	//creating a validation schema for Joi to validate
console.log(req.body);
	const schema = Joi.object({
		username: Joi.string().min(5).max(8).required(),
		email: Joi.string().email().required(),
		password: Joi.string()
			.min(6)
			.alphanum()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
			.required(),
	});

	//validating the schema
	const { error } = await schema.validate(req.body);
	const err = error?.details[0]?.message;

	//if the schema returns an error the code will stop here
	if (err) {
		return res.status(500).send(err);
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

	const newAdmin = new adminModel({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	});

	newAdmin
		.save()
		.then((user) => {
			return res.status(201).send(user);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).send(err);
		});
}


module.exports = { Login, Register };