import { IMWPRContent } from "@/types/IMWPR";
import React from "react";

export default function Summary({
  selectedAnswers,
}: {
  selectedAnswers: IMWPRContent[];
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-24">
      <div className="flex flex-col gap-2">
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 0
            ).length == 5
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          A. Department Head/Chair:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 0
              ).length
            }
            /5
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 1
            ).length == 8
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          B. Faculty:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 1
              ).length
            }
            /8
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 2
            ).length == 2
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          C. Curriculum and Instruction:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 2
              ).length
            }
            /2
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 3
            ).length == 2
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          D. Laboratory facilities and Equipment:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 3
              ).length
            }
            /2
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 4
            ).length == 3
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          E. Library:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 4
              ).length
            }
            /3
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 5
            ).length == 3
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          F. Practicum:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 5
              ).length
            }
            /3
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 6
            ).length == 2
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          G. Research and Extension:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 6
              ).length
            }
            /2
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 7
            ).length == 3
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          H. Recruitment and Retention of Students:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 7
              ).length
            }
            /3
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 8
            ).length == 1
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          I. Performance in the Licensure Exam for the past five years:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 8
              ).length
            }
            /1
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) => answer.compliance && answer.section == 9
            ).length == 1
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          J. Tracers study of alumni:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 9
              ).length
            }
            /1
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) =>
                answer.compliance && answer.section == 10
            ).length == 1
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          K. Uniqueness of the BS ND Program:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 10
              ).length
            }
            /1
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) =>
                answer.compliance && answer.section == 11
            ).length == 1
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          L. Challenges encountered in the BS ND Program:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 11
              ).length
            }
            /1
          </span>
        </p>
        <p
          className={`font-monts font-semibold text-sm ${
            selectedAnswers?.filter(
              (answer: IMWPRContent) =>
                answer.compliance && answer.section == 12
            ).length == 1
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          M. Students&apos; feedback:{" "}
          <span className="font-medium">
            {
              selectedAnswers?.filter(
                (answer: IMWPRContent) =>
                  answer.compliance && answer.section == 12
              ).length
            }
            /1
          </span>
        </p>
      </div>
    </div>
  );
}
