import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Input = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const addImageToPost = (ev) => {
    setSelectedFile(ev.target?.files[0]);
  };

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setSearchInput(searchInput + emoji);
  };

  const sendPost = () => {};
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
    >
      <img
        src={"https://rb.gy/ogau5a"}
        alt="Twitter"
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div
          className={`${selectedFile && "pb-7"} ${
            searchInput && "space-y-2.5"
          }`}
        >
          <textarea
            value={searchInput}
            onChange={(ev) => setSearchInput(ev.target.value)}
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            rows={2}
            placeholder="What's happening?"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt="image"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5 ">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon rotate-90" onClick={() => {}}>
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div
              className="icon"
              onClick={() => {
                setShowEmoji(!showEmoji);
              }}
            >
              <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="icon" onClick={() => {}}>
              <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            {showEmoji && (
              <Picker
                onSelect={addEmoji}
                theme="auto"
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: "-40",
                  maxWidth: "320px",
                  borderRadius: "20px",
                }}
              />
            )}
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            type="button"
            disabled={!searchInput.trim() && !selectedFile}
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
