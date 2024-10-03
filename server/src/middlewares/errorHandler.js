 export default (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Oops something went wrong :( !'});
 };
