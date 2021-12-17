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
import { database, storage } from "../lib/firebase_lib";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const Input = () => {
  const [postInput, setPostInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);

  const addImageToPost = (ev) => {
    if (ev.target?.files[0]) {
      const imageFile = ev.target?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
    }
  };

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setPostInput(postInput + emoji);
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(database, "posts"), {
      text: postInput,
      timestamp: serverTimestamp(),
    });
    if (selectedFile) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(database, "posts", docRef.id), {
        image: downloadUrl,
      });
    }
    setPostInput("");
    setSelectedFile(null);
    setShowEmoji(false);
    setLoading(false);
  };
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll ${
        loading && "opacity-60"
      }`}
    >
      <img
        src={"https://rb.gy/ogau5a"}
        alt="Twitter"
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div
          className={`${selectedFile && "pb-7"} ${postInput && "space-y-2.5"}`}
        >
          <textarea
            value={postInput}
            onChange={(ev) => setPostInput(ev.target.value)}
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            rows={2}
            placeholder="What's happening?"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => {
                  filePickerRef.current.value = null;
                  return setSelectedFile(null);
                }}
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

        {!loading && (
          <div className="flex items-center justify-between pt-2.5 ">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
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
              disabled={!postInput.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
