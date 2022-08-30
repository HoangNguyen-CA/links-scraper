import { Card, CardContent, Typography } from "@mui/material";

import EmbeddedData from "models/EmbeddedData";

type Props = {
  data: EmbeddedData;
};

const EmbeddedItem = (props: Props) => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardContent>
        {props.data.url && <Typography> URL: {props.data.url}</Typography>}
        {props.data.title && (
          <Typography> Title: {props.data.title}</Typography>
        )}
        {props.data.favicon && (
          <Typography> Favicon: {props.data.favicon}</Typography>
        )}
        {props.data.image && (
          <Typography> Image: {props.data.image}</Typography>
        )}

        {props.data.author && (
          <Typography> Author: {props.data.author}</Typography>
        )}
        {props.data.description && (
          <Typography> Description: {props.data.description}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EmbeddedItem;
