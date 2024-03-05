import useSWR from "swr";
import AddTodo from "./components/AddTodo";
import axios from "axios";
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
  return (
    <div>
      {JSON.stringify(data)}
      <AddTodo mutate={mutate} />
    </div>
  );
}

export default App;
