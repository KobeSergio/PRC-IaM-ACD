"use strict";

import { PDFDocument } from "pdf-lib";
import { NextResponse } from "next/server";
import { readFile, readFileSync } from "fs";
import { Inspection } from "@/types/Inspection";
import path from "path";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.formData();
    const _inspections = formData.get("inspections"); // stringified JSON
    const _annex = formData.get("annex");

    const inspections: Inspection[] = JSON.parse(_inspections as string);

    console.log(inspections);
    const annex = _annex as string;

    try {
      const filePath = path.resolve(
        process.cwd(),
        `./public/assets/pdfs/Annex${annex.toUpperCase()}.pdf`
      );
      const pdfDoc = await PDFDocument.load(readFileSync(filePath)); 
      const form = pdfDoc.getForm();

      if (annex.toUpperCase() === "J") {
        //Name, Date, Findings, Date of monitoring, status
        inspections.map((inspection: Inspection, index: number) => {
          const estName = inspection.client_details.name;
          const inspection_date = inspection.inspection_date;
          const findings = inspection.inspection_IMWPR.other_comments;
          const recommendations = inspection.inspection_IMWPR.recommendations;
          const agreedCompliance =
            inspection.inspection_IMWPR.compliance_decision; //To follow
          const status = inspection.status;

          const baseIndex = index * 6 + 1;

          form.getTextField(`Text${baseIndex}`).setText(estName); //Name
          form.getTextField(`Text${baseIndex + 1}`).setText(inspection_date); //Date
          form.getTextField(`Text${baseIndex + 2}`).setText(findings); //Findings
          form.getTextField(`Text${baseIndex + 3}`).setText(""); //Date of monitoring
          form.getTextField(`Text${baseIndex + 4}`).setText(status); //Status
          form.getTextField(`Text${baseIndex + 5}`).setText(""); //Outcome
        });
      } else if (annex.toUpperCase() === "H") {
        //Name, Date, Findings, Agreed date of compliance, date of submission of proofs of compliance, remarks
        inspections.map((inspection: Inspection, index: number) => {
          const estName = inspection.client_details.name;
          const inspection_date = inspection.inspection_date;
          const findings = inspection.inspection_IMWPR.other_comments;
          const recommendations = inspection.inspection_IMWPR.recommendations;
          const agreedCompliance =
            inspection.inspection_IMWPR.compliance_decision; //To follow
          const status = inspection.status;

          const baseIndex = index * 6 + 1;

          form.getTextField(`Text${baseIndex}`).setText(estName); //Name
          form.getTextField(`Text${baseIndex + 1}`).setText(inspection_date); //Date
          form.getTextField(`Text${baseIndex + 2}`).setText(findings); //Findings
          form.getTextField(`Text${baseIndex + 3}`).setText(""); //Agreed date of compliance
          form.getTextField(`Text${baseIndex + 4}`).setText(""); //Date of submission of proofs of compliance
          form.getTextField(`Text${baseIndex + 5}`).setText(recommendations); //Remarks
        });
      }

      const pdfBytes = await pdfDoc.save();

      return new NextResponse(pdfBytes, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline; filename=filled.pdf",
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return NextResponse.json({
      status: 405,
      message: "Method not allowed",
    });
  }
}
