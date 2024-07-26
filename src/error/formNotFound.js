class FormNotFoundError extends Error {
  statusCode = 400;

  constructor(message = "Form not found") {
    super(message);
  }
}

export default FormNotFoundError;
