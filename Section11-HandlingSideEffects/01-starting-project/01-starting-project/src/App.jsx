import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setavailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  useEffect(() => {
    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    const storedPlaces = storedIDs.map((id)=>
      AVAILABLE_PLACES.find((place) => place.id === id)
    );
    setPickedPlaces(storedPlaces);
  }, []);

  useEffect(() => {
    // this code is a side effect as its not directly related to main task.
    // navigator object is provided by browser.
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlacesArray = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setavailablePlaces(sortedPlacesArray);
    });
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    // not store already existing ids.
    if (storedIDs.indexOf(id) === -1) {
      localStorage.setItem("selectedPlaces", JSON.stringify(id, ...storedIDs)); // store some data in browser's storage, will be available on reload of web page.
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    // code for deleting items from local storage
    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    // id != selectedPlace.current - if current id is not equal to selected id, we don't need to remove it, otherwise remove it
    // so this is a condition
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIDs.filter((id) => id != selectedPlace.current))
    ); // store some data in browser's storage, will be available on reload of web page.
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting Places By Distance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
