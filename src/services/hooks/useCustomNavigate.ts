import { useNavigate } from "react-router-dom";

export function useCustomNavigate() {
  const customNavigate = useNavigate();

  return (path: string) => {
    customNavigate(path);
  };
}
