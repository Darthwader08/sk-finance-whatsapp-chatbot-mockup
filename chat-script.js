window.chatScript = {
  botName: "SK Finance Virtual Assistant",
  initialStep: "welcome",
  fallbackStep: "fallback",
  steps: {
    welcome: {
      messages: [
        "SKF WhatsApp buddy welcomes you. I am happy to help !!!",
        "Select language"
      ],
      options: [
        { label: "English", value: "English", next: "mobileOne" },
        { label: "हिंदी", value: "हिंदी", next: "mobileOne" },
        { label: "मराठी", value: "मराठी", next: "mobileOne" },
        { label: "ગુજરાતી", value: "ગુજરાતી", next: "mobileOne" },
        { label: "ਪੰਜਾਬੀ", value: "ਪੰਜਾਬੀ", next: "mobileOne" },
        { label: "ಕನ್ನಡ", value: "ಕನ್ನಡ", next: "mobileOne" }
      ]
    },
    mobileOne: {
      messages: [
        "Please enter your 10-digit mobile number"
      ],
      capture: {
        key: "firstMobile",
        label: "Initial Mobile Number",
        validate: "phone"
      },
      next: "mobileUnregistered"
    },
    mobileUnregistered: {
      messages: [
        "Your mobile number is not registered with us. Choose any one option from below."
      ],
      options: [
        { label: "Apply for loan", value: "Apply for loan", next: "mobileTwo" },
        { label: "Register new number", value: "Register new number", next: "mobileTwo" },
        { label: "Raise a ticket for customer by employee", value: "Raise a ticket for customer by employee", next: "mobileTwo" },
        { label: "Banking Update", value: "Banking Update", next: "mobileTwo" }
      ]
    },
    mobileTwo: {
      messages: [
        "Please enter your 10-digit mobile number"
      ],
      capture: {
        key: "phone",
        label: "Registered Mobile Number",
        validate: "phone"
      },
      next: "otpChoice"
    },
    otpChoice: {
      messages: [
        "Please choose an option from below. To enter OTP please choose option 1, to resend OTP please select option 2"
      ],
      options: [
        { label: "Enter otp", value: "Enter otp", next: "otpEntry" },
        { label: "Resend OTP", value: "Resend OTP", next: "otpResent" }
      ]
    },
    otpResent: {
      messages: [
        "A fresh OTP has been sent on your mobile number."
      ],
      options: [
        { label: "Enter otp", value: "Enter otp", next: "otpEntry" }
      ]
    },
    otpEntry: {
      messages: [
        "Enter 6 digit OTP sent on your mobile number."
      ],
      capture: {
        key: "otp",
        label: "OTP",
        validate: "otp"
      },
      next: "tncOne"
    },
    tncOne: {
      messages: [
        "Kindly agree to our terms and conditions, in order to continue. To read our Terms & Conditions, please click here."
      ],
      options: [
        { label: "Agree", value: "Agree", next: "fullName" }
      ]
    },
    fullName: {
      messages: [
        "Enter your full name"
      ],
      capture: {
        key: "name",
        label: "Full Name",
        validate: "name"
      },
      next: "loanType"
    },
    loanType: {
      messages: [
        "Select loan type"
      ],
      capture: {
        key: "loanType",
        label: "Loan Type"
      },
      options: [
        { label: "Commercial Vehicle Loan", value: "Commercial Vehicle Loan", next: "loanTypeNonCar" },
        { label: "Car Loan", value: "Car Loan", next: "loanAmount" },
        { label: "Tractor Loan", value: "Tractor Loan", next: "loanTypeNonCar" },
        { label: "Construction Equipment Loan", value: "Construction Equipment Loan", next: "loanTypeNonCar" },
        { label: "Secured Business Loan", value: "Secured Business Loan", next: "loanTypeNonCar" },
        { label: "Home Renovation - Mortgage Loan", value: "Home Renovation - Mortgage Loan", next: "loanTypeNonCar" }
      ]
    },
    loanTypeNonCar: {
      messages: [
        "This mockup currently continues only for Car Loan. Please select Car Loan to proceed with the demo."
      ],
      options: [
        { label: "Car Loan", value: "Car Loan", next: "loanAmount" }
      ]
    },
    loanAmount: {
      messages: [
        "Enter request loan amount"
      ],
      capture: {
        key: "loanAmount",
        label: "Requested Loan Amount",
        validate: "amount"
      },
      next: "statePageOne"
    },
    statePageOne: {
      messages: [
        "Please select your state"
      ],
      capture: {
        key: "state",
        label: "State"
      },
      options: [
        { label: "CHHATTISGARH", value: "CHHATTISGARH", next: "branchPageOne" },
        { label: "DELHI", value: "DELHI", next: "branchPageOne" },
        { label: "GUJARAT", value: "GUJARAT", next: "branchPageOne" },
        { label: "HARYANA", value: "HARYANA", next: "branchPageOne" },
        { label: "HIMACHAL PRADESH", value: "HIMACHAL PRADESH", next: "branchPageOne" },
        { label: "JAMMU AND KASHMIR", value: "JAMMU AND KASHMIR", next: "branchPageOne" },
        { label: "KARNATAKA", value: "KARNATAKA", next: "branchPageOne" },
        { label: "MADHYA PRADESH", value: "MADHYA PRADESH", next: "branchPageOne" },
        { label: "More States", value: "More States", next: "statePageTwo", skipCapture: true }
      ]
    },
    statePageTwo: {
      messages: [
        "Please select your state"
      ],
      capture: {
        key: "state",
        label: "State"
      },
      options: [
        { label: "MAHARASHTRA", value: "MAHARASHTRA", next: "branchPageOne" },
        { label: "PUNJAB", value: "PUNJAB", next: "branchPageOne" },
        { label: "RAJASTHAN", value: "RAJASTHAN", next: "branchPageOne" },
        { label: "UTTAR PRADESH", value: "UTTAR PRADESH", next: "branchPageOne" },
        { label: "UTTARAKHAND", value: "UTTARAKHAND", next: "branchPageOne" },
        { label: "Back to First Page", value: "Back to First Page", next: "statePageOne", skipCapture: true }
      ]
    },
    branchPageOne: {
      messages: [
        "Please select your branch"
      ],
      capture: {
        key: "branch",
        label: "Branch"
      },
      options: [
        { label: "AHMEDNAGAR", value: "AHMEDNAGAR", next: "selectionSummary" },
        { label: "AKOLA", value: "AKOLA", next: "selectionSummary" },
        { label: "AMBAJOGAI", value: "AMBAJOGAI", next: "selectionSummary" },
        { label: "BARAMATI", value: "BARAMATI", next: "selectionSummary" },
        { label: "BARSHI", value: "BARSHI", next: "selectionSummary" },
        { label: "BELAPUR", value: "BELAPUR", next: "selectionSummary" },
        { label: "BOISAR", value: "BOISAR", next: "selectionSummary" },
        { label: "CHAKAN", value: "CHAKAN", next: "selectionSummary" },
        { label: "More Branches", value: "More Branches", next: "branchPageTwo", skipCapture: true }
      ]
    },
    branchPageTwo: {
      messages: [
        "Please select your branch"
      ],
      capture: {
        key: "branch",
        label: "Branch"
      },
      options: [
        { label: "CHALISGAON", value: "CHALISGAON", next: "selectionSummary" },
        { label: "CHANDRAPUR", value: "CHANDRAPUR", next: "selectionSummary" },
        { label: "CHHATRAPATI SAMBHAJI NAGAR", value: "CHHATRAPATI SAMBHAJI NAGAR", next: "selectionSummary" },
        { label: "CHIPLUN", value: "CHIPLUN", next: "selectionSummary" },
        { label: "DHARASHIV", value: "DHARASHIV", next: "selectionSummary" },
        { label: "DHULE", value: "DHULE", next: "selectionSummary" },
        { label: "GONDIA", value: "GONDIA", next: "selectionSummary" },
        { label: "ICHALKARANJI", value: "ICHALKARANJI", next: "selectionSummary" },
        { label: "More Branches", value: "More Branches", next: "branchPageThree", skipCapture: true },
        { label: "Back to First Page", value: "Back to First Page", next: "branchPageOne", skipCapture: true }
      ]
    },
    branchPageThree: {
      messages: [
        "Please select your branch"
      ],
      capture: {
        key: "branch",
        label: "Branch"
      },
      options: [
        { label: "JALGAON", value: "JALGAON", next: "selectionSummary" },
        { label: "JALNA", value: "JALNA", next: "selectionSummary" },
        { label: "KALYAN", value: "KALYAN", next: "selectionSummary" },
        { label: "KANKAVLI", value: "KANKAVLI", next: "selectionSummary" },
        { label: "KARAD", value: "KARAD", next: "selectionSummary" },
        { label: "KEDGAON", value: "KEDGAON", next: "selectionSummary" },
        { label: "KHAMGAON", value: "KHAMGAON", next: "selectionSummary" },
        { label: "KHOPOLI", value: "KHOPOLI", next: "selectionSummary" },
        { label: "More Branches", value: "More Branches", next: "branchPageFour", skipCapture: true },
        { label: "Back to First Page", value: "Back to First Page", next: "branchPageOne", skipCapture: true }
      ]
    },
    branchPageFour: {
      messages: [
        "Please select your branch"
      ],
      capture: {
        key: "branch",
        label: "Branch"
      },
      options: [
        { label: "PANDHARPUR", value: "PANDHARPUR", next: "selectionSummary" },
        { label: "PANVEL", value: "PANVEL", next: "selectionSummary" },
        { label: "PEN", value: "PEN", next: "selectionSummary" },
        { label: "PIMPALGAON", value: "PIMPALGAON", next: "selectionSummary" },
        { label: "PIMPARI", value: "PIMPARI", next: "selectionSummary" },
        { label: "PUNE", value: "PUNE", next: "selectionSummary" },
        { label: "ROHA", value: "ROHA", next: "selectionSummary" },
        { label: "SANGAMNER", value: "SANGAMNER", next: "selectionSummary" },
        { label: "Back to First Page", value: "Back to First Page", next: "branchPageOne", skipCapture: true }
      ]
    },
    selectionSummary: {
      dynamicMessages: [
        (state) => {
          return `You have selected ${state.loanType || "Car Loan"} of ${formatCurrency(state.loanAmount)} rupees from ${state.branch || "-"}, ${state.state || "-"}.`;
        },
        'Select the "Proceed" button to continue or select the "Edit" button to modify the details.'
      ],
      options: [
        { label: "Proceed", value: "Proceed", next: "emailChoice" },
        { label: "Edit", value: "Edit", next: "loanType" }
      ]
    },
    emailChoice: {
      messages: [
        "Would you like to provide your email address?"
      ],
      options: [
        { label: "Enter Email", value: "Enter Email", next: "emailEntry" },
        { label: "Skip Email", value: "Skip Email", next: "remarksChoice", action: "setEmailSkipped" }
      ]
    },
    emailEntry: {
      messages: [
        "Please enter your email address"
      ],
      capture: {
        key: "email",
        label: "Email Address",
        validate: "email"
      },
      next: "remarksChoice"
    },
    remarksChoice: {
      messages: [
        "Would you like to add any remarks?"
      ],
      options: [
        { label: "Add Remarks", value: "Add Remarks", next: "remarksEntry" },
        { label: "Skip Remarks", value: "Skip Remarks", next: "tncTwo", action: "setRemarksSkipped" }
      ]
    },
    remarksEntry: {
      messages: [
        "Please enter your remarks"
      ],
      capture: {
        key: "remarks",
        label: "Remarks"
      },
      next: "tncTwo"
    },
    tncTwo: {
      messages: [
        "Kindly agree to our standard terms and conditions governing facility/loans, in order to continue. To read our Terms & Conditions, please click here: Click here"
      ],
      options: [
        { label: "Agree", value: "Agree", next: "kycLink" },
        { label: "Disagree", value: "Disagree", next: "disagreeEnd" }
      ]
    },
    disagreeEnd: {
      messages: [
        "You need to agree to continue with the loan application journey."
      ],
      options: [
        { label: "Agree", value: "Agree", next: "kycLink" }
      ]
    },
    kycLink: {
      dynamicMessages: [
        "Please complete Aadhaar and PAN verification using the secure KYC demo link below.",
        () => ({
          html: 'Open KYC verification: <a href="./kyc.html">Aadhaar / PAN Verification Demo</a>'
        }),
        "Once both Aadhaar and PAN are verified successfully, return here to continue."
      ]
    },
    eligibleResult: {
      dynamicMessages: [
        (state) => ({
          html: [
            "<strong>Your Aadhaar and PAN have been verified successfully.</strong><br>",
            "<strong>You are eligible for applying for the loan.</strong><br><br>",
            `Requested loan amount: <strong>${formatCurrency(state.loanAmount)}</strong><br>`,
            "Select the button below to view the eligible loan calculation."
          ].join("")
        })
      ],
      options: [
        { label: "View Loan Calculation", value: "View Loan Calculation", next: "loanCalculation" }
      ]
    },
    loanCalculation: {
      dynamicMessages: [
        (state) => {
          const rows = [24, 36, 48, 60].map((months) => {
            const roi = calculateRoi(Number(state.loanAmount), months);
            const emi = calculateEmi(state.loanAmount, roi, months);
            return `<strong>${months} months</strong>: ROI ${roi.toFixed(2)}% | EMI ${formatCurrency(emi)}`;
          });

          return {
            html: [
              "<strong>Loan Calculation</strong><br>",
              `Eligible amount requested: <strong>${formatCurrency(state.loanAmount)}</strong><br><br>`,
              rows.join("<br>"),
              "<br><br>Select your preferred tenure."
            ].join("")
          };
        }
      ],
      capture: {
        key: "tenureMonths",
        label: "Tenure (Months)"
      },
      options: [
        { label: "24 Months", value: "24", next: "offerSummary" },
        { label: "36 Months", value: "36", next: "offerSummary" },
        { label: "48 Months", value: "48", next: "offerSummary" },
        { label: "60 Months", value: "60", next: "offerSummary" }
      ]
    },
    offerSummary: {
      dynamicMessages: [
        (state) => {
          const roi = calculateRoi(Number(state.loanAmount), Number(state.tenureMonths));
          const emi = calculateEmi(state.loanAmount, roi, state.tenureMonths);
          state.roi = roi;
          state.emi = emi;
          return {
            html: [
              "<strong>You are eligible for the loan.</strong><br>",
              `Selected tenure: <strong>${state.tenureMonths} months</strong><br>`,
              `Indicative ROI: <strong>${roi.toFixed(2)}% per annum</strong><br>`,
              `Estimated monthly installment: <strong>${formatCurrency(emi)}</strong><br><br>`,
              "Please continue to document upload before proceeding with the application."
            ].join("")
          };
        }
      ],
      options: [
        { label: "Continue to Document Upload", value: "Continue to Document Upload", next: "documentCenter" },
        { label: "Change Tenure", value: "Change Tenure", next: "loanCalculation" }
      ]
    },
    documentCenter: {
      dynamicMessages: [
        (state) => {
          const uploadedCount = getDocumentStatusCount(state, "uploaded");
          const skippedCount = getDocumentStatusCount(state, "skipped");
          return {
            html: [
              "<strong>Document Upload Center</strong><br>",
              "Please upload or review the supporting documents required for the application.<br><br>",
              `Uploaded: <strong>${uploadedCount}</strong><br>`,
              `Skipped/Already Uploaded: <strong>${skippedCount}</strong><br><br>`,
              "Select a document category below."
            ].join("")
          };
        }
      ],
      dynamicOptions: () => {
        return [
          { label: "KYC Docs", value: "kyc", action: "setDocCategory", next: "documentCategory" },
          { label: "Income Docs", value: "income", action: "setDocCategory", next: "documentCategory" },
          { label: "Banking Docs", value: "banking", action: "setDocCategory", next: "documentCategory" },
          { label: "Vehicle Docs", value: "vehicle", action: "setDocCategory", next: "documentCategory" },
          { label: "Others", value: "others", action: "setDocCategory", next: "documentCategory" },
          { label: "Proceed with Application", value: "Proceed with Application", next: "applicationReview" }
        ];
      }
    },
    documentCategory: {
      dynamicMessages: [
        (state) => {
          const category = getCurrentCategory(state);
          return {
            html: [
              `<strong>${category.title}</strong><br>`,
              "Choose the document you want to upload, skip, or re-upload."
            ].join("")
          };
        }
      ],
      dynamicOptions: (state) => {
        const category = getCurrentCategory(state);
        return category.docs.map((doc) => {
          const entry = getDocumentEntry(state, doc.key);
          const suffix = entry ? ` (${entry.status === "uploaded" ? "Uploaded" : "Skipped"})` : "";
          return {
            label: `${doc.label}${suffix}`,
            value: doc.key,
            action: "selectDoc",
            next: "documentAction"
          };
        }).concat([
          { label: "Back to Document Center", value: "back", next: "documentCenter" }
        ]);
      }
    },
    documentAction: {
      dynamicMessages: [
        (state) => {
          const doc = getSelectedDocument(state);
          const entry = getDocumentEntry(state, doc.key);
          const statusLine = entry
            ? `Current status: <strong>${entry.status === "uploaded" ? "Uploaded" : "Skipped / Already Uploaded"}</strong><br>`
            : "Current status: <strong>Pending</strong><br>";
          const noteLine = entry && entry.note ? `Latest note: <strong>${escapeDocHtml(entry.note)}</strong><br>` : "";

          return {
            html: [
              `<strong>${doc.label}</strong><br>`,
              `${statusLine}`,
              `${noteLine}`,
              "Choose how you would like to continue with this document."
            ].join("")
          };
        }
      ],
      dynamicOptions: () => {
        return [
          { label: "Upload Document", value: "upload", action: "triggerUpload" },
          { label: "Skip - Already Uploaded", value: "skip", action: "skipSelectedDoc", next: () => "documentCategory" },
          { label: "Re-upload Document", value: "reupload", action: "triggerUpload" },
          { label: "Back to Category", value: "back", next: "documentCategory" }
        ];
      }
    },
    documentUploadResult: {
      dynamicMessages: [
        (state) => {
          const doc = getSelectedDocument(state);
          const note = escapeDocHtml(state.lastUploadNote || "Uploaded");

          if (doc.key === "pan") {
            return {
              html: [
                `<strong>${doc.label} uploaded successfully.</strong><br>`,
                `Received file: <strong>${note}</strong><br>`,
                "OCR completed successfully.<br>",
                "The uploaded PAN matches the entered PAN details."
              ].join("")
            };
          }

          return {
            html: [
              `<strong>${doc.label} uploaded successfully.</strong><br>`,
              `Received file: <strong>${note}</strong>`
            ].join("")
          };
        }
      ],
      options: [
        { label: "Upload More Documents", value: "Upload More Documents", next: "documentCategory" },
        { label: "Go to Document Center", value: "Go to Document Center", next: "documentCenter" }
      ]
    },
    applicationReview: {
      dynamicMessages: [
        (state) => {
          const uploaded = summarizeDocsByStatus(state, "uploaded");
          const skipped = summarizeDocsByStatus(state, "skipped");
          return {
            html: [
              "<strong>Application Review</strong><br>",
              "Your loan estimate and document stage are complete.<br><br>",
              `Uploaded documents: <strong>${uploaded || "None"}</strong><br>`,
              `Skipped / already uploaded: <strong>${skipped || "None"}</strong><br><br>`,
              "Would you like to proceed with the application?"
            ].join("")
          };
        }
      ],
      options: [
        { label: "Proceed with Application", value: "Proceed with Application", next: "finalSummary" },
        { label: "Upload More Documents", value: "Upload More Documents", next: "documentCenter" }
      ]
    },
    finalSummary: {
      dynamicMessages: [
        (state) => {
          return {
            html: [
              "<strong>Thank you. Your application and supporting documents have been received successfully.</strong><br><br>",
              `Customer Name: <strong>${escapeDocHtml(state.name || "-")}</strong><br>`,
              `Mobile Number: <strong>${escapeDocHtml(state.phone || "-")}</strong><br>`,
              `Loan Type: <strong>${escapeDocHtml(state.loanType || "-")}</strong><br>`,
              `Requested Amount: <strong>${formatCurrency(state.loanAmount)}</strong><br>`,
              `State: <strong>${escapeDocHtml(state.state || "-")}</strong><br>`,
              `Branch: <strong>${escapeDocHtml(state.branch || "-")}</strong><br>`,
              `Tenure: <strong>${escapeDocHtml(state.tenureMonths || "-")} months</strong><br>`,
              `Indicative ROI: <strong>${state.roi ? `${state.roi.toFixed(2)}%` : "-"}</strong><br>`,
              `Estimated EMI: <strong>${state.emi ? formatCurrency(state.emi) : "-"}</strong><br><br>`,
              "Our SK Finance team will review the application and connect with you for the next steps."
            ].join("")
          };
        },
      ],
      options: [
        { label: "Restart Demo", value: "Restart Demo", next: "welcome", action: "restart" }
      ]
    },
    fallback: {
      messages: [
        "I did not catch that. Please use one of the available options or enter the requested details again."
      ]
    }
  }
};

