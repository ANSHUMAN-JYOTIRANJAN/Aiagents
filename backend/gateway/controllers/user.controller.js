const curruser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `user  not found ${error}` });
  }
};
export default curruser;