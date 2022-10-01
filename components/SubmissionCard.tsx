import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import type { CardProps } from "@mui/material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

const SubmissionCard = ({
  id,
  title,
  fullLink,
  selfText = "",
  score = 0,
  favorite,
  canLike,
  queryKey,
  ...props
}: {
  id: string;
  title: string;
  fullLink: string;
  selfText: string;
  score: number;
  favorite?: boolean;
  canLike?: boolean;
  queryKey: string;
} & CardProps) => {
  const queryClient = useQueryClient();

  const filters = useContext(FilterContext);

  const { mutate: like } = useMutation(
    () => axios.post(`/api/favorites/${id}`),
    {
      onSuccess: () => {
        queryClient.setQueryData([queryKey, filters], (_data: any = {}) => {
          const _newData = [...(_data?.data || [])];

          const idx = _newData.findIndex((_d: any) => _d.id === id);

          if (idx >= 0) {
            _newData.splice(idx, 1, { ..._newData[idx], favorite: true });
          }

          return { ..._data, data: _newData };
        });
      },
    }
  );

  const { mutate: unlike } = useMutation(
    () => axios.delete(`/api/favorites/${id}`),
    {
      onSuccess: () => {
        queryClient.setQueryData([queryKey, filters], (_data: any = {}) => {
          const _newData = [...(_data?.data || [])];

          const idx = _newData.findIndex((_d: any) => _d.id === id);

          if (idx >= 0) {
            _newData.splice(idx, 1, { ..._newData[idx], favorite: false });
          }

          return { ..._data, data: _newData };
        });
      },
    }
  );

  return (
    <Card {...props}>
      <CardHeader
        title={title}
        subheader={<Link href={fullLink}>{fullLink}</Link>}
      />
      {selfText?.length > 0 && (
        <>
          <Divider />
          <CardContent>
            <Typography>{selfText}</Typography>
          </CardContent>
        </>
      )}
      <CardActions sx={{ px: 2, justifyContent: "space-between" }}>
        <Typography variant="overline">
          {score} vote{score > 1 && "s"}
        </Typography>
        {canLike && (
          <>
            {favorite ? (
              <IconButton key="1" onClick={() => unlike()} color="error">
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton key="0" onClick={() => like()}>
                <FavoriteBorderIcon />
              </IconButton>
            )}
          </>
        )}
        {/* </Box> */}
      </CardActions>
    </Card>
  );
};

export default SubmissionCard;
