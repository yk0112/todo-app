import useSWR from "swr";
import AddTodo from "./components/AddTodo";
import axios from "axios";
import { List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Button from "./components/Button";
export const ENDPOINT = "http://localhost:4000";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

const fetcher = (url: string): Promise<Todo[]> => {
  return axios.get(`${ENDPOINT}/${url}`).then((respons) => respons.data);
};

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  const markDone = (id: number) => {
    axios
      .patch(`${ENDPOINT}/api/todos/${id}/done`)
      .then((respons) => mutate(respons.data));
  };

  return (
    <div className="grid w-3/6 mx-auto mt-3 gap-3">
      <List
        header={<p className="text-lg font-sans">TODO LIST</p>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[<Button onClick={() => markDone(item.id)}>DONE</Button>]}
          >
            <List.Item.Meta
              avatar={
                item.done ? (
                  <CheckCircleOutlined
                    style={{ fontSize: "25px", color: "#52c41a" }}
                  />
                ) : (
                  <CheckCircleOutlined
                    style={{ fontSize: "25px", color: "gray" }}
                  />
                )
              }
              title={item.title}
              description={item.body}
            />
          </List.Item>
        )}
      />
      <AddTodo mutate={mutate} />
    </div>
  );
}

export default App;
