(function () {
  const CHAT_STATE_KEY = "skFinanceChatState";
  const KYC_STATUS_KEY = "skFinanceKycStatus";
  const messageContainer = document.getElementById("chatMessages");
  const quickRepliesContainer = document.getElementById("quickReplies");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const restartButton = document.getElementById("restartButton");
  const presenceText = document.getElementById("presenceText");
  const template = document.getElementById("messageTemplate");

  const typingDelay = 650;
  let currentStepId = window.chatScript.initialStep;
  let conversationState = {};
  let isBotBusy = false;

  function persistChatState() {
    sessionStorage.setItem(CHAT_STATE_KEY, JSON.stringify({ currentStepId, conversationState }));
  }

  function restoreChatState() {
    const raw = sessionStorage.getItem(CHAT_STATE_KEY);
    if (!raw) {
      return false;
    }

    try {
      const parsed = JSON.parse(raw);
      currentStepId = parsed.currentStepId || window.chatScript.initialStep;
      conversationState = parsed.conversationState || {};
      return true;
    } catch (_error) {
      return false;
    }
  }

  function getPendingKycReturn() {
    return sessionStorage.getItem(KYC_STATUS_KEY) === "verified";
  }

  function clearPendingKycReturn() {
    sessionStorage.removeItem(KYC_STATUS_KEY);
  }

  function setPresence(text) {
    presenceText.textContent = text;
  }

  function resetConversation() {
    currentStepId = window.chatScript.initialStep;
    conversationState = { uploadedDocs: {} };
    isBotBusy = false;
    messageContainer.innerHTML = "";
    quickRepliesContainer.innerHTML = "";
    input.value = "";
    input.disabled = false;
    setPresence("Online now");
    persistChatState();
    renderStep(currentStepId);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatTextAsHtml(text) {
    return escapeHtml(text).replace(/\n/g, "<br>");
  }

  function createMessage(content, sender, isTyping) {
    const fragment = template.content.cloneNode(true);
    const row = fragment.querySelector(".message-row");
    const bubble = fragment.querySelector(".message-bubble");
    row.classList.add(sender);

    if (isTyping) {
      bubble.innerHTML = '<div class="typing-indicator" aria-label="Bot is typing"><span></span><span></span><span></span></div>';
    } else if (content && typeof content === "object" && content.html) {
      bubble.innerHTML = content.html;
    } else {
      bubble.innerHTML = formatTextAsHtml(content);
    }

    messageContainer.appendChild(fragment);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    return messageContainer.lastElementChild;
  }

  function getStep(stepId) {
    return window.chatScript.steps[stepId] || window.chatScript.steps[window.chatScript.fallbackStep];
  }

  function normalizeInput(value) {
    return value.trim();
  }

  function getOptions(step) {
    if (typeof step.dynamicOptions === "function") {
      return step.dynamicOptions(conversationState);
    }

    return step.options || [];
  }

  function runStepEnter(step) {
    if (typeof step.onEnter === "function") {
      step.onEnter(conversationState);
      persistChatState();
    }
  }

  function validateInput(step, value) {
    if (!step.capture || !step.capture.validate) {
      return true;
    }

    const normalized = value.trim();
    const numeric = normalized.replace(/\D/g, "");

    switch (step.capture.validate) {
      case "phone":
        return /^[6-9]\d{9}$/.test(numeric);
      case "otp":
        return /^\d{6}$/.test(numeric);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
      case "name":
        return normalized.length >= 3;
      case "amount":
        return /^\d{5,8}$/.test(numeric);
      case "upload":
        return normalized.length >= 2;
      default:
        return true;
    }
  }

  function getValidationMessage(step) {
    if (!step.capture || !step.capture.validate) {
      return "Please enter a valid response.";
    }

    switch (step.capture.validate) {
      case "phone":
        return "Please enter a valid 10-digit Indian mobile number.";
      case "otp":
        return "Please enter a valid 6-digit OTP.";
      case "email":
        return "Please enter a valid email address.";
      case "name":
        return "Please enter your full name.";
      case "amount":
        return "Please enter a valid loan amount.";
      case "upload":
        return "Please enter the uploaded file name, file type, or attachment note.";
      default:
        return "Please enter a valid response.";
    }
  }

  function normalizeCapturedValue(step, value) {
    if (!step.capture || !step.capture.validate) {
      return value.trim();
    }

    if (["phone", "otp", "amount"].includes(step.capture.validate)) {
      return value.replace(/\D/g, "");
    }

    return value.trim();
  }

  function saveCapture(step, value) {
    if (!step.capture) {
      return;
    }

    conversationState[step.capture.key] = normalizeCapturedValue(step, value);
  }

  function applyAction(option) {
    if (!option || !option.action) {
      return;
    }

    if (option.action === "restart") {
      resetConversation();
      return "stopped";
    }

    if (option.action === "setEmailSkipped") {
      conversationState.email = "";
    }

    if (option.action === "setRemarksSkipped") {
      conversationState.remarks = "";
    }

    if (option.action === "setDocCategory") {
      conversationState.currentDocCategory = option.value;
    }

    if (option.action === "selectDoc") {
      conversationState.selectedDocKey = option.value;
    }

    if (option.action === "skipSelectedDoc") {
      const key = conversationState.selectedDocKey;
      if (key) {
        conversationState.uploadedDocs = conversationState.uploadedDocs || {};
        conversationState.uploadedDocs[key] = {
          status: "skipped",
          note: "Skipped as already uploaded"
        };
      }
    }

    persistChatState();
    return "continue";
  }

  function collectMessages(step) {
    const staticMessages = step.messages || [];
    const dynamicMessages = (step.dynamicMessages || []).map((entry) => {
      return typeof entry === "function" ? entry(conversationState) : entry;
    });

    return [...staticMessages, ...dynamicMessages];
  }

  function renderQuickReplies(step) {
    quickRepliesContainer.innerHTML = "";
    const options = getOptions(step);

    if (!options.length) {
      return;
    }

    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quick-reply";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        processUserTurn(option.label, option);
      });
      quickRepliesContainer.appendChild(button);
    });
  }

  function renderStep(stepId) {
    const step = getStep(stepId);
    runStepEnter(step);
    const messages = collectMessages(step);
    quickRepliesContainer.innerHTML = "";
    input.placeholder = step.capture ? "Type your reply..." : "Choose an option or type your reply...";
    input.disabled = isBotBusy;

    if (!messages.length) {
      renderQuickReplies(step);
      return;
    }

    isBotBusy = true;
    input.disabled = true;
    setPresence("Typing...");
    const typingNode = createMessage("", "bot", true);

    setTimeout(() => {
      if (typingNode && typingNode.remove) {
        typingNode.remove();
      }

      messages.forEach((message) => {
        createMessage(message, "bot", false);
      });

      renderQuickReplies(step);
      isBotBusy = false;
      input.disabled = false;
      setPresence("Online now");
      input.focus();
    }, typingDelay);
  }

  function resolveNext(next) {
    if (typeof next === "function") {
      return next(conversationState);
    }

    return next;
  }

  function moveToNextStep(nextStepId) {
    currentStepId = resolveNext(nextStepId);
    persistChatState();
    renderStep(currentStepId);
  }

  function processUserTurn(rawValue, selectedOption) {
    if (isBotBusy) {
      return;
    }

    const value = normalizeInput(rawValue);
    if (!value) {
      return;
    }

    createMessage(value, "user", false);
    input.value = "";

    const currentStep = getStep(currentStepId);
    const options = getOptions(currentStep);
    const option = selectedOption || options.find((item) => {
      return item.label.toLowerCase() === value.toLowerCase() || item.value.toLowerCase() === value.toLowerCase();
    });

    if (option && currentStep.capture && !option.skipCapture) {
      saveCapture(currentStep, option.value);
    }

    if (!option && options.length && !currentStep.capture) {
      moveToNextStep(window.chatScript.fallbackStep);
      return;
    }

    if (currentStep.capture && !option) {
      if (!validateInput(currentStep, value)) {
        createMessage(getValidationMessage(currentStep), "bot", false);
        renderQuickReplies(currentStep);
        return;
      }

      saveCapture(currentStep, value);
    }

    persistChatState();
    const actionStatus = applyAction(option);
    if (actionStatus === "stopped") {
      return;
    }

    if (option && option.next) {
      moveToNextStep(option.next);
      return;
    }

    if (currentStep.next) {
      moveToNextStep(currentStep.next);
      return;
    }

    renderQuickReplies(currentStep);
  }

  function handleKycReturn() {
    if (getPendingKycReturn() && restoreChatState()) {
      clearPendingKycReturn();
      moveToNextStep("eligibleResult");
      return true;
    }

    if (restoreChatState()) {
      renderStep(currentStepId);
      return true;
    }

    return false;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    processUserTurn(input.value);
  });

  restartButton.addEventListener("click", resetConversation);

  if (!handleKycReturn()) {
    resetConversation();
  }
})();
