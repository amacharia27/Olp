// apps/frontend/src/components/InputWrapper.tsx
import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps, InputRef } from 'antd/lib/input';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import type { SearchProps } from 'antd/lib/input/Search';
import type { PasswordProps } from 'antd/lib/input/Password';

// Define the interface for our Input component with its subcomponents
interface CompoundedComponent extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<InputRef>>;
  Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<InputRef>>;
  Password: React.ForwardRefExoticComponent<PasswordProps & React.RefAttributes<InputRef>>;
}

// Create a wrapper for the standard Input component
const InternalInput = React.forwardRef<InputRef, InputProps>((props, ref) => {
  // Replace the deprecated 'bordered' prop with 'variant'
  const { bordered, ...restProps } = props;
  const variant = bordered === false ? 'borderless' : 'outlined';
  
  return <AntInput ref={ref} variant={variant} {...restProps} />;
});

// Create a wrapper for the TextArea component
const TextArea = React.forwardRef<InputRef, TextAreaProps>((props, ref) => {
  const { bordered, ...restProps } = props;
  const variant = bordered === false ? 'borderless' : 'outlined';
  
  return <AntInput.TextArea ref={ref} variant={variant} {...restProps} />;
});

// Create a wrapper for the Search component
const Search = React.forwardRef<InputRef, SearchProps>((props, ref) => {
  const { bordered, ...restProps } = props;
  const variant = bordered === false ? 'borderless' : 'outlined';
  
  return <AntInput.Search ref={ref} variant={variant} {...restProps} />;
});

// Create a wrapper for the Password component
const Password = React.forwardRef<InputRef, PasswordProps>((props, ref) => {
  const { bordered, ...restProps } = props;
  const variant = bordered === false ? 'borderless' : 'outlined';
  
  return <AntInput.Password ref={ref} variant={variant} {...restProps} />;
});

// Create the compound component
const Input = InternalInput as CompoundedComponent;
Input.TextArea = TextArea;
Input.Search = Search;
Input.Password = Password;

export default Input;
