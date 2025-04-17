import { Input, type InputProps } from '@/components/forms/input'
import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
} & Omit<InputProps, 'value' | 'onChange'> &
  Omit<UseControllerProps<T>, 'control' | 'defaultValue' | 'rules'>

export const FormInput = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, disabled, name, shouldUnregister })

  return <Input error={error?.message} {...field} {...restProps} />
}
