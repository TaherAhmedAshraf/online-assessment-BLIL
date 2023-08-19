import { useEffect, useState } from "react";
import Header from "../common/Header";
import Input from "../common/Input";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

Chart.register(CategoryScale);

export default function Home() {
  const [formSetps, setFormSteps] = useState<number>(1);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [contractor, setContractor] = useState<string>("");
  const [csvFile, setCsvFile] = useState<Blob>();
  const [csvUrl, setCsvUrl] = useState<string>("");
  const [maxX, setMaxX] = useState<string>("");
  const [minX, setMinX] = useState<string>("");
  const [maxY, setMaxY] = useState<string>("");
  const [minY, setMinY] = useState<string>("");
  const [maxZ, setMaxZ] = useState<string>("");
  const [minZ, setMinZ] = useState<string>("");

  const navigate = useNavigate();

  const styles = {
    main: "bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white",
  };

  function _handleNext() {
    if (formSetps === 1) {
      if (
        projectName === "" ||
        projectDescription === "" ||
        client === "" ||
        contractor === ""
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      setFormSteps(formSetps + 1);
    } else if (formSetps === 2) {
      if (
        maxX === "" ||
        minX === "" ||
        maxY === "" ||
        minY === "" ||
        maxZ === "" ||
        minZ === ""
      ) {
        toast.error(
          "Please upload a csv file or manually enter all the values"
        );
        return;
      } else {
        // push to result page
        navigate({
          pathname: "/result",
          search: `?projectName=${projectName}&projectDescription=${projectDescription}&client=${client}&contractor=${contractor}&maxX=${maxX}&minX=${minX}&maxY=${maxY}&minY=${minY}&maxZ=${maxZ}&minZ=${minZ}&csvUrl=${csvUrl}`,
        });
      }
    }
  }

  useEffect(() => {
    async function run() {
      if (!csvFile) return;
      const fileUrl = URL.createObjectURL(csvFile);
      const response = await fetch(fileUrl);
      const text = await response.text();
      const lines = text.split("\n");
      const _data = lines.map((line) => line.split(","));

      const X = _data
        .map((data) => Number(data[1]))
        .filter((data) => !isNaN(data));
      const Y = _data
        .map((data) => Number(data[2]))
        .filter((data) => !isNaN(data));
      const Z = _data
        .map((data) => Number(data[3]))
        .filter((data) => !isNaN(data));

      setMaxX(Math.max(...X).toString());
      setMinX(Math.min(...X).toString());
      setMaxY(Math.max(...Y).toString());
      setMinY(Math.min(...Y).toString());
      setMaxZ(Math.max(...Z).toString());
      setMinZ(Math.min(...Z).toString());
      setCsvUrl(fileUrl);
    }
    run();
  }, [csvFile]);

  return (
    <div className={styles.main}>
      <div className="container mx-auto">
        <Header />
        {/* form */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
          <Input
            name="Project Name"
            placeholder="Enter your project name"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            disabled={formSetps === 2}
          />
          <Input
            name="Project Description"
            placeholder="Enter your project description"
            value={projectDescription}
            onChange={(event) => {
              setProjectDescription(event.target.value);
            }}
            disabled={formSetps === 2}
          />
          <Input
            name="Client"
            placeholder="Enter client Name"
            value={client}
            onChange={(event) => {
              setClient(event.target.value);
            }}
            disabled={formSetps === 2}
          />
          <Input
            name="Contractor"
            placeholder="Enter contractor name"
            value={contractor}
            onChange={(event) => {
              setContractor(event.target.value);
            }}
            disabled={formSetps === 2}
          />
        </div>
        {formSetps === 2 && (
          <div id="form">
            <hr className="my-4" />
            <div className="flex flex-col gap-4 mb-4">
              <Input
                name="Upload CSV file"
                type="file"
                accept=".csv"
                onChange={(event) => {
                  setCsvFile(event.target.files?.[0]);
                }}
              />
              <span>OR, Enter manually</span>
            </div>
            {/* <hr className="my-4" /> */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
              <Input
                name="Max X"
                placeholder="Enter Max X"
                type="text"
                value={maxX}
                onChange={(event) => {
                  setMaxX(event.target.value);
                }}
                disabled={!!csvFile}
              />
              <Input
                name="Min X"
                placeholder="Enter Min X"
                type="text"
                value={minX}
                onChange={(event) => {
                  setMinX(event.target.value);
                }}
                disabled={!!csvFile}
              />
              <Input
                name="Max Y"
                placeholder="Enter Max Y"
                type="text"
                value={maxY}
                onChange={(event) => {
                  setMaxY(event.target.value);
                }}
                disabled={!!csvFile}
              />
              <Input
                name="Min Y"
                placeholder="Enter Min Y"
                type="text"
                value={minY}
                onChange={(event) => {
                  setMinY(event.target.value);
                }}
                disabled={!!csvFile}
              />
              <Input
                name="Max Z"
                placeholder="Enter Max Z"
                type="text"
                value={maxZ}
                onChange={(event) => {
                  setMaxZ(event.target.value);
                }}
                disabled={!!csvFile}
              />
              <Input
                name="Min Z"
                placeholder="Enter Min Z"
                type="text"
                value={minZ}
                onChange={(event) => {
                  setMinZ(event.target.value);
                }}
                disabled={!!csvFile}
              />
            </div>
          </div>
        )}
        {/* <button */}
        <Button onClick={_handleNext} styleType="fill">
          <span>{formSetps === 1 ? "Next" : "Submit"}</span>
        </Button>
      </div>
    </div>
  );
}
