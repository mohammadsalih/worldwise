import { useNavigate } from "react-router-dom";

function useGoToForm() {
  const navigate = useNavigate();

  return ({ lat, lng }) => {
    navigate({
      pathname: "form",
      search: `?lat=${lat}&lng=${lng}`,
    });
  };
}

export default useGoToForm;
