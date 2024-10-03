 import User from '../models/users';

 exports.createUser = async (req, res) => {
    try {
        const user = await User.User(req.body);
        res.status(201).json(user); 
    } catch (error) {
        res.status(500).json({ message: 'oh ohhh Error creating user :(' })
    }
 };
