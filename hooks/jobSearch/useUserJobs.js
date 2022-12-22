import { useEffect, useState } from "react";
import jobData from "../../constants/jobData";

const { param: baseParam, options: baseData, data } = jobData;

const lsKey = "mcfQuery";
let firstLoad = true;
export default function useUserJobs() {
  const [jobQuery, setJobQuery] = useState(() => {
    if (typeof window !== "undefined" && lsKey in localStorage) {
      return JSON.parse(localStorage.getItem(lsKey));
    }
    return data;
  });

  useEffect(() => {
    // Save to Local Storage
    localStorage.setItem(lsKey, JSON.stringify(jobQuery));
  }, [jobQuery]);

  return [jobQuery, setJobQuery, baseParam, baseData];
}
