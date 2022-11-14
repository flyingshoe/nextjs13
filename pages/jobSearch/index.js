import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  LinearProgress,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";

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

  const getCSS = (item) => {
    const dateParts = item.metadata.newPostingDate.split("-");
    const jobDate = dateParts[2];
    const jobMonth = dateParts[1];

    const d = new Date();
    const date = d.getDate().toString();
    const month = (d.getMonth() + 1).toString();

    if (jobDate === date && jobMonth === month) {
      return {
        boxShadow: "0 0 8px #F50",
      };
    }

    return {};
  };

  const addComma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
          <Card key={item.uuid} sx={() => getCSS(item)}>
            <CardActionArea
              onClick={() => {
                window.open(item.metadata.jobDetailsUrl);
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      background: "transparent",
                      boxShadow: "0 0 8px lightgrey",
                    }}
                    variant="rounded"
                  >
                    <img
                      style={{ width: "100%" }}
                      src={
                        item.postedCompany.logoUploadPath ||
                        "data:image/png;base64,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"
                      }
                    ></img>
                  </Avatar>
                }
                title={item.postedCompany.name}
                subheader={item.title}
              ></CardHeader>
              <CardContent>
                <h2>
                  ${addComma(item.salary.minimum)} -{" "}
                  {addComma(item.salary.maximum)}
                </h2>
                Posted: <b>{item.metadata.newPostingDate}</b>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </Box>
  );
}

export default JobSearch;
