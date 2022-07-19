export interface FormInterface {
  // Default input options
  type?: string;
  position?: string;
  accept?: string;

  // Checkbox options
  check?: boolean;

  // Select options
  select?: boolean;
  okText?: string;
  multiple?: boolean;
  placeholder?: string;
  options?: any[];

  // General options
  name?: string;
  field?: string;
  answer?: any;
  required?: boolean;
  size?: number;
  offset?: number;
}
