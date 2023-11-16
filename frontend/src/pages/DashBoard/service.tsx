import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useDashBoardService() {
  let textFieldref: any = useRef(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (textFieldref.current?.contains(e.target)) {
        setSearchIconState(true);
      } else {
        setSearchIconState(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const navigate = useNavigate();

  const trendingData = [
    { id: 1, name: "Software Enginner" },
    { id: 2, name: "Sales" },
    { id: 3, name: "Accountant" },
    { id: 4, name: "Marketing" },
    { id: 5, name: "Architecture" },
  ];

  const [searchInput, setSearchInput] = useState("");

  const [searchIconState, setSearchIconState] = useState(false);

  const wordContent = ["Dream", "Best", "Desire", "Ultimate"];

  const [currentWord, setCurrentWord] = useState(wordContent[0]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleSlideChange = (index: any) => {
    setCurrentItemIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(wordContent[currentIndex]);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wordContent.length);
    }, 1500);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    // Add the 'fade-in' class to apply the fade effect
    const element = document.querySelector(".bigTitleSecondary");
    if (element) {
      // Add the 'fade-in' class to apply the fade effect
      element.classList.add("fade-in");

      // Remove the 'fade-in' class after the fade effect duration (0.5s)
      const timeout = setTimeout(() => {
        element.classList.remove("fade-in");
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentWord]);

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = () => {
    console.log(searchInput);
    setSearchInput("");
    navigate("/joblist");
  };

  const handleTrending = (e: any) => {
    console.log(e.target.value);
  };
  return {
    handleSearchInput,
    searchInput,
    handleSubmitSearch,
    currentWord,
    textFieldref,
    searchIconState,
    trendingData,
    handleTrending,
    handleSlideChange,
    currentItemIndex,
  };
}
