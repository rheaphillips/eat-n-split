import { useState } from "react";
import AddFriendForm from "./AddFriendForm";
import Friend from "./Friend";

export default function Sidebar({
  friends,
  onAddFriend,
  selectedID,
  onSelectedID,
}) {
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
      {isAddingFriend && (
        <AddFriendForm
          onAddFriend={onAddFriend}
          onIsAddingFriend={handleIsAddingFriend}
        />
      )}
      <button className="button" onClick={handleIsAddingFriend}>
        {isAddingFriend ? "Close" : "Add friend"}
      </button>
    </div>
  );
}
