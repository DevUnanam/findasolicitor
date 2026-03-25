import { solicitorDirectory } from "../solicitors/mockData";

export const questionnaireOptions = {
  legalIssues: ["Family Law", "Corporate Law", "Immigration", "Property Law"],
  urgency: ["Low", "Medium", "High", "Urgent"],
  budgetBands: ["Below GBP1,000", "GBP1,000 - GBP3,000", "GBP3,000 - GBP7,500", "GBP7,500+"],
  serviceModes: ["Virtual", "In Person"],
  contactMethods: ["Email", "Phone", "Video call"],
  goals: [
    "Fast first consultation",
    "Strong courtroom or negotiation experience",
    "Predictable pricing",
    "Long-term case support",
  ],
};

export function buildRecommendations(questionnaire) {
  return solicitorDirectory
    .map((solicitor) => {
      let score = 0;
      const reasons = [];

      if (questionnaire.legalIssue && solicitor.specialty === questionnaire.legalIssue) {
        score += 35;
        reasons.push("Specialization aligns with your legal issue");
      }
      if (questionnaire.location && solicitor.location === questionnaire.location) {
        score += 15;
        reasons.push("Works in your preferred location");
      }
      if (questionnaire.serviceMode && solicitor.serviceModes.includes(questionnaire.serviceMode)) {
        score += 12;
        reasons.push("Supports your preferred consultation format");
      }
      if (questionnaire.language && solicitor.languages.includes(questionnaire.language)) {
        score += 10;
        reasons.push("Can support your language preference");
      }
      if (questionnaire.verifiedOnly && solicitor.verified) {
        score += 12;
        reasons.push("Verified profile");
      }
      if (questionnaire.availableNow && solicitor.availability) {
        score += 10;
        reasons.push("Currently available for new work");
      }
      if (solicitor.rating >= 4.7) {
        score += 8;
        reasons.push("Strong review profile");
      }
      if (solicitor.experience >= 10) {
        score += 8;
        reasons.push("Deep experience in similar matters");
      }

      return {
        ...solicitor,
        fitScore: Math.min(score, 100),
        reasons: reasons.slice(0, 4),
      };
    })
    .filter((item) => item.fitScore > 0)
    .sort((a, b) => b.fitScore - a.fitScore || b.rating - a.rating);
}

