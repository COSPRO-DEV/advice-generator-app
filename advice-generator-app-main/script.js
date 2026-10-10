// ===== Advice Generator - script.js =====

// Store the API URL once, so we never repeat it (Tip #7)
const ADVICE_URL = "https://api.adviceslip.com/advice";

// Grab the three elements we'll need to update
const adviceNumberEl = document.getElementById("advice-number");
const adviceTextEl = document.getElementById("advice-text");
const diceBtn = document.getElementById("dice-btn");

// getAdvice fetches a random quote from the API and updates the page.
// It's "async" because fetching takes real time - "await" lets us pause
// and wait for the response before moving to the next line, instead of
// the code racing ahead before the data has actually arrived.
async function getAdvice() {
  // Loading state: disable the button and show feedback while we wait (Tip #4)
  diceBtn.disabled = true;
  adviceTextEl.textContent = "Loading...";

  try {
    const response = await fetch(ADVICE_URL);

    // fetch() does NOT automatically throw an error for a failed request
    // like a 404 or 500 - we have to check response.ok ourselves (Tip #3)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // The real advice is nested inside data.slip.advice, not data.advice (Tip #1)
    const { slip } = data;

    // Render safely using textContent, not innerHTML (Tip #6)
    adviceNumberEl.textContent = slip.id;
    adviceTextEl.textContent = `"${slip.advice}"`;

  } catch (error) {
    // Error state: if anything above failed, show a clear message
    // instead of leaving the card stuck or confusing
    adviceTextEl.textContent = "Something went wrong. Please try again.";
    console.error("Failed to fetch advice:", error);

  } finally {
    // finally ALWAYS runs, whether the try succeeded or the catch triggered -
    // this guarantees the button never stays stuck disabled
    diceBtn.disabled = false;
  }
}

// Fetch advice immediately when the page loads, so the card is never empty (Tip #5)
getAdvice();

// Fetch new advice every time the dice button is clicked
diceBtn.addEventListener("click", getAdvice);