function formatCurrency(value) {
  const amount = Number(String(value).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(amount)) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(amount);
}

function calculateRoi(amount, tenure) {
  let roi = 10.5;

  if (amount >= 1500000) {
    roi += 0.75;
  }

  if (tenure >= 48) {
    roi += 0.5;
  }

  return roi;
}

function calculateEmi(amountValue, annualRate, monthsValue) {
  const principal = Number(amountValue);
  const months = Number(monthsValue);
  const monthlyRate = annualRate / 12 / 100;

  if (!principal || !months || !monthlyRate) {
    return 0;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return Math.round((principal * monthlyRate * factor) / (factor - 1));
}

const documentCatalog = {
  kyc: {
    title: "KYC Docs",
    docs: [
      { key: "pan", label: "PAN" },
      { key: "drivingLicense", label: "Driving License" }
    ]
  },
  income: {
    title: "Income Docs",
    docs: [
      { key: "salarySlips", label: "Salary Slips (photo/PDF)" },
      { key: "itrAck", label: "ITR acknowledgment" },
      { key: "gstSummary", label: "GST summary screenshots" }
    ]
  },
  banking: {
    title: "Banking Docs",
    docs: [
      { key: "bankStatement", label: "Bank statement PDF" },
      { key: "accountSummary", label: "Screenshot of account summary (fallback case)" }
    ]
  },
  vehicle: {
    title: "Vehicle Docs",
    docs: [
      { key: "dealerQuotation", label: "Dealer quotation" },
      { key: "vehicleInvoice", label: "Vehicle invoice draft" }
    ]
  },
  others: {
    title: "Others",
    docs: [
      { key: "cancelledCheque", label: "Cancelled cheque (image)" },
      { key: "utilityBill", label: "Utility bill (address proof)" }
    ]
  }
};

function getCurrentCategory(state) {
  return documentCatalog[state.currentDocCategory] || documentCatalog.kyc;
}

function getSelectedDocument(state) {
  const categories = Object.values(documentCatalog);
  for (const category of categories) {
    const found = category.docs.find((doc) => doc.key === state.selectedDocKey);
    if (found) {
      return found;
    }
  }

  return documentCatalog.kyc.docs[0];
}

function getDocumentEntry(state, key) {
  return (state.uploadedDocs || {})[key];
}

function getDocumentStatusCount(state, status) {
  return Object.values(state.uploadedDocs || {}).filter((entry) => entry.status === status).length;
}

function summarizeDocsByStatus(state, status) {
  const labels = [];
  Object.values(documentCatalog).forEach((category) => {
    category.docs.forEach((doc) => {
      const entry = getDocumentEntry(state, doc.key);
      if (entry && entry.status === status) {
        labels.push(doc.label);
      }
    });
  });

  return labels.join(", ");
}

function escapeDocHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
