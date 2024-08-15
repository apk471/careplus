"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormFeild from "../CustomFormFeild";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DATE_PICKER = "datePicker",
  TIME = "time",
  PHONE_INPUT = "phoneInput",
  SKELETON = "skeleton",
}

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      console.log({ user });

      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself. </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormFeild
          fieldType={FormFieldTypes.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          control={form.control}
        />

        <div className=" flex flex-col gap-7  xl:flex-row">
          <CustomFormFeild
            fieldType={FormFieldTypes.INPUT}
            name="email"
            label="Email"
            placeholder="ayushnamin@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            control={form.control}
          />
          <CustomFormFeild
            fieldType={FormFieldTypes.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="(+91) 1234567890"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            control={form.control}
          />
        </div>

        <div className="flex flex-co gap-6 xl:flex-row">
          <CustomFormFeild
            fieldType={FormFieldTypes.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            control={form.control}
          />
          <CustomFormFeild
            fieldType={FormFieldTypes.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            control={form.control}
          />
        </div>
        <div className="flex flex-co gap-6 xl:flex-row"></div>
        <div className="flex flex-co gap-6 xl:flex-row"></div>
        <div className="flex flex-co gap-6 xl:flex-row"></div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
