import React, { useEffect, useRef, useState } from 'react';

export default function List2() {
  const [guest, setGuest] = useState([]);
  const newFirstName = useRef();
  const newLastName = useRef();

  // const baseUrl = 'http://localhost:4000';

  // const response = await fetch(`${baseUrl}/guests`);
  // const allGuests = await response.json();

  // TO SAVE GUESTS DURING RELOADS??? is not working
  // useEffect(() => {
  //   const storedGuests = JSON.parse(localStorage.getItem('Key'));
  //   if (storedGuests) setGuest(storedGuests);
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem('Key', JSON.stringify(guest));
  // }, [guest]);

  function addNewGuest(e) {
    e.preventDefault();
    const firstName = newFirstName.current.value;
    const lastName = newLastName.current.value;
    setGuest((guestList) => {
      return [
        ...guestList,
        {
          id: `${firstName}-${lastName}`,
          firstName: firstName,
          lastName: lastName,
          attending: false,
        },
      ];
    });
    newFirstName.current.value = null;
    newLastName.current.value = null;
  }

  function isAttending(id) {
    const newGuests = [...guest];
    const attendee = guest.find((guestList) => guestList.id === id);
    attendee.attending = !attendee.attending;
    setGuest(newGuests);
  }

  console.log(guest);
  return (
    <>
      <h2>New Guest:</h2>
      <form className="input">
        <label>
          First Name
          <input ref={newFirstName} />
        </label>
        <br />
        <label>
          Last Name
          <input ref={newLastName} />
        </label>
        <br />
        <button onClick={addNewGuest}>Add new guest</button>
      </form>

      <div>
        {guest.map((guestList) => {
          return (
            <ul key={guestList.id}>
              <li>
                {guestList.firstName} {guestList.lastName}
              </li>
              <li>
                Attending:
                <input
                  type="checkbox"
                  checked={guestList.attending}
                  onChange={() => {
                    isAttending(guestList.id);
                  }}
                />
              </li>
              <button
                onClick={() => {
                  const newGuestList = guest.filter((i) => {
                    return i.id !== guestList.id;
                  });
                  setGuest(newGuestList);
                  console.log(guest);
                }}
              >
                remove
              </button>
            </ul>
          );
        })}
      </div>
    </>
  );
}
