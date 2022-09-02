import { useState } from "react";
import { Container, Stack, Typography, LinearProgress } from "@mui/material";

import EmbeddedInput from "components/Embedded/EmbeddedInput";
import EmbeddedItem from "components/Embedded/EmbeddedItem";
import EmbeddedData from "models/EmbeddedData";

import useAsync from "hooks/useAsync";
import { getEmbeddedData } from "services/Embedded";
import { AxiosError } from "axios";

const EmbeddedPage = () => {
  const [embeddedInput, setEmbeddedInput] = useState<string>("");

  const {
    execute,
    status,
    error,
    value: embeddedData,
  } = useAsync<EmbeddedData[], AxiosError<{ message: string }>>(
    () => getEmbeddedData(embeddedInput),
    false
  );

  let results = null;
  if (status === "pending") {
    results = <LinearProgress></LinearProgress>;
  } else if (status === "error") {
    results = <>{error?.response?.data.message}</>;
  } else if (status === "success") {
    results = (
      <Stack spacing={2}>
        {embeddedData &&
          embeddedData.map((data) => (
            <EmbeddedItem data={data} key={data.url}></EmbeddedItem>
          ))}
      </Stack>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <EmbeddedInput
        onSubmit={execute}
        input={embeddedInput}
        setInput={setEmbeddedInput}
      ></EmbeddedInput>
      <Typography>Results: </Typography>
      {results}
    </Container>
  );
};

export default EmbeddedPage;
