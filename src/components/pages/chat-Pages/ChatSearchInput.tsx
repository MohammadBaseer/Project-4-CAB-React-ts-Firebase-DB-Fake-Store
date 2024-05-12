const ChatSearchInput = () => {
  return (
    <div className="field col-11 md:col-11">
      <div className="search-container">
        <input
          type="text"
          className="search-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border  appearance-none outline-none focus:border-primary w-full"
          placeholder="Search"
        />
        <i className="pi pi-search"></i>
      </div>
    </div>
  );
};

export default ChatSearchInput;
