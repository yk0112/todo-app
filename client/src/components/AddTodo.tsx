import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import Input from "./input/Input";
import TextArea from "./input/TextArea";
import Button from "./Button";
import { ENDPOINT, Todo } from "../App";
import axios from "axios";
import { KeyedMutator } from "swr";

interface AddTodoProps {
  mutate: KeyedMutator<Todo[]>;
}

const AddTodo: React.FC<AddTodoProps> = ({ mutate }) => {
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
    axios
      .post(`${ENDPOINT}/api/todos`, data)
      .then((response) => mutate(response.data));
    setOpen(false);
  };

  return (
    <div>
      <Modal
        title="Create TODO"
        open={isOpen}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
        footer={null}
      >
        <form id="submit" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required={false}
            id="title"
            label="Todo"
            placeholder="What shoild you do?"
          />
          <TextArea
            disabled={isLoading}
            register={register}
            errors={errors}
            required={false}
            id="body"
            label="Body"
            placeholder="Write more detail..."
          />
          <div className="flex mt-6 gap-6 justify-end">
            <Button
              disabled={isLoading}
              secondary
              onClick={() => setOpen(false)}
            >
              キャンセル
            </Button>
            <Button disabled={isLoading} type="submit">
              保存
            </Button>
          </div>
        </form>
      </Modal>
      <Button fullwidth onClick={() => setOpen(true)}>
        ADD TODO
      </Button>
    </div>
  );
};

export default AddTodo;
