const UserServices = require('../services/user.services');

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            return res.status(400).json({ status: false, error: `UserName ${email} is already registered.` });
        }
        const response = await UserServices.registerUser(email, password);
        res.json({ status: true, success: 'User registered successfully' });
    } catch (err) {
        console.log("---> err -->", err);
        res.status(500).json({ status: false, error: 'Registration failed. Please try again later.' });
    }
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, error: 'Invalid input parameters.' });
        }
        
        let user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, error: 'User does not exist.' });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: false, error: 'Incorrect username or password.' });
        }

        // Creating Token
        let tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h");

        res.status(200).json({ status: true, success: "Login successful", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        res.status(500).json({ status: false, error: 'Login failed. Please try again later.' });
    }
}
