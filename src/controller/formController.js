import FormNotFoundError from "../error/formNotFound.js";
import InvalidIdError from "../error/invalidId.js";
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

async function updatedFormDetails(req, res, next) {
  try {
    const formId = req.params.id;
    const formDetailsToUpdate = {
      ...req.body,
    };
    console.debug(
      `form-details to update ${formDetailsToUpdate} for formId ${formId}`
    );
    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      formDetailsToUpdate
    );
    if (!updatedForm) {
      throw new InvalidIdError("Invalid formId.");
    }

    res.status(200).json({
      status: "Success",
      message: "Form updated successfully",
      formShareDetails: {
        formId: form._id,
        link: `http://localhost:4000/form/userInput/${form._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function deleteForm(req, res, next) {
  try {
    const formId = req.params.id;
    console.debug(`deleting form for formId: ${formId}`);
    await deleteResponseForFormIds([formId]);
    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      throw new InvalidIdError("invalid form id");
    }

    res.status(200).json({
      status: "Success",
      message: "Form deleted successfully",
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
  let emptyInputCount = 0;
  for (let key in existingInputsValue) {
    console.debug(`key ${key} and value ${existingInputsValue[key]}`);
    if (!existingInputsValue[key]) {
      emptyInputCount++;
    }
  }

  const state = emptyInputCount === 1 ? "COMPLETED" : "STARTED";
  return state;
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

async function deleteResponseForFormIds(formIds) {
  try {
    console.debug(`deleting formResponse for formIds ${formIds}`);
    await FormResponse.deleteMany({ refFormId: { $in: formIds } });
  } catch (error) {
    console.error(`Error in deletion the response with formIds: ${formIds}`);
    throw error;
  }
}

async function deleteFormsUnderFolder(folderId) {
  try {
    const formIds = await Form.find({ refFolderId: folderId }).select("_id");
    console.debug(
      `forms will be deleted for ids ${formIds} under folderId ${folderId}`
    );
    await deleteResponseForFormIds(formIds);
    await Form.deleteMany({ refFolderId: folderId });
  } catch (error) {
    console.error(`Error in deleting forms under folderId : ${folderId}`);
    throw error;
  }
}

export {
  addFormDetails,
  getFormToFill,
  saveFormResponse,
  deleteFormsUnderFolder,
  updatedFormDetails,
  deleteForm,
};
