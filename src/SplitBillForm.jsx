import { useState } from "react";

export default function SplitBillForm({
  selectedFriend,
  onUpdateBalance,
  onSelectedID,
}) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState("");
  const [payer, setPayer] = useState("You");

  function setValidNumber(val) {
    return !isNaN(val) && val ? +val : "";
  }

  return (
    <form
      className="form-split-bill"
      onSubmit={() => {
        onUpdateBalance(payer === "You" ? bill - yourExpense : -yourExpense);
        onSelectedID();
      }}
    >
      <h2>SPLIT A BILL WITH {selectedFriend.toUpperCase()}</h2>
      <label>💰 Bill value</label>
      <input
        value={setValidNumber(bill)}
        onChange={(e) => {
          setBill(setValidNumber(e.target.value));
        }}
      ></input>
      <label>🧍‍♀️ Your expense</label>
      <input
        value={yourExpense}
        onChange={(e) => {
          const expense = setValidNumber(e.target.value);
          setYourExpense(expense);
          if (expense > bill) setBill(expense);
        }}
      ></input>
      <label>👬 {selectedFriend}'s expense</label>
      <input
        value={yourExpense || yourExpense === 0 ? bill - yourExpense : 0}
        disabled
      ></input>
      <label>🤑 Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="You">You</option>
        <option value="Friend">{selectedFriend}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
