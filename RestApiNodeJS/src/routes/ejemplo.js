const { Router } = require('express');
const router = Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

//conectandome a una base de datos de otro lado
router.get('/', async (req, res) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');   
	const users= await response.json();
	console.log(users);
	res.json(users);
});


module.exports = router;
