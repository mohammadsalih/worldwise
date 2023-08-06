import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function BackButton() {
  const navitage = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navitage(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
