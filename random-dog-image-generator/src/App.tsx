import React, { useEffect, useState } from "react";
import "./App.css";
import {
  getDogBreeds,
  getDogImageByBreedName,
  getSubBreedImageBreed,
} from "./api/services/FetchingData";

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [onlyBreed, setOnlyBreed] = useState<string>("");
  const [subBreed, setSubBreed] = useState<string>("");
  const [image, setImage] = useState<string[]>([]);
  const [dogFullName, setDogFullName] = useState<string[]>([]);

  // ---- seperate the dog breed and sub-breed
  const divideTheNameAndSet = (dogFullName: string) => {
    const dividedNames = dogFullName.split(" ");
    if (dividedNames.length === 2) {
      setSubBreed(dividedNames[0]);
      setOnlyBreed(dividedNames[1]);
    } else {
      setOnlyBreed(dividedNames[0]);
    }
    setDogFullName(dividedNames);
  };

  const gettingRandomImageByBreedName = async () => {
    const response = await getDogImageByBreedName(onlyBreed);
    return response.data.message;
  };

  const gettingRandomImageByBreedSubBreed = async () => {
    const response = await getSubBreedImageBreed(onlyBreed, subBreed);
    return response.data.message;
  };

  const fetchingData = async () => {
    if (dogFullName.length === 2) {
      const subBreedData = await gettingRandomImageByBreedSubBreed();
      if (subBreedData.length !== 0) {
        setImage([subBreedData]);
      }
    } else {
      const data = await gettingRandomImageByBreedName();
      if (data.length !== 0) {
        setImage([data]);
      }
    }
  };

  // ------ For Dog's Breed for dropdown
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

  return (
    <div className="App min-h-[100vh]">
      <section className="containe border-2 top-0 bg-gray-200  items-center flex flex-col my-auto">
        <h2 className="text-4xl my-4">BREEDS LIST</h2>
        <div className="flex sticky top-0 justify-center items-center px-4 max-w-[60%] rounded-lg shadow-lg flex-col space-y-3 lg:flex-row bg-white py-2">
          <p>https://dog.ceo/api/breed/</p>
          <select
            className="py-2 px-4 mx-2 rounded"
            onChange={(e) => divideTheNameAndSet(e.target.value)}
          >
            <option value="">-- select --</option>
            {breeds.map((breed, i) => (
              <option key={i} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <p>/images/random</p>
          <button
            onClick={fetchingData}
            className="bg-blue-400 px-4 hover:bg-blue-500 py-2 rounded-lg"
          >
            Fetch!
          </button>
        </div>
        <div className=" min-h-[85vh] flex flex-col justify-center items-center">
          {image.map((imgLink, i) => (
            <img
              loading="lazy"
              src={imgLink}
              key={i}
              className="max-w-[30rem]"
              alt="dog"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
