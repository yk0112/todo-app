import "./App.css";
import useSWR from "swr";

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) => {
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());
};

function App() {
  const { data } = useSWR("api/todos", fetcher);
  return <p>{JSON.stringify(data)}</p>;
}

export default App;