import { RefreshOutlined } from "@mui/icons-material";
import { Box, Container, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import JobCard from "../../components/jobSearch/jobCard";
import MyFab from "../../components/jobSearch/myFab";

function JobSearch() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    req();
  }, []);

  const req = async () => {
    setLoading(true);
    try {
      const allRes = await Promise.allSettled([
        fetch("/api/findJob/v2/search?limit=40&page=0", {
          headers: {
            "content-type": "application/json",
          },
          body: '{"sessionId":"566993215.1618749121","search":"frontend","salary":6500,"sortBy":["new_posting_date"],"skillUuids":["2be25667a86187ffe0b9a61dd3c8573d","2fec392304a5c23ac138da22847f9b7c","4c4ad5fca2e7a3f74dbb1ced00381aa4","62a004b95946bb97541afa471dcca73a","63522a7e8b648f9da174ae21a8d8f8a7","686155af75a60a0f6e9d80c1f7edd3e9","a7f5f35426b927411fc9231b56382173","ae73ff2caf8dff06b50e38ff38ef8a49","d52387880e1ea22817a72d3759213819","e9f65fa4000d038efa0cdff8bb824632","f590b4fda2c30be28dd3c8c3caf5c77b","f6f87c9fdcf8b3c3f07f93f1ee8712c9"]}',
          method: "POST",
        }),
        fetch("/api/findJob/v2/search?limit=20&page=0", {
          headers: {
            "content-type": "application/json",
          },
          body: '{"sessionId":"566993215.1618749121","search":"front end","salary":6500,"sortBy":["new_posting_date"],"skillUuids":["2be25667a86187ffe0b9a61dd3c8573d","2fec392304a5c23ac138da22847f9b7c","4c4ad5fca2e7a3f74dbb1ced00381aa4","62a004b95946bb97541afa471dcca73a","63522a7e8b648f9da174ae21a8d8f8a7","686155af75a60a0f6e9d80c1f7edd3e9","a7f5f35426b927411fc9231b56382173","ae73ff2caf8dff06b50e38ff38ef8a49","d52387880e1ea22817a72d3759213819","e9f65fa4000d038efa0cdff8bb824632","f590b4fda2c30be28dd3c8c3caf5c77b","f6f87c9fdcf8b3c3f07f93f1ee8712c9"]}',
          method: "POST",
        }),
        fetch("/api/findJob/v2/search?limit=20&page=0", {
          headers: {
            "content-type": "application/json",
          },
          body: '{"sessionId":"566993215.1618749121","search":"react","salary":6500,"sortBy":["new_posting_date"],"skillUuids":["2be25667a86187ffe0b9a61dd3c8573d","2fec392304a5c23ac138da22847f9b7c","4c4ad5fca2e7a3f74dbb1ced00381aa4","62a004b95946bb97541afa471dcca73a","63522a7e8b648f9da174ae21a8d8f8a7","686155af75a60a0f6e9d80c1f7edd3e9","a7f5f35426b927411fc9231b56382173","ae73ff2caf8dff06b50e38ff38ef8a49","d52387880e1ea22817a72d3759213819","e9f65fa4000d038efa0cdff8bb824632","f590b4fda2c30be28dd3c8c3caf5c77b","f6f87c9fdcf8b3c3f07f93f1ee8712c9"]}',
          method: "POST",
        }),
      ]);
      let allData = [];
      for (const res of allRes) {
        const jsonData = await res.value.json();
        allData = [...allData, ...jsonData.results];
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

      setData(allData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

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
        {data.map((item) => (
          <JobCard key={item.uuid} cardData={item} />
        ))}
        <MyFab color="secondary" onClick={req}>
          <RefreshOutlined />
        </MyFab>
      </Container>
    </Box>
  );
}

export default JobSearch;
