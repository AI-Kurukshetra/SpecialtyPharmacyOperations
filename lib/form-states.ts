export type ActionFormState = {
  message: string;
  fieldErrors: Record<string, string>;
  values: Record<string, string>;
  checks: Record<string, boolean>;
};

function createFormState(): ActionFormState {
  return {
    message: "",
    fieldErrors: {},
    values: {},
    checks: {},
  };
}

export const initialPatientFormState = createFormState();
export const initialWorkflowFormState = createFormState();
