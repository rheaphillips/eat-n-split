import { useState } from "react";

const initialFriends = [
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
];

export default function App() {
  return <EatNSplit />;
}

function EatNSplit() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelectedFriend(id) {
    setSelectedFriend(selectedFriend === id ? null : id);
  }

  return (
    <div className="app">
      <Sidebar
        selectedFriend={selectedFriend}
        onSelectedFriend={handleSelectedFriend}
      />
      <SplitBillForm />
    </div>
  );
}

function Sidebar({ selectedFriend, onSelectedFriend }) {
  return (
    <div className="sidebar">
      {initialFriends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          isSelected={selectedFriend === friend.id}
          onSelectedFriend={onSelectedFriend}
        />
      ))}
      <AddFriendForm />
    </div>
  );
}

function Friend({ friend, isSelected, onSelectedFriend }) {
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
      <Button onClick={() => onSelectedFriend(id)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriendForm() {
  return <form className="form-add-friend"></form>;
}

function SplitBillForm() {
  return <form className="form-split-bill"></form>;
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
