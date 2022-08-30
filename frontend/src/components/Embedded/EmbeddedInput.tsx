import { TextField, Button, Box } from "@mui/material";

type Props = {
  onSubmit: () => Promise<void>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const EmbeddedInput = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setInput(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        label="Text"
        multiline
        fullWidth
        minRows={4}
        value={props.input}
        onChange={handleChange}
      />
      <Button variant="contained" size="large" onClick={props.onSubmit}>
        Get Embedded
      </Button>
    </Box>
  );
};

export default EmbeddedInput;
