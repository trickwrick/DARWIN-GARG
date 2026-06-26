export type ContactInquiryStatus = "pending" | "resolved";

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  subjectLabel: string;
  message: string;
  status: ContactInquiryStatus;
  createdAt: string;
};

export type ContactInquiryInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
