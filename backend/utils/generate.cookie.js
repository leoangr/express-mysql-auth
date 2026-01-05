import jwt from "jsonwebtoken";

export const generateCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
		httpOnly: true,
		secure: process.env.COOKIE_SECURE,
		sameSite: process.env.COOKIE_SAMESITE,
		maxAge: 1 * 24 * 60 * 60 * 1000, //1 Day
	});

    return token;
}