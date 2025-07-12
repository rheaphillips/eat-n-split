import { useState } from "react";

export default function App() {
  return <EatNSplit />;
}

function EatNSplit() {
  const [selectedID, setSelectedID] = useState(null);
  const [friends, setFriends] = useState([
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]);

  function handleSelectedID(id) {
    setSelectedID(selectedID === id ? null : id);
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  function handleUpdateBalance(balance) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedID ? { ...friend, balance } : friend
      )
    );
  }

  const selectedFriend = friends.find(
    (friend) => friend.id === selectedID
  )?.name;

  return (
    <div className="app">
      <Sidebar
        friends={friends}
        onAddFriend={handleAddFriend}
        selectedID={selectedID}
        onSelectedID={handleSelectedID}
      />
      {selectedID && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSelectedID={handleSelectedID}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}

function Sidebar({ friends, onAddFriend, selectedID, onSelectedID }) {
  const [isAddingFriend, setIsAddingFriend] = useState(false);

  function handleIsAddingFriend() {
    setIsAddingFriend((isAddingFriend) => !isAddingFriend);
  }

  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            isSelected={selectedID === friend.id}
            onSelectedID={onSelectedID}
          />
        ))}
      </ul>
      {isAddingFriend ? (
        <AddFriendForm
          onAddFriend={onAddFriend}
          onIsAddingFriend={handleIsAddingFriend}
        />
      ) : (
        <Button onClick={handleIsAddingFriend}>Add friend</Button>
      )}
    </div>
  );
}

function Friend({ friend, isSelected, onSelectedID }) {
  const { id, name, image, balance } = friend;

  let message = "";

  if (balance < 0) message = `You owe ${name} $${Math.abs(balance)}`;
  else if (balance > 0) message = `${name} owes you $${Math.abs(balance)}`;
  else message = `You and ${name} are even`;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} />
      <h3>{name}</h3>
      <p className={balance == 0 ? "" : balance > 0 ? "green" : "red"}>
        {message}
      </p>
      <Button onClick={() => onSelectedID(id)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend, onIsAddingFriend }) {
  let id = new Date().getTime();

  const [name, setName] = useState("");
  const [image, setImage] = useState(`https://i.pravatar.cc/48?u=${id}`);

  function handleAddFriend() {
    onAddFriend({
      id: id,
      name: name,
      image: image,
      balance: 0,
    });
    onIsAddingFriend();
  }

  return (
    <form className="form-add-friend">
      <label>👬 Friend name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>🌄 Image URL</label>
      <input value={image} onChange={(e) => setImage(e.target.value)}></input>
      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend, onUpdateBalance, onSelectedID }) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [payer, setPayer] = useState("You");

  function setValidNumber(val) {
    return !isNaN(val) && val ? +val : "";
  }

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selectedFriend.toUpperCase()}</h2>
      <label>💰 Bill value</label>
      <input
        value={bill}
        onChange={(e) => setBill(setValidNumber(e.target.value))}
      ></input>
      <label>🧍‍♀️ Your expense</label>
      <input
        value={yourExpense}
        onChange={(e) => {
          setYourExpense(setValidNumber(e.target.value));
          setFriendExpense(bill - setValidNumber(e.target.value));
        }}
      ></input>
      <label>👬 {selectedFriend}'s expense</label>
      <input
        value={friendExpense}
        onChange={(e) => {
          setYourExpense(bill - setValidNumber(e.target.value));
          setFriendExpense(setValidNumber(e.target.value));
        }}
      ></input>
      <label>🤑 Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option>You</option>
        <option>{selectedFriend}</option>
      </select>
      <Button
        onClick={(e) => {
          e.preventDefault();
          onUpdateBalance(payer === "You" ? friendExpense : -yourExpense);
          onSelectedID();
        }}
      >
        Split Bill
      </Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
