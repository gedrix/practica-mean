const { Router } = require('express');

const router = Router();
const jwt = require('jsonwebtoken');

//modelo
const User = require('../models/User');

router.get('/', (req, res) => res.send('Hello word'));

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const objUser = new User({email, password});
    await objUser.save();
		const token = await jwt.sign({_id: objUser._id}, 'palabraSecreta.@');
    res.status(200).json({token});
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(401).send('El email no existe');
    if (user.password !== password) return res.status(401).send('Password incorrecta');

		const token = jwt.sign({_id: user._id}, 'palabraSecreta.@');

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'description tarea 1',
            date: "2021-05-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'description tarea 2',
            date: "2021-05-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'description tarea 3',
            date: "2021-05-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one privates",
            description: 'description tarea 1',
            date: "2021-05-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two private",
            description: 'description tarea 2',
            date: "2021-05-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three private",
            description: 'description tarea 3',
            date: "2021-05-06T15:50:18.921Z"
        },
    ])
});
//en la cabecera o header se coloca en key => authorization y en value se antepone Bearer y despues el token
async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('No tienes autirizacion');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('No tienes autirizacion');
		}

		const data = await jwt.verify(token, 'palabraSecreta.@');
		if (!data) {
			return res.status(401).send('No tienes autirizacion');
		}
		req.userId = data._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('No tienes autirizacion');
	}
}


module.exports = router;