import njwt from "njwt";
import dotenv from "dotenv";
dotenv.config();

const extractid = (headers) => {
  const token = headers.authorization.split(" ")[1];
  return njwt.verify(token, process.env.SECRET);
};

export default extractid;
