// local version of the guest list

import React, { useRef, useState } from 'react';

export default function List() {
  const [guest, setGuest] = useState([]);
  const newFirstName = useRef();
  const newLastName = useRef();

  // adding guest to array
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

  // toggles attending/not attending
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

      <div data-test-id="guest">
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
                  <input
                    aria-label={`Attending status ${guestList.firstName} ${guestList.lastName}`}
                    type="checkbox"
                    checked={guestList.attending}
                    onChange={() => {
                      isAttending(guestList.id);
                    }}
                  />
                  {guestList.attending === true ? 'attending' : 'not attending'}
                </li>
                <button
                  aria-label={`Remove ${guestList.firstName} ${guestList.lastName}`}
                  onClick={() => {
                    const newGuestList = guest.filter((i) => {
                      return i.id !== guestList.id;
                    });
                    setGuest(newGuestList);
                    console.log(guest);
                  }}
                >
                  remove guest
                </button>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}
