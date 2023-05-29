export function getErrorMessage(
  formattedErrors: any,
  controlErrors: any,
  formControlDisplayName?: string
) {
  const errors = Object.keys(controlErrors || {});

  if (errors.length) {
    const validatorName: string = errors[0];
    const validationData: any = (controlErrors || {})[validatorName];
    const messager: any = formattedErrors[validatorName];

    return messager
      ? messager(formControlDisplayName, validationData).trim()
      : '';
  }

  return '';
}
