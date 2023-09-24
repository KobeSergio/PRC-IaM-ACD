"use strict";

import { PDFDocument } from "pdf-lib";
import { NextResponse } from "next/server";
import { readFile, readFileSync } from "fs";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.formData();
    const _inspections = formData.get("inspections"); // stringified JSON
    const _annex = formData.get("annex");

    const inspections = JSON.parse(_inspections as string);
    const annex = _annex as string;

    try {
      const pdfDoc = await PDFDocument.load(
        readFileSync(`./public/assets/pdfs/Annex${annex.toUpperCase()}.pdf`)
      );

      const form = pdfDoc.getForm();

      const possibleFields = Array.from(
        { length: pdfDoc.getForm().getFields().length },
        (_, i) => i + 1
      );

      possibleFields.forEach((field) => {
        try {
          form.getTextField(`Text${field}`).setText(field.toString());
        } catch (error) {
          console.log(error);
        }
      });

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
