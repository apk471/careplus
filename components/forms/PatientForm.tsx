"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormFeild from "../CustomFormFeild"

export enum FormFieldTypes {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    DATE_PICKER = 'datePicker',
    TIME = 'time',
    PHONE_INPUT = 'phoneInput',
    SKELETON = 'skeleton',

}
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const  PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Sechudle your first appointment</p>
        </section>
        <CustomFormFeild 
        fieldType = {FormFieldTypes.INPUT}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        iconSrc = "/assets/icons/user.svg"
        iconAlt = "user"
        control={form.control} 
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PatientForm
