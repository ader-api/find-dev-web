import React, {
  SelectHTMLAttributes,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container } from './styles'

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
  first_option: string;
  styledContainer?: object;
}

const Select: React.FC<ISelectProps> = ({
  name,
  options,
  first_option,
  styledContainer = {},
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, [selectRef]);

  useEffect(() => {
    registerField(({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    }))
  }, [registerField, fieldName]);

  return  (
    <Container isFocused={isFocused} isFilled={isFilled} style={styledContainer}>
      <select
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="">{first_option}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <FiChevronDown size={20} />
    </Container>
  );
}

export default Select;
