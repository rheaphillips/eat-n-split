import { useState } from "react";
import Sidebar from "./Sidebar";
import SplitBillForm from "./SplitBillForm";

export default function EatNSplit() {
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
    setSelectedID((selectedID) => (selectedID === id ? null : id));
  }

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
  }

  function handleUpdateBalance(balance) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedID
          ? { ...friend, balance: friend.balance + balance }
          : friend
      )
    );
    setSelectedID(null);
  }

  const selectedFriend = friends.find(
    (friend) => friend.id === selectedID
  )?.name;

  return (
    <>
      <Sidebar
        friends={friends}
        onAddFriend={handleAddFriend}
        selectedID={selectedID}
        onSelectedID={handleSelectedID}
      />
      {selectedID && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </>
  );
}
