import userDb from "../model/userSchema.js";

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userDb.find();
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

//post users
export const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const userExist = await userDb.findOne(query);
    if (userExist) {
      return res.status(302).json({ message: "User already Exist" });
    }
    const result = await userDb.create(user);
    return res.status(201).json({result});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating new user");
  }
};


//delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.id
  try {
    const deleteUSer = await userDb.findByIdAndDelete(userId);
    if (!deleteUSer) {
      return res.status(404).json({message:"User Not Found"})
    }
    return res.status(201).json({ message:"User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting  user");
  }
};

//get Admin
export const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await userDb.findOne(query)
    if (email !== req.decoded.email) {
      return res.status(403).json({message:"Forbidden Access"})
    }
    let admin = false
    if (user) {
      admin = user?.role === "admin"
    }
    res.status(200).json({admin})

  } catch (error) {
    console.error(error);
    res.status(500).send("Error Getting Admin");
  }
};

//make admin a user

//get Admin
export const makeAdmin = async (req, res) => {
  const userId = req.params.id
  const {role} = req.body
  try {
    const updatedUser = await userDb.findByIdAndUpdate(userId,
      { role: "admin" },
      { new: true, runValidators: true })
    if (!updatedUser) {
      res.status(404).json({message:"User not Found"})
    }
    res.status(202).json({updatedUser})

  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating new user");
  }
};