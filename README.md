# SK Finance Car Loan WhatsApp Chatbot Mockup

This is a lightweight front-end mockup of a WhatsApp-style chatbot for SK Finance car loan enquiries.
It follows the provided SK Finance conversation and includes a demo Aadhaar/PAN verification page.

## Files

- `index.html`: main UI layout
- `styles.css`: visual design and responsive styling
- `chat-script.js`: chatbot flow configuration
- `app.js`: chat engine that renders messages, handles user input, and moves through the scripted steps
- `kyc.html`: demo Aadhaar and PAN verification handoff page

## Run locally

Open `index.html` in a browser.

Optional local server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/index.html`

## Customize the script

Edit `chat-script.js` and update:

- `messages` for each chatbot step
- `options` for quick reply buttons
- `capture` to store lead data
- `next` to move to the next scripted step

The current flow includes:

- language selection
- mobile number and OTP
- terms acceptance
- car loan type selection
- amount, state, and branch selection
- email and remarks capture
- Aadhaar and PAN verification handoff
- eligibility message
- tenure input with indicative ROI and EMI
- final proceed confirmation
