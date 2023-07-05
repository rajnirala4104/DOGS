import React, { useEffect, useState } from "react";
import "./App.css";
import {
  getDogBreeds,
  getDogImageByBreedName,
  getSubBreedImageBreed,
} from "./api/services/FetchingData";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [breedName, setBreed] = useState<string>("affenpinscher");
  const [dogsAllImagesByBreed, setDogsAllImagesByBreed] = useState<string[]>(
    []
  );
  const [subBreedName, setSubBreedName] = useState<string>("");

  const findToSubBreed = (userInputValue: string) => {
    setBreed(userInputValue);
    const splitValueOfBreedName = userInputValue.split(" ");
    if (splitValueOfBreedName.length >= 1) {
      setSubBreedName(splitValueOfBreedName[1]);
      setBreed(splitValueOfBreedName[0]);
    }
  };

  console.log(dogsAllImagesByBreed);
  useEffect(() => {
    (async () => {
      const response = await getDogBreeds();
      const _ALL_BREEDS: string[] = [];
      const responseMessageData = response.data.message;
      Object.keys(responseMessageData).forEach((breed) => {
        if (responseMessageData[breed].length > 0) {
          for (let i = 0; i < responseMessageData[breed].length; i++) {
            _ALL_BREEDS.push(responseMessageData[breed][i] + " " + breed);
          }
        } else _ALL_BREEDS.push(breed);
      });
      setBreeds(_ALL_BREEDS);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getSubBreedImageBreed(breedName, subBreedName);
      console.log(response.data.message);
    })();
  }, [subBreedName]);

  useEffect(() => {
    const DOGS_ALL_IMAGESl: string[] = [];
    (async () => {
      const response = await getDogImageByBreedName(breedName);
      if (response.data.message.length > 0)
        DOGS_ALL_IMAGESl.push(response.data.message);
      else console.log("Oops!!");
    })();
  }, [breedName]);

  return (
    <div className="App min-h-[100vh]">
      <section className="containe border-2 bg-gray-200 flex flex-col my-auto">
        <h2>BREEDS LIST</h2>
        <div className="flex justify-center items-center flex-col space-y-3 lg:flex-row bg-white py-2">
          <p>https://dog.ceo/api/breed/</p>
          <select
            className="py-2 px-4 mx-2 rounded"
            onChange={(e) => findToSubBreed(e.target.value)}
          >
            {breeds.map((breed, i) => (
              <option key={i} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <p>/images/random</p>
          <button className="bg-blue-400 px-4 py-2 rounded-lg">Fetch!</button>
        </div>
        <div className=" min-h-[20rem] flex flex-col justify-center items-center">
          {/* {dogsAllImagesByBreed.map((imgLink) => (
            <img src={imgLink} className="" alt="dog" />
          ))} */}
        </div>
      </section>
    </div>
  );
}

export default App;
