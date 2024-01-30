
import userDb from "../model/userSchema.js";
export const verifyAdmin = async (req, res, next) => {
    const { email } = req.decoded
    console.log(email,"email");
    const query = { email: email }
    try {
        const user = await userDb.findOne(query)
        const isAdmin = user?.role == 'admin'
        if (!isAdmin) {
            return res.status(403).json({message:"Forbidden access"})
        }
        next()
    }
    catch (error) {
        console.error(error);
    }
    
}