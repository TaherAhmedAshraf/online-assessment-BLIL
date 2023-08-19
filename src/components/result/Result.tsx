import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import { Line } from "react-chartjs-2";
import Button from "../common/Button";

interface Params {
  projectName?: string;
  projectDescription?: string;
  client?: string;
  contractor?: string;
  maxX?: string;
  minX?: string;
  maxY?: string;
  minY?: string;
  maxZ?: string;
  minZ?: string;
  csvUrl?: string;
}

export default function Result() {
  const navigate = useNavigate();
  const [params, setParams] = useState<Params>({});
  const [searchParams] = useSearchParams();
  const [chartXData, setChartXData] = useState<number[]>([]);
  const [chartYData, setChartYData] = useState<number[]>([]);

  const styles = {
    main: "bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen text-white",
  };

  useEffect(() => {
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    console.log(params);
    setParams(params);
  }, [searchParams]);

  async function _generatePDF() {
    const formUrl = "/document.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    form.getTextField("ProjectName").setText(params.projectName);
    form.getTextField("ProjectDesc").setText(params.projectDescription);
    form.getTextField("Client").setText(params.client);
    form.getTextField("Contractor").setText(params.contractor);
    form.getTextField("MaxX").setText(params.maxX);
    form.getTextField("MinX").setText(params.minX);
    form.getTextField("MaxY").setText(params.maxY);
    form.getTextField("MinY").setText(params.minY);
    form.getTextField("MaxZ").setText(params.maxZ);
    form.getTextField("MinZ").setText(params.minZ);

    form.getTextField("ProjectName").enableReadOnly();
    form.getTextField("ProjectDesc").enableReadOnly();
    form.getTextField("Client").enableReadOnly();
    form.getTextField("Contractor").enableReadOnly();
    form.getTextField("MaxX").enableReadOnly();
    form.getTextField("MinX").enableReadOnly();
    form.getTextField("MaxY").enableReadOnly();
    form.getTextField("MinY").enableReadOnly();
    form.getTextField("MaxZ").enableReadOnly();
    form.getTextField("MinZ").enableReadOnly();

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "contract.pdf";
    link.click();
  }

  function _handleGoBack() {
    navigate("/");
  }

  useEffect(() => {
    async function getCSVData() {
      if (!params.csvUrl) return;
      const response = await fetch(params.csvUrl);
      const text = await response.text();
      const lines = text.split("\n");
      const _data = lines.map((line) => line.split(","));

      const KP = _data
        .map((data) => Number(data[0]))
        .filter((data) => !isNaN(data));
      const X = _data
        .map((data) => Number(data[1]))
        .filter((data) => !isNaN(data));
      setChartXData(KP);
      setChartYData(X);
    }
    getCSVData();
  }, [params.csvUrl]);

  return (
    <div className={styles.main}>
      <div className="container mx-auto">
        <Header />
        <div>
          <table id="contract_info" className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border px-4 py-2">Project Name</th>
                <th className="border px-4 py-2">{params.projectName}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Project Description</th>
                <th className="border px-4 py-2">
                  {params.projectDescription}
                </th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Client</th>
                <th className="border px-4 py-2">{params.client}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Contractor</th>
                <th className="border px-4 py-2">{params.contractor}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Max X</th>
                <th className="border px-4 py-2">{params.maxX}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Min X</th>
                <th className="border px-4 py-2">{params.minX}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Max Y</th>
                <th className="border px-4 py-2">{params.maxY}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Min Y</th>
                <th className="border px-4 py-2">{params.minY}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Max Z</th>
                <th className="border px-4 py-2">{params.maxZ}</th>
              </tr>
              <tr>
                <th className="border px-4 py-2">Min Z</th>
                <th className="border px-4 py-2">{params.minZ}</th>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-3">
            <Button onClick={_generatePDF} styleType="fill">
              Export PDF
            </Button>
            <Button onClick={_handleGoBack} styleType="outline">
              GO BACK
            </Button>
          </div>
          {params.csvUrl && (
            <Line
              datasetIdKey="id"
              data={{
                datasets: [
                  {
                    label: "X",
                    data: chartYData,
                  },
                ],
                labels: chartXData,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
