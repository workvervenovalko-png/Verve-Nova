export type AssessmentQuestion = {
  id: string;
  type: 'aptitude' | 'quant' | 'reasoning' | 'domain' | 'coding';
  text: string;
  codeSnippet?: string; // For coding output questions
  options: string[];
  correctOptionIndex: number;
};

// Generic Aptitude & Reasoning questions that appear in every test
const genericQuestions: AssessmentQuestion[] = [
  {
    id: "gen_1",
    type: "quant",
    text: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options: ["100 minutes", "5 minutes", "50 minutes", "10 minutes"],
    correctOptionIndex: 1
  },
  {
    id: "gen_2",
    type: "reasoning",
    text: "Find the next number in the series: 2, 6, 12, 20, 30, ...",
    options: ["40", "42", "44", "48"],
    correctOptionIndex: 1
  },
  {
    id: "gen_3",
    type: "aptitude",
    text: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "180 metres", "324 metres", "150 metres"],
    correctOptionIndex: 3
  },
  {
    id: "gen_4",
    type: "reasoning",
    text: "If 'APPLE' is coded as 25563, and 'RUNG' is coded as 7148, then 'PURPLE' will be coded as:",
    options: ["517563", "517536", "517653", "517365"],
    correctOptionIndex: 0
  },
  {
    id: "gen_5",
    type: "quant",
    text: "The sum of ages of 5 children born at the intervals of 3 years each is 50 years. What is the age of the youngest child?",
    options: ["4 years", "8 years", "10 years", "None of these"],
    correctOptionIndex: 0
  }
];

