import EmptyRequestFieldError from "../error/emptyRequestField.js";
import InvalidRequestFieldDataError from "../error/invalidRequestFieldData.js";
import FormResponse from "../model/FormResponse.js";

function checkForEmptyFields(req) {
  const { responseId, flowElementName, flowElementValue } = req.body;

  if (!responseId) {
    throw new EmptyRequestFieldError("responseId is empty.");
  }

  if (!flowElementName) {
    throw new EmptyRequestFieldError("flowElementName is empty.");
  }

  if (!flowElementValue) {
    throw new EmptyRequestFieldError("flowElementValue is empty.");
  }
}

async function checkForValidResponseId(responseId) {
  const response = await FormResponse.findById(responseId);
  if (!response) {
    console.error(`Invalid responseId - ${responseId}`);
    throw new InvalidRequestFieldDataError("Invalid responseId.");
  }
}

async function validateFormResponse(req, res, next) {
  try {
    checkForEmptyFields(req);
    await checkForValidResponseId(req.body.responseId);
    next();
  } catch (error) {
    next(error);
  }
}

export default validateFormResponse;
