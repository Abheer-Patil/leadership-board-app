function createResponse({ code, message, data }) {
  return {
    status: "SUCCESS",
    code: code,
    message: message,
    data: data,
  };
}

function createErrorResponse({ code, message, data }) {
  return {
    status: "ERROR",
    code: code,
    message: message,
    data: data,
  };
}

module.exports = {
  createErrorResponse,
  createResponse,
};
