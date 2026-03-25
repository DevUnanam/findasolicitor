export const conversations = [
  {
    id: "conv-tenancy",
    subject: "Tenancy dispute case discussion",
    participant: "Elaine Foster",
    role: "Solicitor",
    caseTitle: "Tenancy dispute review",
    unread: 2,
    lastSeen: "2 mins ago",
    messages: [
      {
        id: "m1",
        sender: "Amara Stone",
        own: true,
        text: "Hello, I have uploaded the tenancy documents and would appreciate your initial view.",
        time: "09:12",
      },
      {
        id: "m2",
        sender: "Elaine Foster",
        own: false,
        text: "I have reviewed the first set of files and will share a recommended next step shortly.",
        time: "09:19",
      },
      {
        id: "m3",
        sender: "Elaine Foster",
        own: false,
        text: "Please also upload the latest repair correspondence so I can compare the timeline properly.",
        time: "09:24",
      },
    ],
  },
  {
    id: "conv-contract",
    subject: "Business contract review",
    participant: "Daniel Webb",
    role: "Solicitor",
    caseTitle: "Business contract review",
    unread: 0,
    lastSeen: "25 mins ago",
    messages: [
      {
        id: "m4",
        sender: "Daniel Webb",
        own: false,
        text: "I can take a video call on Thursday afternoon to walk through the risk points in the supplier agreement.",
        time: "08:40",
      },
    ],
  },
  {
    id: "conv-support",
    subject: "Platform support",
    participant: "Findasolicitor Support",
    role: "Support",
    caseTitle: "General support",
    unread: 1,
    lastSeen: "1 hour ago",
    messages: [
      {
        id: "m5",
        sender: "Findasolicitor Support",
        own: false,
        text: "Your appointment reminder has been scheduled and will be sent tomorrow morning.",
        time: "07:55",
      },
    ],
  },
];

