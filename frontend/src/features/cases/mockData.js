export const caseRecords = [
  {
    id: "case-tenancy-dispute",
    title: "Tenancy dispute review",
    category: "Property Law",
    status: "Active",
    priority: "High",
    solicitor: "Elaine Foster",
    budget: "GBP2,500",
    nextStep: "Solicitor to prepare response to landlord correspondence.",
    preferredContact: "Email",
    desiredOutcome: "Resolve the dispute and protect tenancy rights.",
    description: "Client needs advice on a landlord dispute involving repairs, notice handling, and tenancy obligations.",
    attachments: [
      { name: "Tenancy agreement.pdf", type: "Contract" },
      { name: "Landlord email thread.pdf", type: "Correspondence" },
    ],
    updates: [
      { title: "Case opened", body: "Intake form completed and documents uploaded.", author: "Amara Stone" },
      { title: "Solicitor review", body: "Initial advice prepared and waiting for client confirmation.", author: "Elaine Foster" },
    ],
  },
  {
    id: "case-contract-review",
    title: "Business contract review",
    category: "Corporate Law",
    status: "In Review",
    priority: "Medium",
    solicitor: "Daniel Webb",
    budget: "GBP3,200",
    nextStep: "Client to confirm negotiation priorities.",
    preferredContact: "Video call",
    desiredOutcome: "Reduce legal and commercial risk before signing.",
    description: "Review a supplier agreement and identify clauses that expose the business to avoidable risk.",
    attachments: [
      { name: "Supplier agreement.docx", type: "Contract" },
    ],
    updates: [
      { title: "Contract received", body: "Draft agreement shared through the dashboard.", author: "Amara Stone" },
    ],
  },
  {
    id: "case-visa-appeal",
    title: "Visa appeal guidance",
    category: "Immigration",
    status: "Waiting On Client",
    priority: "Urgent",
    solicitor: "Sophie Carter",
    budget: "GBP4,100",
    nextStep: "Client to upload refusal letter and timeline notes.",
    preferredContact: "Phone",
    desiredOutcome: "Prepare a timely and complete appeal submission.",
    description: "Urgent support needed for an immigration refusal and appeal strategy.",
    attachments: [
      { name: "Appeal checklist.pdf", type: "Guidance" },
    ],
    updates: [
      { title: "Urgency flagged", body: "Case marked urgent due to appeal deadline.", author: "Support Team" },
    ],
  },
];

export const caseFormOptions = {
  categories: ["Family Law", "Corporate Law", "Immigration", "Property Law"],
  priorities: ["Low", "Medium", "High", "Urgent"],
  contactMethods: ["Email", "Phone", "Video call"],
};

