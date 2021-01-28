import UserServices from "../services/user.service";
import BusinessOwnerServices from "../services/businessOwner.service"
import errorMessage from "../utils/errorMessage";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";
const {getBusinessOwnerByEmail,getBusinessOwnerByUsername}=BusinessOwnerServices
const { getUserByIdOrEmail,checkUsername } = UserServices;
const { errorResponse } = responses;
const { conflict } = statusCode;
const { duplicateEmail,duplicateUsername } = errorMessage;

const checkEmailExist = async (req, res, next) => {
  const user = await getUserByIdOrEmail(req.body.email);
  if (user) {
    return errorResponse(res, conflict, duplicateEmail);
  }
  return next();
};

const checkUsernameExist = async (req, res, next) => {
  const user = await checkUsername(req.body.username);
  if (user) {
    return errorResponse(res, conflict, duplicateUsername);
  }
  return next();
};

const checkOwnerEmail = async (req, res, next) => {
  const user = await getBusinessOwnerByEmail(req.body.email);
  if (user) {
    return errorResponse(res, conflict, duplicateEmail);
  }
  return next();
};

const checkOwnerUsername = async (req, res, next) => {
  const user = await getBusinessOwnerByUsername(req.body.username);
  if (user) {
    return errorResponse(res, conflict, duplicateUsername);
  }
  return next();
};

export default { checkEmailExist,checkUsernameExist,checkOwnerEmail,checkOwnerUsername };