import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  CircularProgress,
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

  const { mutate: like, isLoading: isLiking } = useMutation(
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

  const { mutate: unlike, isLoading: isUnliking } = useMutation(
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
        sx={{ ["& .MuiCardHeader-content"]: { width: "100%" } }}
        subheader={
          <Link href={fullLink} target="_blank">
            {fullLink}
          </Link>
        }
        titleTypographyProps={{
          sx: {
            overflowWrap: "break-word",
          },
        }}
        subheaderTypographyProps={{
          variant: "caption",
          sx: {
            overflowWrap: "break-word",
          },
        }}
      />
      {selfText?.length > 0 && (
        <>
          <Divider />
          <CardContent>
            <Typography variant="body2" sx={{ overflowWrap: "break-word" }}>
              {selfText}
            </Typography>
          </CardContent>
        </>
      )}
      <CardActions sx={{ px: 2, justifyContent: "space-between" }}>
        <Typography variant="overline">
          {score} vote{score > 1 && "s"}
        </Typography>
        {canLike &&
          (isLiking || isUnliking ? (
            <IconButton key="loading">
              <CircularProgress variant="indeterminate" size={24} />
            </IconButton>
          ) : (
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
          ))}
        {/* </Box> */}
      </CardActions>
    </Card>
  );
};

export default SubmissionCard;
