const { codes } = require("../helper/responseCode");
/**
 * Service for Sending Structure Responses
 */

class ResponseService {

  /**
   * Sends a structured response.
   * @param {Object} options - The options for the response.
   * @param {Array} options.status - The status code and status text.
   * @param {any} [options.data='No Data'] - The data to be sent in the response.
   * @param {string} [options.message=null] - The message to be sent in the response.
   * @param {Object} res - The Express response object.
   */

  static send(options, res) {
    const message = options.message || null;
    const response = {};
    const statusCode = options.status[0];
    const statusText = options.status[1];

    response.code = statusCode;
    response.data = options.data || "No Data";
    response.status = statusText;
    response.message = message;

    res.status(response.code).send(response);
  }

  /**
   * Gets the status code and status text for a given code.
   * @param {string} code - The code to get the status for.
   * @returns {Object} The status code and status text.
   */
  
  static getCode(code) {
    return codes[code];
  }
}

module.exports = ResponseService;
