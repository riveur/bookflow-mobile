import * as React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { Label, ViewProps, YStack, Form as DefaultForm } from 'tamagui';
import { Text, TextProps } from '@/components/ui/Text';
import { View } from '@/components/ui/View';

const Form = FormProvider

const FormContent = DefaultForm

const FormTrigger = DefaultForm.Trigger;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  React.ElementRef<typeof YStack>,
  React.ComponentPropsWithoutRef<typeof YStack>
>((props, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <YStack ref={ref} gap={props.gap || "$2"} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({style, ...props}, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      color={error ? "red" : props.color}
      style={[style, { lineHeight: undefined }]}
      {...props}
    />
  )
});
FormLabel.displayName = "FormLabel";

const FormControl = (props: ViewProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <View
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      asChild
      {...props}
    />
  )
}

const FormDescription = (props: TextProps) => {
  const { formDescriptionId } = useFormField()

  return (
    <Text
      id={formDescriptionId}
      {...props}
    />
  )
}

const FormMessage = ({ children, style, ...props }: TextProps) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <Text
      color="red"
      id={formMessageId}
      {...props}
    >
      {body}
    </Text>
  )
}

export {
  useFormField,
  Form,
  FormContent,
  FormTrigger,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
