import { useEffect, useState } from "react";
import { request } from "../../remote_api/uql_api_endpoint";
import AutoLoadObjectList from "../elements/lists/AutoLoadObjectList";

export default function Instances() {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("Instance page is", page);
    request(
      {
        url: "/instances",
        method: "GET",
      },
      (l) => {
        setLoading(l);
      }, // sets l=true when loading, l=false when ready
      (e) => {
        setErrors(e);
      }, // runs on error
      (response) => {
        // on response ready
        if (response && page < 7) {
          console.log("RESPONSE RECEIVED");
          const data = {
            ...response.data,
            result: [
              ...response.data.result,
              ...response.data.result,
              ...response.data.result,
              ...response.data.result,
            ],
          };
          setData(data);
          setRows([...rows, ...data.result]);

          console.log("data", data);
          console.log("rows", rows);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, page]);

  if (data) {
    return (
      <AutoLoadObjectList
        data={data}
        allRows={rows}
        label="INSTANCES"
        errors={errors}
        loading={loading}
        timeField={(row) => [row.timestamp]}
        timeFieldLabel="Timestamp"
        setPage={setPage}
      />
    );
  }

  if (errors) {
    return "ERROR";
  }

  return null;
}
