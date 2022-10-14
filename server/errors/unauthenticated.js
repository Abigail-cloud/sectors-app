import CustomServerError from './custom-error.js';
import { StatusCodes } from 'http-status-codes';



class UnAuthenticatedError extends CustomServerError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
export default UnAuthenticatedError