export const assessmentQuestions: Record<string, AssessmentQuestion[]> = {
  "web-development": [
    ...genericQuestions,
    {
      id: "wd_1",
      type: "domain",
      text: "Which of the following methods is used to access HTML elements using Javascript?",
      options: ["getElementbyId()", "getElementsByClassName()", "Both A and B", "None of the above"],
      correctOptionIndex: 2
    },
    {
      id: "wd_2",
      type: "coding",
      text: "What will be the output of the following JavaScript code?",
      codeSnippet: `console.log(typeof null);\nconsole.log(typeof undefined);`,
      options: ["object, undefined", "null, undefined", "undefined, object", "object, object"],
      correctOptionIndex: 0
    },
    {
      id: "wd_3",
      type: "coding",
      text: "What will be the output?",
      codeSnippet: `let x = 1;\nif (x === 1) {\n  let x = 2;\n  console.log(x);\n}\nconsole.log(x);`,
      options: ["1, 2", "2, 1", "2, 2", "1, 1"],
      correctOptionIndex: 1
    },
    {
      id: "wd_4",
      type: "domain",
      text: "Which CSS property is used to control the spacing between flex items?",
      options: ["margin", "padding", "gap", "space-between"],
      correctOptionIndex: 2
    },
    {
      id: "wd_5",
      type: "domain",
      text: "What does CORS stand for?",
      options: ["Cross-Origin Resource Sharing", "Cross-Object Resource System", "Cross-Origin Routing System", "Control-Origin Resource Sharing"],
      correctOptionIndex: 0
    }
  ],
  "data-science": [
    ...genericQuestions,
    {
      id: "ds_1",
      type: "domain",
      text: "Which of the following is a supervised learning algorithm?",
      options: ["K-Means Clustering", "Principal Component Analysis", "Support Vector Machines", "Apriori Algorithm"],
      correctOptionIndex: 2
    },
    {
      id: "ds_2",
      type: "coding",
      text: "What is the output of the following Python code?",
      codeSnippet: `import numpy as np\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a * b)`,
      options: ["Error", "[4, 10, 18]", "32", "[1, 2, 3, 4, 5, 6]"],
      correctOptionIndex: 1
    },
    {
      id: "ds_3",
      type: "domain",
      text: "What is the purpose of the 'train_test_split' function in scikit-learn?",
      options: ["To format the data", "To split data into training and validation sets", "To balance the dataset", "To train the model"],
      correctOptionIndex: 1
    }
  ],
  "qa-testing": [
    ...genericQuestions,
    {
      id: "qa_1",
      type: "domain",
      text: "Which of the following is NOT a type of non-functional testing?",
      options: ["Performance Testing", "Usability Testing", "Integration Testing", "Security Testing"],
      correctOptionIndex: 2
    },
    {
      id: "qa_2",
      type: "domain",
      text: "In Cypress, how do you select an element by its data-testid attribute?",
      options: ["cy.get('.testid')", "cy.get('[data-testid=value]')", "cy.find('data-testid')", "cy.select('value')"],
      correctOptionIndex: 1
    }
  ],
  "app-development": [
    ...genericQuestions,
    {
      id: "ad_1",
      type: "domain",
      text: "Which language is primarily used for Android App development?",
      options: ["Swift", "Kotlin", "Ruby", "PHP"],
      correctOptionIndex: 1
    },
    {
      id: "ad_2",
      type: "domain",
      text: "In React Native, which component is used to create a scrollable list?",
      options: ["ScrollView", "ListView", "FlatList", "Both A and C"],
      correctOptionIndex: 3
    }
  ],
  "ui-ux-design": [
    ...genericQuestions,
    {
      id: "ux_1",
      type: "domain",
      text: "What does the 'F-pattern' refer to in UI design?",
      options: ["A font style", "How users read content on the web", "A color palette rule", "A wireframing tool"],
      correctOptionIndex: 1
    },
    {
      id: "ux_2",
      type: "domain",
      text: "Which of the following is a prototyping tool?",
      options: ["VS Code", "MongoDB", "Figma", "Docker"],
      correctOptionIndex: 2
    }
  ],
  "digital-marketing": [
    ...genericQuestions,
    {
      id: "dm_1",
      type: "domain",
      text: "What does SEO stand for?",
      options: ["System Engine Optimization", "Search Engine Optimization", "Search Engagement Optimization", "System Engagement Order"],
      correctOptionIndex: 1
    },
    {
      id: "dm_2",
      type: "domain",
      text: "Which tool is commonly used for tracking website traffic?",
      options: ["Google Analytics", "Jenkins", "Postman", "Figma"],
      correctOptionIndex: 0
    }
  ],
  "cloud-computing": [
    ...genericQuestions,
    {
      id: "cc_1",
      type: "domain",
      text: "Which of the following is an IaaS provider?",
      options: ["Google Workspace", "AWS EC2", "Salesforce", "Wix"],
      correctOptionIndex: 1
    },
    {
      id: "cc_2",
      type: "domain",
      text: "What does 'S3' stand for in Amazon Web Services?",
      options: ["Simple Storage Service", "System Storage Server", "Secure Server System", "Scalable System Service"],
      correctOptionIndex: 0
    }
  ],
  "upwork-bidder": [
    ...genericQuestions,
    {
      id: "ub_1",
      type: "domain",
      text: "What is the most important element of a successful Upwork proposal?",
      options: ["Length of the proposal", "Copy-pasted template", "Addressing the client's specific problem", "Asking for a high budget immediately"],
      correctOptionIndex: 2
    }
  ],
  "human-resources": [
    ...genericQuestions,
    {
      id: "hr_1",
      type: "domain",
      text: "What is the primary purpose of an onboarding process?",
      options: ["To fire employees", "To train and integrate new employees", "To calculate payroll", "To conduct exit interviews"],
      correctOptionIndex: 1
    }
  ],
  "blockchain-development": [
    ...genericQuestions,
    {
      id: "bc_1",
      type: "domain",
      text: "What is a Smart Contract?",
      options: ["A legally binding paper contract", "Self-executing code on a blockchain", "A physical token", "A consensus algorithm"],
      correctOptionIndex: 1
    }
  ]
};

// Helper function to get questions for a role
export function getQuestionsForRole(roleSlug: string): AssessmentQuestion[] {
  return assessmentQuestions[roleSlug] || assessmentQuestions['web-development'];
}
