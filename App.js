import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./utils/router";

export default function App() {
  const routing = useRoute({});
  return <NavigationContainer>{routing}</NavigationContainer>;
}
