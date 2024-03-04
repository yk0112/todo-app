import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import Input from "./input/Input";

const AddTodo = () => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  };

  return (
    <Modal
      title="TODOの追加"
      open={true}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
    >
      <form id="submit" onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          required={false}
          id="title"
          label="タイトル"
        />
      </form>
    </Modal>
  );
};

export default AddTodo;
