import React, { useEffect, useRef, useState } from 'react';

export default function List2() {
  const [guest, setGuest] = useState([]);
  const newFirstName = useRef();
  const newLastName = useRef();

  useEffect(() => {
    const storedGuests = JSON.parse(localStorage.getItem('Key'));
    if (storedGuests) setGuest(storedGuests);
  }, []);

  useEffect(() => {
    localStorage.setItem('Key', JSON.stringify(guest));
  }, [guest]);

  function addNewGuest() {
    const firstName = newFirstName.current.value;
    const lastName = newLastName.current.value;
    setGuest((guestList) => {
      return [
        ...guestList,
        {
          id: `${guestList.firstName}-${guestList.lastName}`,
          firstName: firstName,
          lastName: lastName,
          attending: false,
        },
      ];
    });
    newFirstName.current.value = null;
    newLastName.current.value = null;
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
                <input type="checkbox" checked={guestList.attending} />
              </li>
            </ul>
          );
        })}
      </div>
      <button>remove</button>
    </>
  );
}
