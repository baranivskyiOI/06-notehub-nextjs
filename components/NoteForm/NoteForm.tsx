"use client";
import { useId } from "react";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps {
  onClose: () => void;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

interface FormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const formValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const OrderSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required field"),
    content: Yup.string().max(500, "Too Long!"),
    tag: Yup.string().oneOf([
      "Todo",
      "Work",
      "Personal",
      "Meeting",
      "Shopping",
    ]),
  });

  const fieldId = useId();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (taskData: CreateNote) => createNote(taskData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      validationSchema={OrderSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
            as="select"
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
