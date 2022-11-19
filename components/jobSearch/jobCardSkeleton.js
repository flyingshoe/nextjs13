import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Skeleton,
} from "@mui/material";

const iconSize = 70;

export default function JobCardSkeleton() {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={iconSize}
              height={iconSize}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={20}
              width="90%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <Skeleton
              animation="wave"
              height={20}
              width="90%"
              style={{ marginBottom: 6 }}
            />
          }
        ></CardHeader>
        <CardContent>
          <Skeleton
            sx={{ height: 73 }}
            animation="wave"
            variant="rectangular"
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
