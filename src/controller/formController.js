import FormNotFoundError from "../error/formNotFound.js";
import Form from "../model/Form.js";
import FormResponse from "../model/FormResponse.js";

async function addFormDetails(req, res, next) {
  try {
    const form = new Form({ ...req.body });
    await form.save();
    res.status(201).json({
      status: "Success",
      message: "Form added successfully",
      formShareDetails: {
        formId: form._id,
        link: `http://localhost:4000/form/userInput/${form._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
}

function createInputsValueForNewFormResponse(formFlow) {
  const inputsValue = {};
  for (let flow of formFlow) {
    if (flow.type.startsWith("input")) {
      inputsValue[flow.name] = "";
    }
  }

  return inputsValue;
}

async function getFormToFill(req, res, next) {
  try {
    const formId = req.params.id;

    const form = await Form.findById(formId);
    if (!form) {
      throw new FormNotFoundError("Form not found, invalid link.");
    }

    const newResponse = new FormResponse({
      inputsValue: createInputsValueForNewFormResponse(form.flow),
      refFormId: formId,
    });
    await newResponse.save();

    res.status(200).render("form.ejs", {
      formId: form._id,
      responseId: newResponse._id,
      formFlow: form.flow,
      formThemeColor: form.theme.color,
    });
  } catch (error) {
    next(error);
  }
}

function getFormResponseState(existingInputsValue) {
  for (let key in existingInputsValue) {
    if (!existingInputsValue[key]) {
      return "STARTED";
    }
  }

  return "COMPLETED";
}

function createUpdatedFormResponse(
  existingFormResponse,
  flowElementName,
  flowElementValue
) {
  const existingInputsValue = existingFormResponse.inputsValue;
  const inputsValue = {
    ...existingInputsValue,
    [flowElementName]: flowElementValue,
  };

  const state = getFormResponseState(existingInputsValue);

  const updatedFormResponse = {
    inputsValue,
    state,
  };

  if (existingFormResponse.state === "EMPTY") {
    updatedFormResponse.submittedAt = new Date();
  }

  console.debug(
    `updated form reponse after adding element ${flowElementName}, value ${flowElementValue}: ${JSON.stringify(
      updatedFormResponse
    )}`
  );
  return updatedFormResponse;
}

async function saveFormResponse(req, res, next) {
  try {
    const { responseId, flowElementName, flowElementValue } = req.body;
    const response = await FormResponse.findById(responseId);
    const updatedResponse = createUpdatedFormResponse(
      response,
      flowElementName,
      flowElementValue
    );
    const updatedResponseFromDb = await FormResponse.findByIdAndUpdate(
      responseId,
      updatedResponse
    );
    if (!updatedResponseFromDb) {
      throw new Error("Some error in updating form response");
    }

    res.status(200).json({
      status: "Success",
      message: "Response updated successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export { addFormDetails, getFormToFill, saveFormResponse };
