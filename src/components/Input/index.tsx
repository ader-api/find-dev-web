import React, {
  InputHTMLAttributes,
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import {
  Container,
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, [isFocused]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, [isFocused, isFilled]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />
    </Container>
  );
}

export default Input;
