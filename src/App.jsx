import { useState } from "react";

export default function App() {
  return <EatNSplit />;
}

function EatNSplit() {
  const [selectedFriend, setSelectedFriend] = useState(false);
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

  const selectedFriendName = friends.find(
    (friend) => friend.id === selectedFriend
  )?.name;

  function handleSelectedFriend(id) {
    setSelectedFriend(selectedFriend === id ? null : id);
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  return (
    <div className="app">
      <Sidebar
        friends={friends}
        onAddFriend={handleAddFriend}
        selectedFriend={selectedFriend}
        onSelectedFriend={handleSelectedFriend}
      />
      {selectedFriend && <SplitBillForm selectedFriend={selectedFriendName} />}
    </div>
  );
}

function Sidebar({ friends, onAddFriend, selectedFriend, onSelectedFriend }) {
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
            isSelected={selectedFriend === friend.id}
            onSelectedFriend={onSelectedFriend}
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

function AddFriendForm({ onAddFriend, onIsAddingFriend }) {
  let id = new Date().getTime();

  const [name, setName] = useState("");
  const [image, setImage] = useState(`https://i.pravatar.cc/48?u=${id}`);

  function submitFriend() {
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
      <Button onClick={submitFriend}>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selectedFriend.toUpperCase()}</h2>
      <label>💰 Bill value</label>
      <input></input>
      <label>🧍‍♀️ Your expense</label>
      <input></input>
      <label>👬 {selectedFriend}'s expense</label>
      <input></input>
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>{selectedFriend}</option>
      </select>
      <Button>Split Bill</Button>
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
