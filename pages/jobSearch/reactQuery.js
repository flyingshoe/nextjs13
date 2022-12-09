import { Edit, Refresh } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import FabWrapper from "../../components/FabWrapper";
import JobCard from "../../components/jobSearch/jobCard";
import JobCardSkeleton from "../../components/jobSearch/jobCardSkeleton";

const baseParam = { limit: 40, page: 0 };
const baseData = {
  sortBy: ["new_posting_date"],
};
const defaultData = [
  { search: "frontend", salary: 6500 },
  { search: "front end", salary: 6500 },
  { search: "react", salary: 6500 },
];

export default function ReactQuery() {
  const axios = require("axios");

  const req = async () => {
    const allRes = await Promise.allSettled(
      defaultData.map((data) =>
        axios.post(
          "/api/findJob/v2/search",
          {
            ...baseData,
            ...data,
          },
          {
            params: baseParam,
          }
        )
      )
    );

    // Merge all data
    let allData = [];
    for (const res of allRes) {
      allData = [...allData, ...res.value.data.results];
    }

    // Filter out duplicates
    const uniqueIds = [];
    allData = allData.filter((data) => {
      if (uniqueIds.includes(data.uuid)) {
        return false;
      }
      uniqueIds.push(data.uuid);
      return true;
    });

    // Add a unix timestamp to make it easier to sort
    allData = allData.map((data) => ({
      ...data,
      unix: new Date(data.metadata.newPostingDate).valueOf(),
    }));

    // Sort according to Unix timestamp
    allData.sort((a, b) => b.unix - a.unix);

    return allData;
  };

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["jobSearch"],
    queryFn: req,
    refetchOnWindowFocus: false,
  });

  return (
    <Box sx={{ backgroundColor: "#eee" }}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: 4,
        }}
      >
        {isFetching ? (
          <JobCardSkeleton />
        ) : (
          data.map((item) => <JobCard key={item.uuid} cardData={item} />)
        )}
      </Container>

      <FabWrapper>
        <Edit onClick={refetch} />
        <Refresh onClick={refetch} />
      </FabWrapper>
    </Box>
  );
}
