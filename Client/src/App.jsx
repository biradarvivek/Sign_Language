import React, { useState, useEffect } from "react";
import { wordAPI } from "./services/api";
import SearchBar from "./components/SearchBar";
import WordCard from "./components/WordCard";
import AddWordForm from "./components/AddWordForm";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editWord, setEditWord] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      setLoading(true);
      const response = await wordAPI.getAllWords();
      setWords(response.data);
      setFilteredWords(response.data);
    } catch (error) {
      console.error("Error fetching words:", error);
      toast.error("Error fetching words");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredWords(words);
      return;
    }

    try {
      const response = await wordAPI.searchWords(query);
      setFilteredWords(response.data);
    } catch (error) {
      console.error("Error searching words:", error);
    }
  };

  const handleAddWord = async (wordData) => {
    try {
      const response = await wordAPI.addWord(wordData);
      setWords([response.data, ...words]);
      setFilteredWords([response.data, ...filteredWords]);
      toast.success("Word added successfully!");
    } catch (error) {
      console.error("Error adding word:", error);
      toast.error("Error adding word");
    }
  };

  const handleUpdateWord = async (wordData) => {
    try {
      const response = await wordAPI.updateWord(editWord._id, wordData);
      const updatedWords = words.map((word) =>
        word._id === editWord._id ? response.data : word
      );
      setWords(updatedWords);
      setFilteredWords(updatedWords);
      toast.success("Word updated successfully!");
    } catch (error) {
      console.error("Error updating word:", error);
      toast.error("Error updating word");
    }
  };

  const handleDeleteWord = async (id) => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      try {
        await wordAPI.deleteWord(id);
        const updatedWords = words.filter((word) => word._id !== id);
        setWords(updatedWords);
        setFilteredWords(updatedWords);
        toast.success("Word deleted successfully!");
      } catch (error) {
        console.error("Error deleting word:", error);
        toast.error("Error deleting word");
      }
    }
  };

  const handleEdit = (word) => {
    setEditWord(word);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditWord(null);
  };

  const handleFormSubmit = (wordData) => {
    if (editWord) {
      handleUpdateWord(wordData);
    } else {
      handleAddWord(wordData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 flex flex-col md:flex-row items-center justify-between shadow-md gap-4 text-center md:text-left">
        <h1 className="text-2xl font-bold">📚 Sign Language Dictionary</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-indigo-500 font-bold py-3 px-6 rounded-full transition-transform hover:-translate-y-1"
        >
          Add New Word
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredWords.length === 0 ? (
              <p className="col-span-full text-center text-lg text-gray-500 py-12">
                No words found
              </p>
            ) : (
              filteredWords.map((word) => (
                <WordCard
                  key={word._id}
                  word={word}
                  onEdit={handleEdit}
                  onDelete={handleDeleteWord}
                />
              ))
            )}
          </div>
        )}
      </main>

      <AddWordForm
        isOpen={showForm}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editWord={editWord}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
