import FormNotFoundError from "../error/formNotFound.js";
import Form from "../model/Form.js";

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

async function getFormToFill(req, res, next) {
  try {
    const formId = req.params.id;
    const form = await Form.findById(formId);
    if (!form) {
      throw new FormNotFoundError("Form not found, invalid link.");
    }

    res.status(200).render("form.ejs", {
      formId: form._id,
      formFlow: form.flow,
      formThemeColor: form.theme.color,
    });
  } catch (error) {
    next(error);
  }
}

export { addFormDetails, getFormToFill };
