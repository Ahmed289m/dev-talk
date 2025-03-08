"use client";
const { useState, createContext, useContext } = require("react");

const postFormContext = createContext();

function PostFormProvider({ children }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  function openCloseForm() {
    setIsFormOpen((f) => !f);
  }
  return (
    <postFormContext.Provider
      value={{ isFormOpen, openCloseForm, setIsFormOpen }}
    >
      {children}
    </postFormContext.Provider>
  );
}

export default PostFormProvider;

export const usePostForm = () => useContext(postFormContext);
