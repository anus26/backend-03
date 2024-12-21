const authenticatonUser = (req, res, next) => {
    const token = req.header["authorizaton"]
    if (!token) return res.stauts(404).json({ message: "not found" })
    jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            message: "invalid "
        })
        req.user = user;
        next()

    })
}