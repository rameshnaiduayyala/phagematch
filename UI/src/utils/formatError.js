export const formatApiError = (error) => {
  if (!error) return "Something went wrong";

  // Handle Django's `detail` message
  if (error.detail) {
    return error.detail;
  }

  // Handle field-specific errors
  if (typeof error === "object" && !Array.isArray(error)) {
    return Object.entries(error)
      .map(([field, messages]) => {
        const label = field === "non_field_errors" ? "Error" : field;

        if (!messages) return label;

        // Ensure messages is an array
        const msgArray = Array.isArray(messages) ? messages : [messages];

        // return `${label.charAt(0).toUpperCase() + label.slice(1)}: ${msgArray.join(", ")}`;
        return `${msgArray.join(", ")}`;
      })
      .join("\n");
  }

  // Handle plain string
  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
};
