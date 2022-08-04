import React, { useEffect, useState } from 'react';

export default function ListApi() {
  const [guest, setGuest] = useState([]); // guest list
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // get all guests from api
  const baseUrl = 'http://localhost:4000';

  async function getFullGuestList() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuest(allGuests);
    setLoading(false);
    console.log('fetching guest list');
  }

  // fetch guest list
  useEffect(() => {
    getFullGuestList().catch(() =>
      console.log('fetching all guests went wrong'),
    );
  }, []);

  // adding guest to array
  async function addNewGuest(e) {
    e.preventDefault();
    console.log('A');
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    console.log('B');
    const createdGuest = await response.json();
    console.log(createdGuest);
    setGuest([...guest], createdGuest);
    getFullGuestList().catch(() => console.log('adding new guest went wrong'));
    setFirstName('');
    setLastName('');
  }

  // deleting from array
  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const newGuestList = guest.filter((i) => {
      return i.id !== deletedGuest.id;
    });
    setGuest(newGuestList);
    getFullGuestList().catch(() =>
      console.log('deleting from guests went wrong'),
    );
  }

  // toggles attending/not attending
  async function changeAttendingStatus(id, value) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !value }),
    });
    const updatedGuest = await response.json();
    const updatedGuestList = guest.filter((i) => {
      return i.id !== updatedGuest.id;
    });
    setGuest([...guest], updatedGuestList);
    getFullGuestList().catch(() =>
      console.log('changing attending status went wrong'),
    );
  }

  // reset

  return loading ? (
    <h1>loading...</h1>
  ) : (
    <div data-test-id="guest">
      <h2>New Guest:</h2>
      <form name="form" onSubmit={addNewGuest}>
        <label>
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Last Name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </label>
        <br />
        <button onClick={addNewGuest}>Add new guest</button>
      </form>
      <div>
        {/* check if there are guests, show list */}
        {guest.length === 0 ? (
          <div>please add guests to your list :)</div>
        ) : (
          <div>
            <h2>Guests:</h2>
            {guest.map((guestList) => {
              return (
                <ul key={guestList.id}>
                  <li>
                    {guestList.firstName} {guestList.lastName}
                  </li>
                  <li>
                    <label>
                      <input
                        aria-label={`Attending status ${guestList.firstName} ${guestList.lastName}`}
                        type="checkbox"
                        checked={guestList.attending}
                        onChange={() => {
                          changeAttendingStatus(
                            guestList.id,
                            guestList.attending,
                          ).catch(() =>
                            console.log('changing attending status went wrong'),
                          );
                        }}
                      />
                      {guestList.attending === true
                        ? 'attending'
                        : 'not attending'}
                    </label>
                  </li>
                  <button
                    aria-label={`Remove ${guestList.firstName} ${guestList.lastName}`}
                    onClick={() => {
                      deleteGuest(guestList.id).catch(() =>
                        console.log('adding guest went wrong'),
                      );
                      document.form.reset();
                    }}
                  >
                    remove guest
                  </button>
                </ul>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
