import CustomServerError from './custom-error.js';
import { StatusCodes } from 'http-status-codes';



class BadRequestError extends CustomServerError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
export default BadRequestError
 