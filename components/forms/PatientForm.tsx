"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
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
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"

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
 

 
const  PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name , email , phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    try {
      // const userData = {name , email , phone}

      // const user = await createUser()

      // if(user){
      //   router.push(`/patients/${user.$id}/register`)
      // }
    } catch (error) {
      console.log(error)
    }
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
        <CustomFormFeild 
        fieldType = {FormFieldTypes.INPUT}
        name="email"
        label="Email"
        placeholder="ayushnamin@gmail.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt = "email"
        control={form.control} 
        />
        <CustomFormFeild 
        fieldType = {FormFieldTypes.PHONE_INPUT}
        name="phone"
        label="Phone Number"
        placeholder="(+91) 1234567890"
        iconSrc = "/assets/icons/email.svg"
        iconAlt = "email"
        control={form.control} 
        />
        <SubmitButton isLoading={isLoading}>

          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
