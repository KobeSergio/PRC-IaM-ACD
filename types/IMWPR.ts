export type IMWPRContent = {
  section: number;
  sectionText: string;
  questionId: number;
  questionText: string;
  remark: string;
  compliance: boolean;
};

export type IMWPR = {
  inspection_team: string[];
  findings: IMWPRContent[];
  other_comments: string;
  recommendations: string;
  compliance_decision: "compliant" | "for-compliance" | "non-compliant";
};
